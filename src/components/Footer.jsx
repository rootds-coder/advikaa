import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  const cols = {
    'Quick Links': [
      { label: 'Home', href: '/#home' },
      { label: 'The Journey', href: '/#journey' },
      { label: 'Why Choose Us', href: '/#why-us' },
      { label: 'Reviews & Success', href: '/#testimonials' },
      { label: 'Contact Us', href: '/#contact' },
    ],
    'Our Services': [
      { label: 'In Vitro Fertilization (IVF)', href: '/#services' },
      { label: 'Intrauterine Insemination (IUI)', href: '/#services' },
      { label: 'Fertility Preservation', href: '/#services' },
      { label: 'Genetic Testing (PGT)', href: '/#services' },
      { label: 'Donor Programs', href: '/#services' },
    ],
    'Technology': [
      { label: 'Advanced Science', href: '/#science' },
      { label: 'AI Embryo Selection', href: '/#science' },
      { label: 'Vitrification', href: '/#science' },
      { label: 'Time-lapse Incubators', href: '/#science' },
    ],
  }

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container">
          <div className="footer__top">
            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__logo">
                <img src="/logo.svg" alt="Advika IVF Centre Logo" style={{ height: '42px', width: 'auto', display: 'block' }} />
              </div>
              <p className="footer__desc">
                Ambala's most trusted fertility centre combining cutting-edge technology 
                with compassionate care to help families realize the dream of parenthood.
              </p>
              <div className="footer__socials">
                {[
                  { name: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                  { name: 'Instagram', circle: true },
                  { name: 'YouTube', yt: true },
                ].map(s => (
                  <a key={s.name} href="#" className="footer__social" aria-label={s.name}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       {s.path && <path d={s.path} fill="currentColor" stroke="none" />}
                       {s.circle && <>
                        <rect x="2" y="2" width="20" height="20" rx="5"/>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </>}
                       {s.yt && <>
                        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 00-1.95 1.95A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" fill="currentColor" stroke="none"/>
                        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                      </>}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(cols).map(([cat, items]) => (
              <div key={cat} className="footer__col">
                <h5 className="footer__col-title">{cat}</h5>
                <ul className="footer__col-list">
                  {items.map(item => (
                    <li key={item.label}><Link to={item.href} className="footer__link">{item.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p>© {year} Advika IVF Centre. All rights reserved.</p>
            <div className="footer__legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">PCPNDT Compliance</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer { 
          background: var(--white); 
          color: var(--dgrey); 
          border-top: 1px solid var(--lgrey);
        }

        .footer__main { padding: 64px 0 48px; }

        .footer__top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
        }

        .footer__logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .footer__name {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--k900);
          line-height: 1.2;
        }

        .footer__tag {
          display: block;
          font-size: 0.62rem;
          color: var(--s700);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .footer__desc {
          font-size: 0.82rem;
          line-height: 1.7;
          margin-bottom: 20px;
          max-width: 300px;
          color: var(--mgrey);
        }

        .footer__socials { display: flex; gap: 8px; }

        .footer__social {
          width: 36px; height: 36px;
          border-radius: 8px;
          border: 1px solid var(--lgrey);
          color: var(--mgrey);
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .footer__social:hover {
          border-color: var(--k700);
          color: #fff;
          background: var(--k700);
        }

        .footer__col-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--k900);
          margin-bottom: 18px;
          font-family: var(--font-heading);
          border-bottom: 2px solid var(--k100);
          padding-bottom: 6px;
          display: inline-block;
        }

        .footer__col-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }

        .footer__link {
          font-size: 0.85rem;
          color: var(--mgrey);
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .footer__link:hover { 
          color: var(--k700); 
          transform: translateX(4px);
        }

        .footer__bottom {
          background: var(--warm);
          padding: 20px 0;
          border-top: 1px solid var(--lgrey);
        }

        .footer__bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.8rem;
          color: var(--mgrey);
        }

        .footer__legal { display: flex; gap: 24px; }
        .footer__legal a { color: var(--mgrey); transition: color 0.2s; }
        .footer__legal a:hover { color: var(--k700); }

        @media (max-width: 1024px) {
          .footer__top { grid-template-columns: 1fr 1fr; }
          .footer__brand { grid-column: span 2; }
        }

        @media (max-width: 600px) {
          .footer__top { grid-template-columns: 1fr; }
          .footer__brand { grid-column: span 1; }
          .footer__bottom-inner { flex-direction: column; text-align: center; gap: 16px; }
          .footer__legal { justify-content: center; }
        }
      `}</style>
    </footer>
  )
}
