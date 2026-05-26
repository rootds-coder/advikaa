import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getFaqs } from '../utils/faqsDb'

function FAQItem({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{q}</span>
        <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
      </button>
      <motion.div 
        className="faq-answer-wrap"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="faq-answer">{a}</p>
      </motion.div>
    </div>
  )
}

export default function FAQ() {
  const [faqData, setFaqData] = useState([])

  useEffect(() => {
    const loadFaqs = () => {
      setFaqData(getFaqs())
    }
    loadFaqs()
    window.addEventListener('faqs-update', loadFaqs)
    return () => window.removeEventListener('faqs-update', loadFaqs)
  }, [])

  return (
    <div className="faq-page">
      <div className="faq-header">
        <div className="container">
          <span className="section-label">Knowledge Base</span>
          <h1 className="faq-title">Frequently Asked <span className="text-kumkum">Questions</span></h1>
          <p className="faq-subtitle">Find answers to common questions about our fertility treatments, procedures, and programs.</p>
        </div>
      </div>

      <div className="container">
        <div className="faq-content">
          {faqData.map((category) => (
            category.faqs.length > 0 && (
              <div key={category.id} id={category.id} className="faq-category-section" style={{ scrollMarginTop: '100px' }}>
                <h2 className="faq-category-title">{category.category}</h2>
                <div className="faq-list">
                  {category.faqs.map((faq, index) => (
                    <FAQItem key={`${category.id}-${index}`} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            )
          ))}
          {faqData.every(cat => cat.faqs.length === 0) && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--mgrey)' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>❓</span>
              <p>No frequently asked questions available. Add new FAQ guides in the Admin Panel!</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .faq-page {
          padding-bottom: 100px;
          background: var(--warm);
          min-height: 100vh;
        }

        .faq-header {
          background: var(--k100);
          padding: 80px 0;
          text-align: center;
          margin-bottom: 60px;
          border-bottom: 1px solid var(--k300);
        }

        .faq-title {
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--k900);
          margin-bottom: 16px;
        }

        .faq-subtitle {
          color: var(--mgrey);
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .faq-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-category-section {
          margin-bottom: 48px;
        }

        .faq-category-title {
          font-size: 1.5rem;
          color: var(--k700);
          margin-bottom: 24px;
          font-family: var(--font-heading);
          border-bottom: 2px solid var(--k300);
          padding-bottom: 8px;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-item {
          background: var(--white);
          border: 1px solid var(--lgrey);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .faq-item:hover {
          border-color: var(--k300);
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: none;
          border: none;
          text-align: left;
          font-size: 1rem;
          font-weight: 600;
          color: var(--dgrey);
          cursor: pointer;
          font-family: var(--font-body);
        }

        .faq-icon {
          font-size: 1.4rem;
          color: var(--k700);
          transition: transform 0.3s;
        }

        .faq-icon.open {
          transform: rotate(45deg);
        }

        .faq-answer-wrap {
          overflow: hidden;
        }

        .faq-answer {
          padding: 0 24px 24px 24px;
          color: var(--mgrey);
          font-size: 0.95rem;
          line-height: 1.7;
        }
      `}</style>
    </div>
  )
}
