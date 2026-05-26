import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', treatment: '', message: '' })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true) }

  return (
    <section id="contact" className="section contact-sec">
      <div className="container" ref={ref}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 560 }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Begin Your <span className="text-kumkum">Journey</span> to Parenthood</h2>
          <p className="section-sub">Your first consultation is completely free. Talk to our specialists and take the first step towards your dream family.</p>
          <div className="divider" />
        </motion.div>

        {/* ── NEW: Emotional Call to Action & Map View Split Banner ── */}
        <motion.div 
          className="emotional-banner card-base"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Left Column: Emotional Copy */}
          <div className="eb-content">
            <span className="eb-heart">🌸</span>
            <h3 className="eb-title">चलो, अपनी नन्ही खुशियों की तरफ...</h3>
            <p className="eb-text">
              Let’s take a gentle, hopeful step together towards the beautiful dream of holding your baby. 
              Our compassionate fertility specialists and world-class clinical laboratory are here to guide you at every moment.
            </p>
            <div className="eb-actions">
              <a href="#consultation-form" className="btn-primary-k eb-btn">
                Chalo, Apni Nanhi Khushiyon Ki Taraf 👶
              </a>
              <a 
                href="https://www.google.com/maps/place/Advika+Fertility+%26+IVF+Center/@30.3687993,76.7875308,17z/data=!4m6!3m5!1s0x390fc9d02a505593:0xc6a6d20d4289f7c!8m2!3d30.3687993!4d76.7875308!16s%2Fg%2F11z307z5cl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-outline-k eb-btn eb-btn--map"
              >
                Locate Us on Google Maps
              </a>
            </div>
          </div>

          {/* Right Column: Clickable Live Google Map Embed */}
          <a 
            href="https://www.google.com/maps/place/Advika+Fertility+%26+IVF+Center/@30.3687993,76.7875308,17z/data=!4m6!3m5!1s0x390fc9d02a505593:0xc6a6d20d4289f7c!8m2!3d30.3687993!4d76.7875308!16s%2Fg%2F11z307z5cl"
            target="_blank"
            rel="noopener noreferrer"
            className="eb-map-wrap"
          >
            <iframe 
              src="https://maps.google.com/maps?q=30.3687993,76.7875308+(Advika%20Fertility%20%26%20IVF%20Center)&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: 12, pointerEvents: 'none' }} 
              allowFullScreen="" 
              loading="lazy"
              title="Advika IVF Centre Location Map"
            />
            <div className="map-overlay-hint">
              <span>📍 Click to Open Directions & Pinpoint Location</span>
            </div>
          </a>
        </motion.div>

        <div className="contact-layout">
          {/* Form */}
          <motion.div
            className="contact-form-wrap card-base"
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {!submitted ? (
              <>
                <div className="contact-form-head">
                  <h3>Book a Free Consultation</h3>
                  <p>Fill in the form — we'll call you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} id="consultation-form" className="c-form">
                  <div className="c-row">
                    <div className="c-group">
                      <label htmlFor="name">Full Name *</label>
                      <input type="text" id="name" name="name" value={form.name}
                        onChange={handleChange} placeholder="Your full name" required />
                    </div>
                    <div className="c-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" value={form.phone}
                        onChange={handleChange} placeholder="+91 98765 43210" required />
                    </div>
                  </div>

                  <div className="c-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={form.email}
                      onChange={handleChange} placeholder="your@email.com" />
                  </div>

                  <div className="c-group">
                    <label htmlFor="treatment">Treatment Interested In</label>
                    <select id="treatment" name="treatment" value={form.treatment} onChange={handleChange}>
                      <option value="">Select a treatment</option>
                      <option>IVF (In Vitro Fertilization)</option>
                      <option>IUI (Intrauterine Insemination)</option>
                      <option>Egg Freezing</option>
                      <option>Genetic Testing (PGT)</option>
                      <option>Donor Program</option>
                      <option>Surrogacy</option>
                      <option>General Consultation</option>
                    </select>
                  </div>

                  <div className="c-group">
                    <label htmlFor="message">Message (Optional)</label>
                    <textarea id="message" name="message" value={form.message}
                      onChange={handleChange} placeholder="Tell us briefly about your situation..."
                      rows={4} />
                  </div>

                  <button type="submit" className="btn-primary-k" id="form-submit-btn"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                    </svg>
                    Send Request — It's Free
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                className="c-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="c-success-icon">💌</div>
                <h3>Thank You, {form.name || 'Friend'}!</h3>
                <p>We've received your request. Our team will call you within 24 hours to schedule your free appointment.</p>
                <button className="btn-outline-k" onClick={() => setSubmitted(false)} style={{ marginTop: 20 }}>
                  Submit Another Request
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Info card */}
            <div className="ci-card card-base">
              <h4 className="ci-title">Contact Us Directly</h4>
              {[
                { icon: '📞', label: 'Phone',     val: '+91 98765 43210',         href: 'tel:+919876543210' },
                { icon: '📱', label: 'WhatsApp',  val: '+91 98765 43210',         href: 'https://wa.me/919876543210' },
                { icon: '📧', label: 'Email',     val: 'care@advikaivf.com',      href: 'mailto:care@advikaivf.com' },
                { icon: '📍', label: 'Address',   val: 'Sector 1, Ambala, Haryana — 134003', href: 'https://www.google.com/maps/place/Advika+Fertility+%26+IVF+Center/@30.3687993,76.7875308,17z/data=!4m6!3m5!1s0x390fc9d02a505593:0xc6a6d20d4289f7c!8m2!3d30.3687993!4d76.7875308!16s%2Fg%2F11z307z5cl' },
                { icon: '🕐', label: 'Timings',   val: 'Mon–Sat 9AM–7PM | Sun 10AM–2PM', href: null },
              ].map(item => (
                <div key={item.label} className="ci-item">
                  <span className="ci-icon">{item.icon}</span>
                  <div>
                    <p className="ci-label">{item.label}</p>
                    {item.href
                      ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="ci-val ci-link">{item.val}</a>
                      : <p className="ci-val">{item.val}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Promise */}
            <div className="ci-promise card-base">
              <h4 className="ci-title">Our Promise to You</h4>
              {[
                'Free first consultation — always',
                'Callback within 2 hours guaranteed',
                'Complete privacy & confidentiality',
                'No-pressure guidance from day one',
                'Transparent pricing, no hidden fees',
              ].map(p => (
                <div key={p} className="ci-promise-row">
                  <span className="ci-check">✓</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-sec { background: var(--k100); }

        /* ── Emotional CTA & Map Split Banner ── */
        .emotional-banner {
          background: linear-gradient(135deg, #FFF3F4 0%, #FFF8F1 100%);
          border: 1.5px solid rgba(230, 163, 168, 0.35);
          padding: 36px 40px;
          border-radius: 16px;
          margin-bottom: 40px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr; /* Elegant side-by-side presentation */
          gap: 40px;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(139, 17, 27, 0.03);
        }

        .emotional-banner::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(213,143,75,0.08) 0%, transparent 65%);
          pointer-events: none;
        }

        .eb-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .eb-heart {
          font-size: 2.2rem;
          margin-bottom: 12px;
          display: inline-block;
          animation: float 2.8s ease-in-out infinite;
        }

        .eb-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 2.8vw, 1.95rem);
          font-weight: 700;
          color: var(--k900);
          margin: 0 0 10px;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }

        .eb-text {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #555;
          margin: 0 0 22px;
        }

        .eb-actions {
          display: flex;
          gap: 14px;
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        .eb-btn {
          font-size: 0.82rem !important;
          padding: 10px 20px !important;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }

        .eb-btn--map {
          background: #fff;
          border-color: rgba(139,17,27,0.3) !important;
          color: var(--k900) !important;
        }

        .eb-btn--map:hover {
          background: var(--k50);
          border-color: var(--k700) !important;
        }

        /* Clickable Embedded Map Iframe Box */
        .eb-map-wrap {
          width: 100%;
          height: 230px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(139, 17, 27, 0.06);
          border: 1px solid rgba(230, 163, 168, 0.2);
          position: relative;
          display: block;
          text-decoration: none;
        }

        .map-overlay-hint {
          position: absolute;
          inset: 0;
          background: rgba(139, 17, 27, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease, background 0.3s ease;
          z-index: 5;
        }

        .eb-map-wrap:hover .map-overlay-hint {
          opacity: 1;
          background: rgba(139, 17, 27, 0.12);
        }

        .map-overlay-hint span {
          background: #fff;
          border: 1px solid rgba(139, 17, 27, 0.2);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--k900);
          box-shadow: 0 4px 12px rgba(139, 17, 27, 0.15);
          transform: translateY(8px);
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .eb-map-wrap:hover .map-overlay-hint span {
          transform: translateY(0);
        }

        /* Form & Grid Layout */
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 28px;
          align-items: start;
        }

        .contact-form-wrap {
          padding: 40px;
          background: var(--white);
        }

        .contact-form-head {
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--lgrey);
        }

        .contact-form-head h3 {
          font-size: 1.3rem;
          color: var(--k900);
          margin-bottom: 6px;
        }

        .contact-form-head p {
          font-size: 0.85rem;
          color: var(--mgrey);
        }

        .c-form { display: flex; flex-direction: column; gap: 18px; }

        .c-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .c-group { display: flex; flex-direction: column; gap: 6px; }

        .c-group label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--dgrey);
          letter-spacing: 0.02em;
        }

        .c-group input,
        .c-group select,
        .c-group textarea {
          background: var(--warm);
          border: 1.5px solid var(--lgrey);
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 0.9rem;
          color: var(--dgrey);
          font-family: var(--font-body);
          transition: all 0.2s ease;
          outline: none;
          resize: none;
          -webkit-appearance: none;
        }

        .c-group select option { background: #fff; }

        .c-group input:focus,
        .c-group select:focus,
        .c-group textarea:focus {
          border-color: var(--k500);
          background: var(--k50);
          box-shadow: 0 0 0 3px rgba(139,17,27,0.08);
        }

        .c-group input::placeholder,
        .c-group textarea::placeholder { color: #aaa; }

        .c-success { text-align: center; padding: 40px 20px; }
        .c-success-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .c-success h3 { font-size: 1.4rem; color: var(--k900); margin-bottom: 12px; }
        .c-success p { font-size: 0.9rem; color: var(--mgrey); line-height: 1.7; }

        .contact-info { display: flex; flex-direction: column; gap: 16px; }

        .ci-card, .ci-promise {
          padding: 28px;
          background: var(--white);
        }

        .ci-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--k900);
          margin-bottom: 18px;
          font-family: var(--font-body);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .ci-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--lgrey);
        }

        .ci-item:last-child { border-bottom: none; }

        .ci-icon { font-size: 1rem; margin-top: 1px; flex-shrink: 0; }

        .ci-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--mgrey); margin-bottom: 2px; }

        .ci-val { font-size: 0.85rem; color: var(--dgrey); }

        .ci-link { color: var(--k700); transition: opacity 0.2s; text-decoration: none; }
        .ci-link:hover { opacity: 0.75; }

        .ci-promise-row {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 8px 0;
          font-size: 0.85rem;
          color: var(--dgrey);
          border-bottom: 1px solid var(--lgrey);
        }

        .ci-promise-row:last-child { border-bottom: none; }

        .ci-check {
          color: var(--k700);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        @media (max-width: 960px) {
          .emotional-banner { 
            grid-template-columns: 1fr; 
            padding: 28px 24px; 
            gap: 24px;
          }
          .eb-content {
            align-items: center;
            text-align: center;
          }
          .eb-actions {
            justify-content: center;
          }
          .eb-map-wrap {
            height: 200px;
          }
          .contact-layout { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .c-row { grid-template-columns: 1fr; }
          .contact-form-wrap { padding: 24px; }
          .eb-actions { flex-direction: column; width: 100%; }
          .eb-btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  )
}
