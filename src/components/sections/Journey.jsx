import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    id: '01', title: 'Initial Consultation', subtitle: 'Your Journey Begins',
    description: 'Meet our expert fertility specialists for a comprehensive evaluation. We review medical history, run diagnostics, and craft your personalized treatment plan.',
    icon: '🩺', color: '#8B111B', bg: '#F9E8EA', duration: '1–2 visits',
  },
  {
    id: '02', title: 'Ovarian Stimulation', subtitle: 'Nurturing Growth',
    description: 'Carefully monitored hormone injections stimulate your ovaries to produce multiple healthy eggs. Tracked with regular ultrasounds and blood tests.',
    icon: '💊', color: '#D58F4B', bg: '#FCF3E8', duration: '8–14 days',
  },
  {
    id: '03', title: 'Egg Retrieval', subtitle: 'A Gentle Procedure',
    description: 'Under light sedation, mature eggs are retrieved using minimally invasive ultrasound-guided aspiration. Quick, safe, and precise.',
    icon: '🔬', color: '#8B111B', bg: '#F9E8EA', duration: '30 minutes',
  },
  {
    id: '04', title: 'Fertilization', subtitle: 'Life Begins',
    description: 'Eggs are fertilized with prepared sperm in our advanced embryology lab using ICSI or conventional IVF, nurtured to blastocyst stage.',
    icon: '⚡', color: '#D58F4B', bg: '#FCF3E8', duration: '3–5 days',
  },
  {
    id: '05', title: 'Embryo Transfer', subtitle: 'The Moment of Hope',
    description: 'The healthiest embryo — selected via AI-assisted grading and PGT — is gently transferred into the uterus in a quick, painless procedure.',
    icon: '🌱', color: '#8B111B', bg: '#F9E8EA', duration: '10–15 minutes',
  },
  {
    id: '06', title: 'Pregnancy Confirmation', subtitle: 'Life-Changing Results',
    description: 'Two weeks after transfer, a blood beta-HCG test confirms pregnancy. Our team continues supporting you through every step of early pregnancy.',
    icon: '💕', color: '#D58F4B', bg: '#FCF3E8', duration: '14 days post-transfer',
  },
]

function StepCard({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="step-card card-base"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 2) * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Step number bar */}
      <div className="step-num-bar" style={{ background: step.color }}>
        <span className="step-num">{step.id}</span>
        <span className="step-duration">⏱ {step.duration}</span>
      </div>

      <div className="step-body">
        <div className="step-icon-wrap" style={{ background: step.bg }}>
          <span className="step-icon">{step.icon}</span>
        </div>
        <div className="step-meta" style={{ color: step.color }}>{step.subtitle}</div>
        <h3 className="step-title">{step.title}</h3>
        <p className="step-desc">{step.description}</p>
      </div>
    </motion.div>
  )
}

export default function Journey() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="journey" className="section bg-white journey">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">IVF Process</span>
          <h2 className="section-title">Your 6-Step Journey <span className="text-kumkum">to Parenthood</span></h2>
          <p className="section-sub">Every step of your IVF journey guided by our world-class specialists with complete transparency and compassionate care.</p>
          <div className="divider" />
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, i) => <StepCard key={step.id} step={step} index={i} />)}
        </div>
      </div>

      <style>{`
        .journey { background: var(--white); }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .step-card {
          overflow: hidden;
          background: var(--white);
        }

        .step-num-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          color: #fff;
        }

        .step-num {
          font-family: 'Playfair Display', serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .step-duration {
          font-size: 0.7rem;
          opacity: 0.9;
          font-weight: 500;
        }

        .step-body {
          padding: 24px;
        }

        .step-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .step-icon { font-size: 1.5rem; }

        .step-meta {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .step-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--k900);
          margin-bottom: 10px;
        }

        .step-desc {
          font-size: 0.85rem;
          color: var(--mgrey);
          line-height: 1.7;
        }

        @media (max-width: 900px) { .steps-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .steps-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
