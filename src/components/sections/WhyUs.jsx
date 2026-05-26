import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { getDoctors as getApiDoctors } from '../../utils/apiWrapper'
import { getDoctors as getLocalDoctors } from '../../utils/doctorsDb'

const whyItems = [
  { icon: '🏆', title: 'NABH Accredited',       desc: 'Nationally accredited for highest patient safety standards' },
  { icon: '🔬', title: 'ISO 9001 Certified Lab', desc: 'ISO-certified embryology laboratory with international protocols' },
  { icon: '💙', title: 'Patient-First Care',     desc: '24/7 support from your dedicated care coordinator' },
  { icon: '📊', title: 'Transparent Results',    desc: 'Real published success rates — no inflated numbers' },
  { icon: '💰', title: 'Affordable Excellence',  desc: 'EMI options and transparent pricing with no hidden costs' },
  { icon: '🌍', title: 'International Patients', desc: 'Dedicated team for NRI and international fertility journeys' },
]

export default function WhyUs() {
  const [doctors, setDoctors] = useState([])
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await getApiDoctors()
        if (Array.isArray(response) && response.length > 0) {
          setDoctors(response)
        } else {
          setDoctors(getLocalDoctors())
        }
      } catch (err) {
        console.warn('Failed to fetch doctors from API, using local storage fallback:', err)
        setDoctors(getLocalDoctors())
      }
    }
    loadDoctors()
    window.addEventListener('doctors-update', loadDoctors)
    return () => window.removeEventListener('doctors-update', loadDoctors)
  }, [])

  return (
    <section id="why-us" className="section whyus-sec">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 580 }}
        >
          <span className="section-label">Why Choose Advika</span>
          <h2 className="section-title">The <span className="text-kumkum">Advika</span> Difference</h2>
          <p className="section-sub">Thousands of families choose us not just for technology, but for the warmth that guides them every step of the way.</p>
          <div className="divider" />
        </motion.div>

        {/* Why grid */}
        <div className="why-grid">
          {whyItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="why-card card-base"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <span className="why-icon">{item.icon}</span>
              <h4 className="why-title">{item.title}</h4>
              <p className="why-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Doctors Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: 80 }}
        >
          <span className="section-label">Our Specialists</span>
          <h3 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: 40 }}>
            Meet Our <span className="text-kumkum">Expert Doctors</span>
          </h3>
        </motion.div>

        {/* Doctors Grid */}
        <div className="doc-grid">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              className="doc-card card-base"
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
            >
              {/* Top colored bar */}
              <div className="doc-bar" style={{ background: doc.color }} />

              <div className="doc-body">
                {/* Doctor Portrait Photo Frame */}
                <div className="doc-img-wrap-custom" style={{ border: `3px solid ${doc.color}35` }}>
                  <img src={doc.image} alt={doc.name} className="doc-real-img" />
                </div>

                <div className="doc-exp-badge" style={{ color: doc.color, background: doc.bg, borderColor: `${doc.color}30` }}>
                  {doc.exp} experience
                </div>

                <h4 className="doc-name">{doc.name}</h4>
                <p className="doc-title" style={{ color: doc.color, fontWeight: '700' }}>{doc.title}</p>
                <p className="doc-qual">{doc.qual}</p>
                
                <p className="doc-desc-custom">{doc.desc}</p>

                <div className="doc-meta">
                  <span><strong>{doc.patients}</strong> clinical cases</span>
                </div>

                <a href="#contact" className="btn-outline-k" style={{ width: '100%', justifyContent: 'center', marginTop: 16, fontSize: '0.82rem', padding: '9px 16px' }}>
                  Book Consultation
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .whyus-sec { background: var(--s100); }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 0;
        }

        .why-card {
          padding: 24px;
          background: var(--white);
          text-align: center;
        }

        .why-icon  { font-size: 1.8rem; display: block; margin-bottom: 12px; }
        .why-title { font-size: 0.92rem; font-weight: 700; color: var(--k900); margin-bottom: 8px; font-family: var(--font-body); }
        .why-desc  { font-size: 0.8rem; color: var(--mgrey); line-height: 1.6; }

        .doc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .doc-card {
          background: var(--white);
          overflow: hidden;
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .doc-bar { height: 5px; }

        .doc-body { padding: 28px; display: flex; flex-direction: column; height: 100%; }

        .doc-img-wrap-custom {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 16px;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          background: var(--warm);
          flex-shrink: 0;
        }

        .doc-card:hover .doc-img-wrap-custom {
          transform: scale(1.05);
        }

        .doc-real-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        .doc-exp-badge {
          display: inline-block;
          align-self: center;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 12px;
          border-radius: 20px;
          border: 1px solid;
          margin-bottom: 12px;
        }

        .doc-name  { font-size: 1rem; font-weight: 700; color: var(--k900); margin-bottom: 5px; }
        .doc-title { font-size: 0.82rem; margin-bottom: 6px; }
        
        .doc-qual {
          font-size: 0.72rem;
          color: var(--mgrey);
          font-style: italic;
          line-height: 1.45;
          margin-bottom: 12px;
          min-height: 40px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .doc-desc-custom {
          font-size: 0.76rem;
          color: var(--mgrey);
          line-height: 1.5;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 52px;
          text-align: center;
        }

        .doc-meta {
          font-size: 0.8rem;
          color: var(--dgrey);
          padding: 8px 0;
          border-top: 1px solid var(--lgrey);
          margin-top: auto; /* push meta & button to the bottom of card */
        }

        .doc-meta strong { color: var(--k700); }

        @media (max-width: 1024px) {
          .doc-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 600px) {
          .why-grid { grid-template-columns: 1fr; }
          .doc-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}