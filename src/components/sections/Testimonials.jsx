import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { getTestimonials as getApiTestimonials } from '../../utils/apiWrapper'
import { getTestimonials as getLocalTestimonials } from '../../utils/testimonialsDb'

function Stars({ n = 5 }) {
  return <div className="t-stars">{Array.from({ length: n }).map((_, i) => <span key={i}>★</span>)}</div>
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await getApiTestimonials()
        if (Array.isArray(response) && response.length > 0) {
          setTestimonials(response)
          setActive(prev => (prev >= response.length ? 0 : prev))
        } else {
          const localData = getLocalTestimonials()
          setTestimonials(localData)
          setActive(prev => (prev >= localData.length ? 0 : prev))
        }
      } catch (err) {
        console.warn('Failed to fetch testimonials from API, using local storage fallback:', err)
        const localData = getLocalTestimonials()
        setTestimonials(localData)
        setActive(prev => (prev >= localData.length ? 0 : prev))
      }
    }
    loadTestimonials()
    window.addEventListener('testimonials-update', loadTestimonials)
    return () => window.removeEventListener('testimonials-update', loadTestimonials)
  }, [])

  const cur = testimonials.length > 0 && active < testimonials.length ? testimonials[active] : null

  return (
    <section id="testimonials" className="section testimonials-sec">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 560 }}
        >
          <span className="section-label">Success Stories</span>
          <h2 className="section-title">Real Families, <span className="text-kumkum">Real Dreams</span> Fulfilled</h2>
          <p className="section-sub">Behind every statistic is a real family whose life was forever changed. These are their stories.</p>
          <div className="divider" />
        </motion.div>

        {testimonials.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--mgrey)' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>👶</span>
            <p>No success stories added yet. Push new happy parent reviews via the Admin Panel!</p>
          </div>
        ) : (
          cur && (
            <div className="t-layout">
              {/* Main card */}
              <div className="t-main">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cur.id}
                    className="t-card card-base"
                    initial={{ opacity: 0, x: 50, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0,  scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    id={`testimonial-${cur.id}`}
                  >
                    <div className="t-quote-mark">"</div>

                    <div className="t-top">
                      <div className="t-avatar">{cur.avatar || '👶'}</div>
                      <div>
                        <h3 className="t-name">{cur.name}</h3>
                        <p className="t-loc">📍 {cur.location}</p>
                        <Stars />
                      </div>
                      <span className="t-treatment">{cur.treatment}</span>
                    </div>

                    <blockquote className="t-quote">{cur.quote}</blockquote>

                    <div className="t-outcome">
                      <span className="t-outcome-dot" />
                      {cur.outcome}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="t-controls">
                  <button className="t-nav" id="t-prev"
                    onClick={() => setActive(a => a === 0 ? testimonials.length - 1 : a - 1)}
                    aria-label="Previous">
                    ‹
                  </button>
                  <div className="t-dots">
                    {testimonials.map((_, i) => (
                      <button key={i} className={`t-dot ${i === active ? 'active' : ''}`}
                        onClick={() => setActive(i)} aria-label={`Testimonial ${i+1}`} />
                    ))}
                  </div>
                  <button className="t-nav" id="t-next"
                    onClick={() => setActive(a => a === testimonials.length - 1 ? 0 : a + 1)}
                    aria-label="Next">
                    ›
                  </button>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="t-thumbs">
                <h4 className="t-thumbs-title">Patient Stories</h4>
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    className={`t-thumb card-base ${i === active ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                  >
                    <span className="t-thumb-avatar">{t.avatar || '👶'}</span>
                    <div>
                      <p className="t-thumb-name">{t.name.split('&')[0].trim()}</p>
                      <p className="t-thumb-detail">{t.treatment}</p>
                    </div>
                    {i === active && <span className="t-thumb-active-dot" />}
                  </button>
                ))}

                {/* CTA */}
                <div className="t-cta-box">
                  <p>Start your own success story today</p>
                  <a href="#contact" className="btn-primary-k" style={{ fontSize:'0.85rem', padding:'10px 20px' }}>
                    Book Free Consultation
                  </a>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <style>{`
        .testimonials-sec { background: var(--white); }

        .t-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 32px;
          align-items: start;
        }

        .t-card {
          padding: 40px;
          background: var(--white);
          position: relative;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .t-quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 7rem;
          line-height: 0.7;
          color: rgba(139,17,27,0.07);
          position: absolute;
          top: 20px; right: 28px;
          font-weight: 700;
          user-select: none;
        }

        .t-top {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .t-avatar {
          font-size: 2.2rem;
          width: 56px; height: 56px;
          background: var(--k100);
          border: 2px solid var(--k300);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .t-name { font-size: 1rem; font-weight: 700; color: var(--k900); margin-bottom: 3px; }
        .t-loc  { font-size: 0.78rem; color: var(--mgrey); margin-bottom: 5px; }
        .t-stars { display: flex; gap: 2px; }
        .t-stars span { color: var(--s700); font-size: 0.85rem; }

        .t-treatment {
          margin-left: auto;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--k700);
          background: var(--k100);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid var(--k300);
          white-space: nowrap;
        }

        .t-quote {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-style: italic;
          color: #555;
          line-height: 1.85;
          margin-bottom: 20px;
          border: none;
          padding: 0;
          position: relative;
          z-index: 1;
        }

        .t-outcome {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--k700);
        }

        .t-outcome-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--k700);
          animation: pulse-ring 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .t-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .t-nav {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--k300);
          background: var(--white);
          color: var(--k700);
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          line-height: 1;
        }

        .t-nav:hover { background: var(--k100); border-color: var(--k700); }

        .t-dots { display: flex; gap: 6px; }

        .t-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: none;
          background: var(--lgrey);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .t-dot.active {
          background: var(--k700);
          width: 22px;
          border-radius: 4px;
        }

        /* Thumbs */
        .t-thumbs { display: flex; flex-direction: column; gap: 10px; }

        .t-thumbs-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--mgrey);
          margin-bottom: 4px;
          font-family: var(--font-body);
        }

        .t-thumb {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--warm);
          border: 1.5px solid var(--lgrey);
          border-radius: 12px;
          padding: 10px 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: inherit;
          text-align: left;
          position: relative;
        }

        .t-thumb.active {
          border-color: var(--k300);
          background: var(--k50);
        }

        .t-thumb:hover { border-color: var(--k300); }

        .t-thumb-avatar { font-size: 1.4rem; }

        .t-thumb-name   { font-size: 0.8rem; font-weight: 600; color: var(--k900); }
        .t-thumb-detail { font-size: 0.7rem; color: var(--mgrey); }

        .t-thumb-active-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--k700);
          position: absolute;
          right: 14px;
          top: 50%; transform: translateY(-50%);
        }

        .t-cta-box {
          margin-top: 8px;
          background: var(--k100);
          border: 1px solid var(--k300);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }

        .t-cta-box p {
          font-size: 0.82rem;
          color: var(--dgrey);
          margin-bottom: 12px;
          font-weight: 500;
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .t-layout { grid-template-columns: 1fr; }
          .t-thumbs  { display: grid; grid-template-columns: 1fr 1fr; }
          .t-thumbs-title { grid-column: span 2; }
          .t-cta-box { grid-column: span 2; }
        }

        @media (max-width: 500px) {
          .t-thumbs { grid-template-columns: 1fr; }
          .t-thumbs-title, .t-cta-box { grid-column: span 1; }
          .t-card { padding: 24px; }
        }
      `}</style>
    </section>
  )
}
