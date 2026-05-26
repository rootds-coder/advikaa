import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

function SrvCard({ s, index }) {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={cardRef}
      className="srv-card card-base"
      id={`service-${s.id}`}
      initial={{ opacity: 0, y: 36 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
    >
      <div className="srv-icon-row">
        <div className="srv-icon-wrap" style={{ background: s.bg }}>
          <span className="srv-icon">{s.icon}</span>
        </div>
        <span className="srv-short" style={{ color: s.accent }}>{s.short}</span>
      </div>
      <h3 className="srv-title">{s.title}</h3>
      <p className="srv-desc">{s.description}</p>
      <ul className="srv-feats">
        {s.features.map(f => (
          <li key={f} className="srv-feat">
            <span className="srv-feat-dot" style={{ background: s.accent }} />
            {f}
          </li>
        ))}
      </ul>
      <Link to={`/faq#${s.id}`} className="srv-cta" style={{ color: s.accent }}>Learn more →</Link>
    </motion.div>
  )
}

const services = [
  { id: 'ivf', icon: '🧬', short: 'IVF', title: 'In Vitro Fertilization',
    description: 'Our flagship procedure combines cutting-edge embryology with genetic screening to maximize your chances of a successful pregnancy.',
    features: ['ICSI / IMSI', 'Blastocyst Culture', 'PGT Screening', 'Frozen Embryo Transfer'],
    bg: '#F9E8EA', accent: '#8B111B' },
  { id: 'iui', icon: '🔬', short: 'IUI', title: 'Intrauterine Insemination',
    description: 'A minimally invasive procedure where prepared sperm is placed directly into the uterus during the most fertile time of your cycle.',
    features: ['Natural Cycle', 'Stimulated IUI', 'Donor Sperm', 'Minimal Side Effects'],
    bg: '#FCF3E8', accent: '#D58F4B' },
  { id: 'freeze', icon: '❄️', short: 'Fertility Preservation', title: 'Egg & Embryo Freezing',
    description: 'Preserve your fertility on your own timeline with our vitrification technology achieving exceptional egg survival rates.',
    features: ['Vitrification', 'Long-term Storage', 'Medical Preservation', 'Elective Freezing'],
    bg: '#F9E8EA', accent: '#8B111B' },
  { id: 'pgt', icon: '🧪', short: 'PGT / PGD', title: 'Genetic Testing',
    description: 'Advanced preimplantation genetic testing identifies chromosomally normal embryos, dramatically improving success rates.',
    features: ['PGT-A Aneuploidy', 'PGT-M Monogenic', 'NGS Platform', '24-chromosome screen'],
    bg: '#FCF3E8', accent: '#D58F4B' },
  { id: 'donor', icon: '💝', short: 'Donor Program', title: 'Egg & Sperm Donation',
    description: 'Carefully screened and matched donors through our comprehensive program covering egg donation, sperm donation, and embryo adoption.',
    features: ['Egg Donation', 'Sperm Bank', 'Embryo Adoption', 'Thorough Screening'],
    bg: '#F9E8EA', accent: '#8B111B' },
  { id: 'lap', icon: '🏥', short: 'Surgical', title: 'Laparoscopy & Hysteroscopy',
    description: 'Minimally invasive surgical procedures to diagnose and treat conditions like endometriosis, fibroids and blocked tubes.',
    features: ['Diagnostic Lap.', 'Operative Hysteroscopy', 'Endometriosis', 'Fibroid Removal'],
    bg: '#FCF3E8', accent: '#D58F4B' },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="services" className="section bg-warm services">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 580 }}
        >
          <span className="section-label">Our Treatments</span>
          <h2 className="section-title">Comprehensive <span className="text-kumkum">Fertility Solutions</span></h2>
          <p className="section-sub">From first consultation to bringing home your baby — every fertility treatment under one roof with uncompromising quality.</p>
          <div className="divider" />
        </motion.div>

        <div className="srv-grid">
          {services.map((s, i) => <SrvCard key={s.id} s={s} index={i} />)}
        </div>
      </div>

      <style>{`
        .services { background: var(--k50); }

        .srv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .srv-card {
          padding: 28px;
          background: var(--white);
          display: flex;
          flex-direction: column;
        }

        .srv-icon-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .srv-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .srv-icon { font-size: 1.4rem; }

        .srv-short {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .srv-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--k900);
          margin-bottom: 10px;
        }

        .srv-desc {
          font-size: 0.85rem;
          color: var(--mgrey);
          line-height: 1.7;
          margin-bottom: 16px;
          flex: 1;
        }

        .srv-feats {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .srv-feat {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.74rem;
          color: var(--dgrey);
          background: var(--warm);
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid var(--lgrey);
        }

        .srv-feat-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .srv-cta {
          font-size: 0.85rem;
          font-weight: 600;
          transition: gap 0.2s;
        }

        .srv-cta:hover { opacity: 0.75; }

        @media (max-width: 1024px) { .srv-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px)  { .srv-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
