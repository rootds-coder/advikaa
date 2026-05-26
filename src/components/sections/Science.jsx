import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Fix: DNAHelix colors for light bg
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import DNAHelix from '../3d/DNAHelix'

function LightDNAScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.45} color="#FFF5EE" />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[3, -3, 3]} intensity={2.0} color="#B63A45" />
      <pointLight position={[-3, 3, -3]} intensity={1.5} color="#D58F4B" />
      <DNAHelix position={[0, 0, 0]} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} enableDamping dampingFactor={0.05} />
    </Canvas>
  )
}

export default function Science() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  const stats = [
    { value: '85%',   label: 'IVF Success Rate',      sub: 'Above national average' },
    { value: '2000+', label: 'Successful Pregnancies', sub: 'Lives changed forever' },
    { value: '15+',   label: 'Years of Excellence',    sub: 'Trusted expertise' },
    { value: '99.9%', label: 'Lab Accuracy',           sub: 'ISO certified laboratory' },
  ]

  const techs = [
    { icon: '🔬', name: 'ICSI / IMSI',           desc: 'Single sperm injection under 6000x magnification' },
    { icon: '🧬', name: 'PGT-A Genetic Testing', desc: 'Chromosomal screening of every embryo' },
    { icon: '❄️', name: 'Vitrification',          desc: 'Flash-freeze at >99% survival rate' },
    { icon: '🤖', name: 'AI Embryo Grading',     desc: 'Machine learning selects healthiest embryo' },
    { icon: '🌡️', name: 'Time-lapse Incubators', desc: 'Continuous monitoring without disturbance' },
    { icon: '🧪', name: 'ERA Endometrial Test',  desc: 'Personalized implantation window testing' },
  ]

  return (
    <section id="science" className="section science-sec">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 580 }}
        >
          <span className="section-label">Advanced Science</span>
          <h2 className="section-title">Cutting-Edge <span className="text-kumkum">Technology</span>,<br />Compassionate Care</h2>
          <p className="section-sub">Our ISO-certified embryology lab uses Nobel Prize-winning science and AI-powered selection for unparalleled IVF outcomes.</p>
          <div className="divider" />
        </motion.div>

        <div className="sci-layout">
          {/* DNA canvas */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="sci-canvas-wrap">
              <LightDNAScene />
              <div className="sci-canvas-label">
                <p className="section-label" style={{ marginBottom: 2 }}>DNA Double Helix</p>
                <p style={{ fontSize:'0.8rem', color:'var(--mgrey)' }}>Genetic analysis at Advika IVF Centre</p>
              </div>
            </div>
          </motion.div>

          {/* Tech grid */}
          <div className="sci-tech-grid">
            {techs.map((t, i) => (
              <motion.div
                key={t.name}
                className="sci-tech card-base"
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
              >
                <span style={{ fontSize:'1.5rem', display:'block', marginBottom:8 }}>{t.icon}</span>
                <h4 style={{ fontSize:'0.88rem', fontWeight:700, color:'var(--k900)', marginBottom:5, fontFamily:'var(--font-body)' }}>{t.name}</h4>
                <p style={{ fontSize:'0.78rem', color:'var(--mgrey)', lineHeight:1.55 }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="sci-stats">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="sci-stat card-base"
              initial={{ opacity: 0, y: 24 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <strong className="sci-val">{s.value}</strong>
              <p style={{ fontSize:'0.85rem', fontWeight:600, color:'var(--dgrey)', marginBottom:4 }}>{s.label}</p>
              <p style={{ fontSize:'0.72rem', color:'var(--mgrey)' }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .science-sec { background: var(--white); }

        .sci-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
          margin-bottom: 56px;
        }

        .sci-canvas-wrap {
          border-radius: 20px;
          overflow: hidden;
          height: 440px;
          background: radial-gradient(ellipse at 45% 40%,
            rgba(249,232,234,0.96), rgba(252,243,232,0.88) 55%, rgba(248,245,242,0.92));
          border: 1px solid var(--k300);
          box-shadow: var(--shadow-md);
          position: relative;
        }

        .sci-canvas-label {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(8px);
          border-radius: 10px;
          padding: 12px 14px;
          border: 1px solid var(--lgrey);
        }

        .sci-tech-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .sci-tech {
          padding: 18px;
          background: var(--white);
        }

        .sci-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .sci-stat {
          background: var(--white);
          padding: 28px 20px;
          text-align: center;
        }

        .sci-val {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 2.1rem;
          font-weight: 700;
          color: var(--k700);
          line-height: 1;
          margin-bottom: 8px;
        }

        @media (max-width: 1024px) {
          .sci-layout { grid-template-columns: 1fr; }
          .sci-stats  { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 600px) {
          .sci-tech-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
