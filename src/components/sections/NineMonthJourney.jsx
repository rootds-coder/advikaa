import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function NineMonthJourney() {
  const containerRef = useRef(null)
  
  // Track scroll progress through the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Transform scroll progress (0 to 1) into a horizontal translation (0% to -66.666%)
  // Since we have 3 panels (300vw total), sliding by -66.666% brings the 3rd panel fully into view.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"])

  return (
    <section ref={containerRef} className="nine-month-sec">
      <div className="sticky-container">
        
        {/* The horizontal scrolling track */}
        <motion.div className="horizontal-track" style={{ x }}>
          
          {/* A continuous glowing line connecting the stages */}
          <div className="timeline-line">
            <motion.div 
              className="timeline-progress" 
              style={{ scaleX: scrollYProgress, transformOrigin: "left center" }} 
            />
          </div>

          {/* Stage 1: Embryo */}
          <div className="journey-panel">
            <img src="/assets/images/embryo.png" alt="Embryo" className="panel-bg" />
            <div className="panel-overlay" />
            <div className="panel-content">
              <span className="stage-label">Month 1</span>
              <h2 className="stage-title">The Miracle Begins</h2>
              <p className="stage-desc">From a single microscopic cell to a cluster of life, the foundation of your future family is carefully nurtured.</p>
            </div>
          </div>

          {/* Stage 2: Fetus */}
          <div className="journey-panel">
            <img src="/assets/images/fetus.png" alt="Fetus" className="panel-bg" />
            <div className="panel-overlay" />
            <div className="panel-content">
              <span className="stage-label">Month 5</span>
              <h2 className="stage-title">First Heartbeat</h2>
              <p className="stage-desc">Safe within the womb, tiny fingers and toes form. The gentle, rhythmic heartbeat becomes the most beautiful sound in the world.</p>
            </div>
          </div>

          {/* Stage 3: Newborn */}
          <div className="journey-panel">
            <img src="/assets/images/newborn.png" alt="Newborn" className="panel-bg" />
            <div className="panel-overlay" />
            <div className="panel-content">
              <span className="stage-label">Month 9</span>
              <h2 className="stage-title">Bringing Hope Home</h2>
              <p className="stage-desc">The journey of a thousand steps culminates in a single, perfect moment. A new life begins, and a family is born.</p>
            </div>
          </div>

        </motion.div>
        
        {/* Subtle heartbeat pulse visual overlay across the whole screen */}
        <div className="heartbeat-overlay" />
      </div>

      <style>{`
        .nine-month-sec {
          height: 300vh; /* 3 pages of scrolling */
          background: #000;
        }

        .sticky-container {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: #000;
        }

        .horizontal-track {
          display: flex;
          height: 100%;
          width: 300vw;
          position: relative;
        }

        /* The glowing connecting line */
        .timeline-line {
          position: absolute;
          top: 50%;
          left: 10vw;
          right: 10vw;
          height: 2px;
          background: rgba(255,255,255,0.1);
          z-index: 5;
          pointer-events: none;
          transform: translateY(120px);
        }

        .timeline-progress {
          height: 100%;
          width: 100%;
          background: var(--s700); /* Kesar gold */
          box-shadow: 0 0 15px var(--s700);
        }

        .journey-panel {
          width: 100vw;
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
        }

        .panel-bg {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: 0;
          opacity: 0.7;
          /* Fade the left and right edges so the images blend seamlessly into each other */
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }

        .panel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(94,12,19,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%);
          z-index: 1;
        }

        .panel-content {
          position: relative;
          z-index: 2;
          max-width: 650px;
          color: #fff;
          /* Shift text slightly up so it sits nicely above the timeline line */
          transform: translateY(-30px);
        }

        .stage-label {
          display: inline-block;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--s700);
          margin-bottom: 20px;
          border-bottom: 2px solid var(--s700);
          padding-bottom: 6px;
        }

        .stage-title {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: #fff;
          margin-bottom: 20px;
          text-shadow: 0 8px 24px rgba(0,0,0,0.6);
        }

        .stage-desc {
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          line-height: 1.7;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 4px 12px rgba(0,0,0,0.6);
        }

        .heartbeat-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(139,17,27,0.12) 0%, transparent 60%);
          z-index: 3;
          pointer-events: none;
          animation: heart-pulse 1.2s infinite ease-in-out;
        }

        @keyframes heart-pulse {
          0% { opacity: 0.2; transform: scale(1); }
          15% { opacity: 0.7; transform: scale(1.05); }
          30% { opacity: 0.2; transform: scale(1); }
          100% { opacity: 0.2; transform: scale(1); }
        }
      `}</style>
    </section>
  )
}
