import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HeroScene = lazy(() => import('../3d/HeroScene'))

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } }
})

const STAGES = [
  {
    day: 1,
    title: 'Day 1: Zygote',
    subtitle: 'Fertilization & Genetic Blueprint',
    desc: 'The miracle of life begins. A single fertilized cell carries the complete and unique biological blueprint, preparing for its very first cell division.',
    stats: { size: '0.10 mm', cells: '1 Cell', phase: 'Zygote' }
  },
  {
    day: 2,
    title: 'Day 2: Cleavage Split',
    subtitle: 'First Cellular Divisions',
    desc: 'The single cell undergoes initial mitotic divisions, dividing into 2 and then 4 perfectly symmetrical cells, safely nestled within the protective shell.',
    stats: { size: '0.12 mm', cells: '2 - 4 Cells', phase: 'Cleavage' }
  },
  {
    day: 3,
    title: 'Day 3: Cleavage Stage',
    subtitle: 'Active Cellular Proliferation',
    desc: 'Active divisions continue to form an 8-cell cluster. At this early stage, each cell contains the full blueprint, and genetic testing (PGT) can be safely planned.',
    stats: { size: '0.13 mm', cells: '8 Cells', phase: 'Cleavage' }
  },
  {
    day: 4,
    title: 'Day 4: Morula Compaction',
    subtitle: 'Compaction & Cellular Union',
    desc: 'The individual cells compact tightly together, maximizing their contact to form a highly unified, solid cellular ball representing a mulberry.',
    stats: { size: '0.15 mm', cells: '16 - 32 Cells', phase: 'Morula' }
  },
  {
    day: 5,
    title: 'Day 5: Blastocyst',
    subtitle: 'Advanced Embryonic Miracle',
    desc: 'A fluid-filled cavity forms. Cells separate into the Inner Cell Mass (which becomes the baby) and the Trophoblast outer shell (which becomes the placenta).',
    stats: { size: '0.18 mm', cells: '50 - 120+ Cells', phase: 'Blastocyst' }
  }
]

