import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home',         href: '/#home' },
  { label: 'Journey',      href: '/#journey' },
  { label: 'Services',     href: '/#services' },
  { label: 'Science',      href: '/#science' },
  { label: 'Why Us',       href: '/#why-us' },
  { label: 'Reviews',      href: '/#testimonials' },
  { label: 'Contact',      href: '/#contact' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Sticky Top Bar ── */}
      <div className="topbar" id="topbar">
        <img src="/logo.svg" alt="Logo" style={{ height: '18px', width: 'auto', filter: 'brightness(0) invert(1)', marginRight: '4px' }} />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{opacity:0.9}}>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
        Book your free fertility consultation today
        <Link to="/#contact" className="topbar__btn" id="topbar-book-btn">Book now</Link>
      </div>

      {/* ── Main Navbar ── */}
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--shadow' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ 
          y: scrolled ? -100 : 0, 
          opacity: scrolled ? 0 : 1
        }}
        style={{ pointerEvents: scrolled ? 'none' : 'auto' }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/#home" className="navbar__logo" id="navbar-logo">
            <img src="/logo.svg" alt="Advika IVF Centre Logo" style={{ height: '42px', width: 'auto', display: 'block' }} />
          </Link>

          {/* Desktop links */}
          <ul className="navbar__links">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.href} className="navbar__link">{l.label}</Link>
              </li>
            ))}
          </ul>

          {/* Book CTA */}
          <Link to="/#contact" className="btn-primary-k navbar__cta" id="nav-book-btn"
             style={{ padding: '9px 20px', fontSize: '0.85rem', borderRadius: '7px' }}>
            Book Appointment
          </Link>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ display:'block', width:22, height:1.5, background: mobileOpen ? '#8B111B' : '#2E2E2E',
              transition:'all .3s', transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display:'block', width:22, height:1.5, background:'#2E2E2E',
              transition:'all .3s', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display:'block', width:22, height:1.5, background: mobileOpen ? '#8B111B' : '#2E2E2E',
              transition:'all .3s', transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={l.href}
                  className="mobile-nav__link"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/#contact" className="btn-primary-k"
               style={{ margin:'16px 20px', display:'flex', justifyContent:'center' }}
               onClick={() => setMobileOpen(false)}>
              Book Appointment
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: sticky;
          top: 44px;
          z-index: 1000;
          background: #fff;
          border-bottom: 1px solid var(--lgrey);
          transition: box-shadow 0.3s ease;
        }

        .navbar--shadow {
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
        }

        .navbar__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          height: 68px;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
          margin-right: 8px;
        }

        .navbar__logo-icon {
          animation: spin-slow 22s linear infinite;
        }

        .navbar__logo-name {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--k700);
          line-height: 1.1;
        }

        .navbar__logo-tag {
          display: block;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--mgrey);
        }

        .navbar__links {
          list-style: none;
          display: flex;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }

        .navbar__link {
          font-size: 0.85rem;
          color: var(--mgrey);
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 7px;
          transition: all 0.2s ease;
          display: block;
        }

        .navbar__link:hover {
          color: var(--k700);
          background: var(--k50);
        }

        .navbar__cta {
          flex-shrink: 0;
        }

        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          margin-left: auto;
        }

        .mobile-nav {
          position: sticky;
          top: 112px;
          z-index: 999;
          background: #fff;
          border-bottom: 1px solid var(--lgrey);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .mobile-nav__link {
          padding: 14px 20px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--dgrey);
          border-bottom: 1px solid var(--lgrey);
          transition: all 0.2s ease;
          display: block;
        }

        .mobile-nav__link:hover {
          color: var(--k700);
          background: var(--k50);
        }

        @media (max-width: 960px) {
          .navbar__links, .navbar__cta { display: none; }
          .navbar__hamburger { display: flex; }
        }
      `}</style>
    </>
  )
}
