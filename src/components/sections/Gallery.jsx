import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { getGalleryImages as getApiGalleryImages } from '../../utils/apiWrapper'
import { getGalleryImages as getLocalGalleryImages } from '../../utils/galleryDb'

const CATEGORIES = [
  { id: 'all', label: 'All Facility' },
  { id: 'lab', label: 'Embryology Lab' },
  { id: 'consulting', label: 'Consultation Suites' },
  { id: 'lobby', label: 'Lobby & Patient Care' }
]

export default function Gallery() {
  const [images, setImages] = useState([])
  const [filter, setFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Load images on mount & listen for real-time updates from Admin Panel
  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await getApiGalleryImages()
        if (Array.isArray(response) && response.length > 0) {
          setImages(response)
        } else {
          setImages(getLocalGalleryImages())
        }
      } catch (err) {
        console.warn('Failed to fetch gallery images from API, using local storage fallback:', err)
        setImages(getLocalGalleryImages())
      }
    }
    
    loadImages()
    window.addEventListener('gallery-update', loadImages)
    return () => window.removeEventListener('gallery-update', loadImages)
  }, [])

  // Filtered list
  const filteredImages = images.filter(img => filter === 'all' || img.category === filter)

  // Lightbox Navigation
  const handlePrev = (e) => {
    e.stopPropagation()
    setLightboxIndex(prev => (prev === 0 ? filteredImages.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setLightboxIndex(prev => (prev === filteredImages.length - 1 ? 0 : prev + 1))
  }

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') handlePrev(e)
      if (e.key === 'ArrowRight') handleNext(e)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, filteredImages])

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null

  return (
    <section id="gallery" className="section gallery-sec">
      <div className="container">
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 580, marginBottom: 40 }}
        >
          <span className="section-label">Hospital Tour</span>
          <h2 className="section-title">Explore Our <span className="text-kumkum">World-Class</span> Centre</h2>
          <p className="section-sub">Take a virtual walk through our advanced facilities, consulting chambers, and ISO-certified IVF embryology laboratory.</p>
          <div className="divider" />
        </motion.div>

        {/* Filter Controls */}
        <div className="gallery-filters">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          className="gallery-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.48, ease: 'easeInOut' }}
                className="gallery-item card-base"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="gallery-img-wrap">
                  <img src={img.imageUrl} alt={img.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <span className="category-tag">
                      {CATEGORIES.find(c => c.id === img.category)?.label || img.category}
                    </span>
                    <h3 className="overlay-title">{img.title}</h3>
                    <p className="overlay-desc">{img.description}</p>
                    <span className="zoom-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div 
            className="gallery-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span>📷</span>
            <p>No images found in this category. Use the Admin Panel to upload hospital photos!</p>
          </motion.div>
        )}

        {/* Gallery CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="#contact" className="btn-primary-k">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Book a Center Tour
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && activeImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close lightbox">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Left Nav */}
            <button className="lightbox-nav lightbox-nav--left" onClick={handlePrev} aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            {/* Content Container */}
            <motion.div 
              className="lightbox-container"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-img-wrap">
                <img src={activeImage.imageUrl} alt={activeImage.title} />
              </div>
              <div className="lightbox-details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span className="lightbox-tag">
                    {CATEGORIES.find(c => c.id === activeImage.category)?.label || activeImage.category}
                  </span>
                  <span className="lightbox-date">{activeImage.date}</span>
                </div>
                <h2>{activeImage.title}</h2>
                <p>{activeImage.description}</p>
              </div>
            </motion.div>

            {/* Right Nav */}
            <button className="lightbox-nav lightbox-nav--right" onClick={handleNext} aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-sec {
          background: var(--white);
        }

        .gallery-filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .filter-btn {
          background: var(--white);
          border: 1px solid var(--lgrey);
          border-radius: 8px;
          padding: 8px 18px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--mgrey);
          cursor: pointer;
          transition: var(--transition);
        }

        .filter-btn:hover {
          color: var(--k700);
          border-color: var(--k300);
          background: var(--k50);
        }

        .filter-btn.active {
          background: var(--k700);
          color: var(--white);
          border-color: var(--k700);
          box-shadow: 0 4px 12px rgba(139,17,27,0.15);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .gallery-item {
          cursor: pointer;
          overflow: hidden;
          background: var(--white);
        }

        .gallery-img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 15px;
        }

        .gallery-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .gallery-item:hover img {
          transform: scale(1.06);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(94, 12, 19, 0.92) 0%, rgba(94, 12, 19, 0.3) 65%, transparent 100%);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .category-tag {
          align-self: flex-start;
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--s300);
          background: rgba(213, 143, 75, 0.15);
          border: 1px solid rgba(213, 143, 75, 0.3);
          border-radius: 6px;
          padding: 3px 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .overlay-title {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .overlay-desc {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.45;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .zoom-icon {
          position: absolute;
          top: 16px;
          right: 16px;
          color: var(--white);
          opacity: 0.75;
          transition: transform 0.2s ease;
        }

        .gallery-item:hover .zoom-icon {
          transform: scale(1.1);
        }

        .gallery-empty {
          text-align: center;
          padding: 60px 0;
          color: var(--mgrey);
        }

        .gallery-empty span {
          font-size: 3rem;
          display: block;
          margin-bottom: 12px;
        }

        /* Lightbox CSS */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(46, 46, 46, 0.94);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .lightbox-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: none;
          border: none;
          color: var(--white);
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .lightbox-close:hover { opacity: 1; }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--white);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }

        .lightbox-nav:hover {
          background: var(--k700);
          border-color: var(--k700);
          transform: translateY(-50%) scale(1.05);
        }

        .lightbox-nav--left { left: 32px; }
        .lightbox-nav--right { right: 32px; }

        .lightbox-container {
          background: var(--white);
          border-radius: 20px;
          overflow: hidden;
          max-width: 760px;
          width: 100%;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
        }

        .lightbox-img-wrap {
          aspect-ratio: 16 / 10;
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .lightbox-img-wrap img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .lightbox-details {
          padding: 24px 28px;
        }

        .lightbox-tag {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--k700);
          background: var(--k100);
          border-radius: 6px;
          padding: 3px 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .lightbox-date {
          font-size: 0.72rem;
          color: var(--mgrey);
        }

        .lightbox-details h2 {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--k900);
          margin-top: 8px;
          margin-bottom: 8px;
        }

        .lightbox-details p {
          font-size: 0.85rem;
          color: var(--dgrey);
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: 1fr 1fr; }
          .lightbox-nav { width: 42px; height: 42px; }
          .lightbox-nav--left { left: 12px; }
          .lightbox-nav--right { right: 12px; }
        }

        @media (max-width: 560px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .lightbox-overlay { padding: 12px; }
          .lightbox-nav { display: none; }
          .lightbox-details { padding: 16px 20px; }
        }
      `}</style>
    </section>
  )
}