export default function Hero() {
  const [activeDay, setActiveDay] = useState(1)
  const currentStage = STAGES.find(s => s.day === activeDay) || STAGES[0]

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">

          {/* ── LEFT: Copy ── */}
          <div className="hero-left">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="hero-badge-dot" />
              Trusted Fertility Centre — Ambala
            </motion.div>

            <motion.h1
              className="hero-h1"
              variants={fadeUp(0.25)}
              initial="hidden"
              animate="visible"
            >
              Advanced fertility &amp;
              <br />
              <span className="gradient-text">women's healthcare</span>
              <br />
              you can trust
            </motion.h1>

            <motion.p
              className="hero-lead"
              variants={fadeUp(0.4)}
              initial="hidden"
              animate="visible"
            >
              Compassionate care with cutting-edge IVF &amp; reproductive treatments,
              guided by experienced specialists at every step of your journey.
            </motion.p>

            <motion.div
              className="hero-actions"
              variants={fadeUp(0.55)}
              initial="hidden"
              animate="visible"
            >
              <a href="#contact" className="btn-primary-k" id="hero-book-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Book Appointment
              </a>
              <a href="tel:+919876543210" className="btn-outline-k" id="hero-call-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Talk to Doctor
              </a>
            </motion.div>

            <motion.div
              className="hero-trust"
              variants={fadeUp(0.7)}
              initial="hidden"
              animate="visible"
            >
              {[
                { icon: '👩‍⚕️', text: 'Experienced doctors' },
                { icon: '🔬', text: 'Advanced lab' },
                { icon: '📈', text: 'High success rate' },
                { icon: '🏆', text: 'NABH Accredited' },
              ].map((b) => (
                <span key={b.text} className="trust-badge">
                  {b.icon} {b.text}
                </span>
              ))}
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="hero-stats"
              variants={fadeUp(0.85)}
              initial="hidden"
              animate="visible"
            >
              {[
                { num: '2000+', label: 'Babies Born' },
                { num: '85%',   label: 'IVF Success' },
                { num: '15+',   label: 'Years Exp.' },
                { num: '5000+', label: 'Happy Patients' },
              ].map((s) => (
                <div key={s.label} className="hero-stat">
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: 3D Embryo & Floating Side-by-Side Timeline Panel ── */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="hero-3d-layout-box">
              
              {/* 3D Model Wrap */}
              <div className="hero-3d-wrap">
                {/* Decorative ring behind */}
                <div className="hero-3d-ring" />
                <div className="hero-3d-ring hero-3d-ring--2" />

                {/* 3D Canvas */}
                <div className="hero-3d-canvas">
                  <Suspense fallback={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--mgrey)', fontSize: '0.8rem' }}>
                      Loading Embryo Scene...
                    </div>
                  }>
                    <HeroScene activeDay={activeDay} />
                  </Suspense>
                </div>

                {/* Floating info cards */}
                <motion.div
                  className="hero-float-card hero-float-card--tl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="hfc-icon">⚡</span>
                  <div>
                    <strong>AI Embryo Selection</strong>
                    <p>99.9% lab accuracy</p>
                  </div>
                </motion.div>

                <motion.div
                  className="hero-float-card hero-float-card--br"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <span className="hfc-icon">🧬</span>
                  <div>
                    <strong>PGT Genetic Testing</strong>
                    <p>Healthiest embryo</p>
                  </div>
                </motion.div>
              </div>

              {/* Time-Lapse Side-by-Side Interactive Slider Panel */}
              <div className="embryo-slider-panel">
                <div className="slider-header">
                  <span>Development Timeline</span>
                  <span className="live-badge">3D Time-Lapse</span>
                </div>

                {/* Milestones Track */}
                <div className="milestones-track-wrap">
                  <div className="milestones-line-bg" />
                  <div 
                    className="milestones-line-progress" 
                    style={{ width: `${(activeDay - 1) * 25}%` }} 
                  />
                  <div className="milestones-dots">
                    {STAGES.map((s) => (
                      <button
                        key={s.day}
                        className={`milestone-dot-btn ${activeDay === s.day ? 'active' : ''}`}
                        onClick={() => setActiveDay(s.day)}
                        aria-label={`View stage ${s.title}`}
                      >
                        <span className="dot-circle" />
                        <span className="dot-label">Day {s.day}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description details card */}
                <div className="slider-card-wrap">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeDay}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="slider-detail-card"
                    >
                      <div className="card-top">
                        <h3>{currentStage.title}</h3>
                        <span className="card-subtitle">{currentStage.subtitle}</span>
                      </div>
                      <p className="card-desc">{currentStage.desc}</p>
                      
                      <div className="card-stats-strip">
                        <div className="card-stat-item">
                          <span className="stat-lbl">Est. Size</span>
                          <strong className="stat-val">{currentStage.stats.size}</strong>
                        </div>
                        <div className="card-stat-item">
                          <span className="stat-lbl">Cell Count</span>
                          <strong className="stat-val">{currentStage.stats.cells}</strong>
                        </div>
                        <div className="card-stat-item">
                          <span className="stat-lbl">Stage</span>
                          <strong className="stat-val">{currentStage.stats.phase}</strong>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
      </motion.div>

      <style>{`
        .hero-section {
          background: var(--k100);
          padding: 80px 0 60px;
          overflow: hidden;
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        /* Warm radial glow in background */
        .hero-section::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(213,143,75,0.12) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-section::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: -80px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139,17,27,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.9fr; /* Enlarged right column on desktop to support side-by-side layout */
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-left {
          max-width: 540px;
        }

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--k700);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 20px;
        }

        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
          animation: pulse-ring 2s ease-in-out infinite;
        }

        /* Heading */
        .hero-h1 {
          font-size: clamp(2rem, 4.2vw, 3rem);
          font-weight: 700;
          color: var(--k900);
          line-height: 1.15;
          margin-bottom: 20px;
        }

        /* Lead */
        .hero-lead {
          font-size: 0.98rem;
          color: #555;
          line-height: 1.75;
          margin-bottom: 30px;
          max-width: 480px;
        }

        /* Actions */
        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        /* Trust */
        .hero-trust {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 36px;
        }

        /* Stats */
        .hero-stats {
          display: flex;
          gap: 0;
          border-top: 1px solid var(--k300);
          padding-top: 24px;
        }

        .hero-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-right: 18px;
          border-right: 1px solid var(--k300);
        }

        .hero-stat:last-child {
          border-right: none;
          padding-right: 0;
          padding-left: 18px;
        }

        .hero-stat:not(:first-child):not(:last-child) {
          padding: 0 18px;
        }

        .hero-stat strong {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--k700);
          line-height: 1;
          margin-bottom: 4px;
        }

        .hero-stat span {
          font-size: 0.7rem;
          color: var(--mgrey);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 500;
        }

        /* ─── RIGHT / 3D Layout ─── */
        .hero-right {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
        }

        .hero-3d-layout-box {
          display: flex;
          flex-direction: row; /* Desktop side-by-side presentation */
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 36px;
        }

        .hero-3d-wrap {
          position: relative;
          flex: 0 0 380px; /* Precise circular shape */
          height: 380px;
          aspect-ratio: 1;
        }

        /* Decorative rings */
        .hero-3d-ring {
          position: absolute;
          inset: -5%;
          border-radius: 50%;
          border: 1.5px dashed rgba(139,17,27,0.15);
          animation: spin-slow 25s linear infinite;
          pointer-events: none;
        }

        .hero-3d-ring--2 {
          inset: -12%;
          border-color: rgba(213,143,75,0.12);
          animation-duration: 40s;
          animation-direction: reverse;
        }

        .hero-3d-canvas {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          /* Soft pink gradient bg for the canvas */
          background: radial-gradient(ellipse at 40% 40%,
            rgba(249,232,234,0.95) 0%,
            rgba(252,243,232,0.85) 50%,
            rgba(248,245,242,0.7) 100%);
          box-shadow:
            0 16px 50px rgba(139,17,27,0.12),
            0 0 0 1px rgba(230,163,168,0.35),
            inset 0 1px 0 rgba(255,255,255,0.8);
        }

        /* Floating cards */
        .hero-float-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1px solid var(--lgrey);
          border-radius: 12px;
          padding: 8px 14px;
          box-shadow: 0 6px 20px rgba(139,17,27,0.08);
          z-index: 10;
          min-width: 160px;
        }

        .hero-float-card strong {
          display: block;
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--k900);
          font-family: var(--font-body);
          line-height: 1.2;
        }

        .hero-float-card p {
          font-size: 0.64rem;
          color: var(--mgrey);
          margin: 0;
        }

        .hero-float-card--tl {
          top: 10%;
          left: -12%;
        }

        .hero-float-card--br {
          bottom: 10%;
          right: -12%;
        }

        .hfc-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          background: var(--k100);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ─── Premium Side-by-Side Slider Panel ─── */
        .embryo-slider-panel {
          flex: 1; /* Occupies the remaining space on the right */
          min-width: 310px;
          max-width: 360px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(230, 163, 168, 0.28);
          border-radius: 16px;
          padding: 16px 18px;
          box-shadow: 0 12px 36px rgba(139, 17, 27, 0.03);
          z-index: 20;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .slider-header span:first-child {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--mgrey);
        }

        .live-badge {
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--s700);
          background: rgba(213, 143, 75, 0.12);
          padding: 2px 7px;
          border-radius: 8px;
        }

        /* Milestones Track */
        .milestones-track-wrap {
          position: relative;
          height: 34px;
          display: flex;
          align-items: center;
          margin: 0 6px;
        }

        .milestones-line-bg {
          position: absolute;
          left: 10px;
          right: 10px;
          height: 3px;
          background: rgba(230, 163, 168, 0.2);
          z-index: 1;
          border-radius: 2px;
        }

        .milestones-line-progress {
          position: absolute;
          left: 10px;
          height: 3px;
          background: var(--k700);
          z-index: 2;
          border-radius: 2px;
          transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .milestones-dots {
          position: absolute;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          z-index: 3;
        }

        .milestone-dot-btn {
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          padding: 0;
          width: 38px;
          transition: transform 0.2s ease;
        }

        .milestone-dot-btn:hover {
          transform: scale(1.05);
        }

        .dot-circle {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid rgba(230, 163, 168, 0.6);
          position: relative;
          transition: all 0.3s ease;
        }

        .milestone-dot-btn:hover .dot-circle {
          border-color: var(--k700);
        }

        .milestone-dot-btn.active .dot-circle {
          background: var(--k700);
          border-color: var(--k700);
          box-shadow: 0 0 8px rgba(139, 17, 27, 0.3);
        }

        .milestone-dot-btn.active .dot-circle::after {
          content: '';
          position: absolute;
          inset: 2px;
          background: #fff;
          border-radius: 50%;
        }

        .dot-label {
          font-size: 0.65rem;
          font-weight: 600;
          color: #777;
          transition: color 0.3s ease;
        }

        .milestone-dot-btn.active .dot-label {
          color: var(--k900);
          font-weight: 700;
        }

        /* Detail card content */
        .slider-card-wrap {
          margin-top: 12px;
          min-height: 110px;
        }

        .slider-detail-card {
          background: #fff;
          border: 1px solid rgba(230, 163, 168, 0.15);
          border-radius: 12px;
          padding: 12px 14px;
          box-shadow: 0 6px 20px rgba(139, 17, 27, 0.015);
        }

        .card-top {
          margin-bottom: 6px;
        }

        .card-top h3 {
          font-family: var(--font-heading);
          font-size: 0.98rem;
          color: var(--k900);
          font-weight: 700;
          margin: 0;
        }

        .card-subtitle {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--s700);
          display: block;
          margin-top: 1px;
        }

        .card-desc {
          font-size: 0.78rem;
          line-height: 1.55;
          color: #555;
          margin: 0 0 10px;
        }

        .card-stats-strip {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #f6f0ed;
          padding-top: 8px;
        }

        .card-stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-lbl {
          font-size: 0.6rem;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 500;
          margin-bottom: 1px;
        }

        .stat-val {
          font-size: 0.74rem;
          color: var(--k900);
          font-weight: 700;
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-scroll-mouse {
          width: 22px;
          height: 36px;
          border: 2px solid var(--k300);
          border-radius: 11px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }

        .hero-scroll-wheel {
          width: 3px;
          height: 7px;
          background: var(--k500);
          border-radius: 2px;
          animation: float 1.8s ease-in-out infinite;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 32px;
          }
          .hero-left {
            max-width: 100%;
            order: 2;
          }
          .hero-right {
            order: 1;
            justify-content: center;
          }
          .hero-3d-layout-box {
            flex-direction: column; /* Stacked layout on smaller screens */
            max-width: 420px;
            margin: 0 auto;
            gap: 20px;
          }
          .hero-3d-wrap {
            flex: 0 0 320px;
            height: 320px;
            margin: 0 auto;
          }
          .hero-trust, .hero-actions {
            justify-content: center;
          }
          .hero-stats {
            justify-content: center;
          }
          .hero-float-card--tl { top: 5%; left: -2%; }
          .hero-float-card--br { bottom: 5%; right: -2%; }
          .embryo-slider-panel {
            width: 100%;
            max-width: 100%;
            min-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .hero-stats {
            flex-wrap: wrap;
            gap: 16px;
          }
          .hero-stat {
            border-right: none;
            padding: 0;
            flex: 0 0 calc(50% - 8px);
          }
          .hero-float-card {
            display: none;
          }
          .embryo-slider-panel {
            padding: 12px 14px;
          }
          .milestones-track-wrap {
            margin: 0;
          }
          .milestone-dot-btn {
            width: 32px;
          }
          .dot-label {
            font-size: 0.58rem;
          }
        }
      `}</style>
    </section>
  )
}
