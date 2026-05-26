import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getGalleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage, resetGallery, getDoctors, addDoctor, updateDoctor, deleteDoctor, resetDoctors, getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, resetTestimonials, getFaqs, addFaq, updateFaq, deleteFaq, resetFaqs } from '../utils/apiWrapper';
import { apiRequest } from '../utils/api';
// Duplicate import removed
// Removed stray import entries
// Removed stray doctor import entries
// Removed stray doctorsDb import
// Removed stray testimonial import entries
// Removed stray testimonialsDb import
// Removed stray FAQ import entries
// Removed stray faqsDb import
export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  // Dashboard tab: 'gallery' | 'doctors' | 'testimonials' | 'faqs'
  const [activeTab, setActiveTab] = useState('gallery')
  
  // ─── 1. GALLERY TAB STATE ───
  const [galleryItems, setGalleryItems] = useState([])
  const [galleryEditingId, setGalleryEditingId] = useState(null)
  const [galTitle, setGalTitle] = useState('')
  const [galCategory, setGalCategory] = useState('lab')
  const [galDesc, setGalDesc] = useState('')
  const [galImageUrl, setGalImageUrl] = useState('')
  const [galFileError, setGalFileError] = useState('')
  const galFileInputRef = useRef(null)
  // ─── 2. SPECIALISTS TAB STATE ───
  const [doctorsList, setDoctorsList] = useState([])
  const [docEditingId, setDocEditingId] = useState(null)
  const [docName, setDocName] = useState('')
  const [docTitle, setDocTitle] = useState('')
  const [docQual, setDocQual] = useState('')
  const [docDesc, setDocDesc] = useState('')
  const [docExp, setDocExp] = useState('')
  const [docPatients, setDocPatients] = useState('')
  const [docImageUrl, setDocImageUrl] = useState('')
  const [docFileError, setDocFileError] = useState('')
  const docFileInputRef = useRef(null)
  // ─── 3. TESTIMONIALS TAB STATE ───
  const [testimonialsList, setTestimonialsList] = useState([])
  const [testEditingId, setTestEditingId] = useState(null)
  const [testName, setTestName] = useState('')
  const [testLocation, setTestLocation] = useState('')
  const [testAvatar, setTestAvatar] = useState('👶')
  const [testTreatment, setTestTreatment] = useState('')
  const [testQuote, setTestQuote] = useState('')
  const [testOutcome, setTestOutcome] = useState('')
  // ─── 4. FAQS TAB STATE ───
  const [faqCategories, setFaqCategories] = useState([])
  const [faqEditingCatId, setFaqEditingCatId] = useState(null)
  const [faqEditingIndex, setFaqEditingIndex] = useState(null)
  const [faqCatId, setFaqCatId] = useState('ivf')
  const [faqQuestion, setFaqQuestion] = useState('')
  const [faqAnswer, setFaqAnswer] = useState('')
  // Load all data on mount (only if authenticated)
  useEffect(() => {
    if (sessionStorage.getItem('advika_admin_auth') === 'true') {
      setIsAuthenticated(true)
      refreshAllData()
    }
  }, [])
  const refreshAllData = async () => {
    try {
      const [gallery, doctors, testimonials, faqs] = await Promise.all([
        getGalleryImages(),
        getDoctors(),
        getTestimonials(),
        getFaqs()
      ])
      setGalleryItems(Array.isArray(gallery) ? gallery : [])
      setDoctorsList(Array.isArray(doctors) ? doctors : [])
      setTestimonialsList(Array.isArray(testimonials) ? testimonials : [])
      setFaqCategories(Array.isArray(faqs) ? faqs : [])
    } catch (err) {
      console.error('Failed to load data:', err)
    }
  }
  // Admin login via MongoDB
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await apiRequest('/auth/login', 'POST', { email, password })
      const token = res.token
      sessionStorage.setItem('adminToken', token)
      sessionStorage.setItem('advika_admin_auth', 'true')
      setIsAuthenticated(true)
      setLoginError('')
      refreshAllData()
    } catch (err) {
      setLoginError(err.message || 'Login failed')
    }
  }
  // ─── 1. GALLERY CONTROLS ───
  const handleGalleryUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setGalFileError('File size must be under 2MB.')
      return
    }
    setGalFileError('')
    const reader = new FileReader()
    reader.onloadend = () => setGalImageUrl(reader.result)
    reader.readAsDataURL(file)
  }
  const handleGallerySubmit = async (e) => {
    e.preventDefault()
    if (!galTitle || !galImageUrl || !galDesc) {
      alert('Please enter a title, description, and provide an image.')
      return
    }
    const data = { title: galTitle, category: galCategory, description: galDesc, imageUrl: galImageUrl }
    try {
      if (galleryEditingId) {
        await updateGalleryImage(galleryEditingId, data)
        setGalleryEditingId(null)
      } else {
        await addGalleryImage(data)
      }
      setGalTitle('')
      setGalDesc('')
      setGalImageUrl('')
      setGalCategory('lab')
      if (galFileInputRef.current) galFileInputRef.current.value = ''
      await refreshAllData()
      window.dispatchEvent(new Event('gallery-update'))
    } catch (err) {
      alert('Failed to save: ' + err.message)
    }
  }
  // ─── 2. DOCTORS CONTROLS ───
  const handleDoctorUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setDocFileError('File size must be under 2MB.')
      return
    }
    setDocFileError('')
    const reader = new FileReader()
    reader.onloadend = () => setDocImageUrl(reader.result)
    reader.readAsDataURL(file)
  }
  const handleDoctorSubmit = async (e) => {
    e.preventDefault()
    if (!docName || !docTitle || !docQual || !docDesc || !docExp || !docPatients || !docImageUrl) {
      alert('Please fill out all fields and provide a portrait photo.')
      return
    }
    const data = { name: docName, title: docTitle, qual: docQual, desc: docDesc, exp: docExp, patients: docPatients, image: docImageUrl }
    try {
      if (docEditingId) {
        await updateDoctor(docEditingId, data)
        setDocEditingId(null)
      } else {
        await addDoctor(data)
      }
      setDocName('')
      setDocTitle('')
      setDocQual('')
      setDocDesc('')
      setDocExp('')
      setDocPatients('')
      setDocImageUrl('')
      if (docFileInputRef.current) docFileInputRef.current.value = ''
      await refreshAllData()
    } catch (err) {
      alert('Failed to save: ' + err.message)
    }
  }
  // ─── 3. TESTIMONIAL CONTROLS ───
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault()
    if (!testName || !testLocation || !testTreatment || !testQuote || !testOutcome) {
      alert('Please complete all testimonial fields.')
      return
    }
    const data = { name: testName, location: testLocation, avatar: testAvatar, treatment: testTreatment, quote: testQuote, outcome: testOutcome }
    try {
      if (testEditingId) {
        await updateTestimonial(testEditingId, data)
        setTestEditingId(null)
      } else {
        await addTestimonial(data)
      }
      setTestName('')
      setTestLocation('')
      setTestAvatar('👶')
      setTestTreatment('')
      setTestQuote('')
      setTestOutcome('')
      await refreshAllData()
    } catch (err) {
      alert('Failed to save: ' + err.message)
    }
  }
  // ─── 4. FAQ CONTROLS ───
  const handleFaqSubmit = async (e) => {
    e.preventDefault()
    if (!faqQuestion || !faqAnswer) {
      alert('Please enter both the question and answer text.')
      return
    }
    try {
      if (faqEditingCatId !== null && faqEditingIndex !== null) {
        await updateFaq(faqEditingCatId, { q: faqQuestion, a: faqAnswer })
        setFaqEditingCatId(null)
        setFaqEditingIndex(null)
      } else {
        await addFaq({ catId: faqCatId, q: faqQuestion, a: faqAnswer })
      }
      setFaqQuestion('')
      setFaqAnswer('')
      await refreshAllData()
    } catch (err) {
      alert('Failed to save: ' + err.message)
    }
  }
  // UNLOCK VIEW
  if (!isAuthenticated) {
    return (
      <div className="login-portal">
        <motion.div 
          className="login-card card-base"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="portal-logo">🧬</div>
          <h1>Advika Hospital</h1>
          <p className="portal-sub">Admin Portal — Hospital Management Dashboard</p>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Enter Email</label>
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Enter Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <p className="error-msg">{loginError}</p>}
            
            <button type="submit" className="btn-primary-k" style={{ width: '100%', justifyContent: 'center' }}>
              Authorize Access
            </button>
          </form>
          
          <div style={{ marginTop: 20 }}>
            <Link to="/" className="back-link">← Return to Website</Link>
          </div>
        </motion.div>
        <style>{`
          .login-portal {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--k50);
            padding: 24px;
          }
          .login-card {
            max-width: 400px;
            width: 100%;
            padding: 40px 32px;
            background: var(--white);
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          }
          .portal-logo { font-size: 3rem; margin-bottom: 12px; display: inline-block; }
          .portal-sub { font-size: 0.85rem; color: var(--mgrey); margin-bottom: 28px; }
          .form-group { margin-bottom: 20px; }
          .form-group label { display: block; font-size: 0.76rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--k900); margin-bottom: 8px; }
          .form-group input { width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--lgrey); font-family: var(--font-body); font-size: 1rem; outline: none; transition: var(--transition); }
          .form-group input:focus { border-color: var(--k700); box-shadow: 0 0 0 3px rgba(139,17,27,0.1); }
          .error-msg { font-size: 0.78rem; color: var(--k700); font-weight: 600; margin-bottom: 16px; }
          .back-link { font-size: 0.82rem; color: var(--k700); font-weight: 600; }
          .back-link:hover { color: var(--k900); text-decoration: underline; }
        `}</style>
      </div>
    )
  }
  return (
    <div className="admin-page">
      {/* Top Banner */}
      <header className="admin-header">
        <div className="container admin-container-top">
          <div>
            <h1>Advika Hospital Management Panel</h1>
            <p>Admin Dashboard — Complete Dynamic Visual, Specialists, Patient Stories & FAQ Controls</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/" className="btn-outline-k" style={{ padding: '9px 18px', fontSize: '0.8rem' }}>
              ← Return to Live Website
            </Link>
            <button
              onClick={() => {
                setIsAuthenticated(false)
                sessionStorage.removeItem('adminToken')
                sessionStorage.removeItem('advika_admin_auth')
              }}
              className="logout-btn"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>
      {/* Tab Navigation */}
      <div className="admin-tabs-bar">
        <div className="container admin-tabs-container">
          <button className={`admin-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
            📷 Hospital Gallery ({galleryItems.length})
          </button>
          <button className={`admin-tab-btn ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => setActiveTab('doctors')}>
            🩺 Specialists Directory ({doctorsList.length})
          </button>
          <button className={`admin-tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`} onClick={() => setActiveTab('testimonials')}>
            👶 Patient success Stories ({testimonialsList.length})
          </button>
          <button className={`admin-tab-btn ${activeTab === 'faqs' ? 'active' : ''}`} onClick={() => setActiveTab('faqs')}>
            ❓ FAQ Knowledge Base ({Array.isArray(faqCategories) ? faqCategories.length : 0})
          </button>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 36, paddingBottom: 80 }}>
        <AnimatePresence mode="wait">
          
          {/* ─── TAB 1: HOSPITAL GALLERY ─── */}
          {activeTab === 'gallery' && (
            <motion.div key="gallery-tab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="admin-grid">
              {/* Form */}
              <div className="admin-form-col">
                <div className="form-card card-base">
                  <h2>{galleryEditingId ? '✍️ Edit Gallery Photo' : '📷 Push New Gallery Photo'}</h2>
                  <p className="form-intro">Upload pictures from your clinic. They automatically reflect on the live home page tour.</p>
                  
                  <form onSubmit={handleGallerySubmit}>
                    <div className="admin-form-group">
                      <label htmlFor="gal-title">Photo Title</label>
                      <input id="gal-title" type="text" placeholder="e.g. Advanced cleanroom micromanipulator" value={galTitle} onChange={(e) => setGalTitle(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="gal-cat">Category</label>
                      <select id="gal-cat" value={galCategory} onChange={(e) => setGalCategory(e.target.value)}>
                        <option value="lab">Embryology Lab</option>
                        <option value="consulting">Consultation Suites</option>
                        <option value="lobby">Lobby & Patient Care</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="gal-desc">Description caption</label>
                      <textarea id="gal-desc" placeholder="Describe the technology or space..." value={galDesc} onChange={(e) => setGalDesc(e.target.value)} rows="3" required />
                    </div>
                    <div className="admin-form-group">
                      <label>Photo Upload</label>
                      <div className="upload-box">
                        <input type="file" accept="image/*" ref={galFileInputRef} onChange={handleGalleryUpload} style={{ display: 'none' }} />
                        <button type="button" className="upload-btn" onClick={() => galFileInputRef.current.click()}>📁 Browse Local Photos</button>
                        <span className="upload-specs">PNG, JPG, WEBP (Max 2MB)</span>
                      </div>
                      {galFileError && <p className="error-inline">{galFileError}</p>}
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="gal-url">Or Paste Image URL</label>
                      <input id="gal-url" type="url" placeholder="https://..." value={galImageUrl} onChange={(e) => setGalImageUrl(e.target.value)} />
                    </div>
                    {galImageUrl && (
                      <div className="live-preview-box">
                        <label>Thumbnail Preview</label>
                        <div className="preview-wrap">
                          <img src={galImageUrl} alt="preview" />
                          <button type="button" className="clear-img-btn" onClick={() => setGalImageUrl('')}>✕ Clear</button>
                        </div>
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                      <button type="submit" className="btn-primary-k" style={{ flex: 1, justifyContent: 'center' }}>
                        {galleryEditingId ? 'Save Changes' : 'Push Live'}
                      </button>
                      {galleryEditingId && (
                        <button type="button" className="cancel-btn" onClick={() => { setGalleryEditingId(null); setGalTitle(''); setGalDesc(''); setGalImageUrl('') }}>Cancel</button>
                      )}
                    </div>
                  </form>
                </div>
                <button onClick={async () => { try { await resetGallery(); await refreshAllData(); } catch(e) { alert(e.message) } }} className="reset-db-btn" style={{ marginTop: 20 }}>🔄 Restore Default Gallery</button>
              </div>
              
              {/* List */}
              <div className="admin-list-col">
                <div className="list-card card-base">
                  <h2>Hospital Gallery Photo Assets</h2>
                  <div className="assets-table-wrap">
                    <table className="assets-table">
                      <thead>
                        <tr>
                          <th>Thumbnail</th>
                          <th>Details</th>
                          <th>Category</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {galleryItems.map(img => (
                          <tr key={img.id}>
                            <td><div className="table-thumb"><img src={img.imageUrl} alt="" /></div></td>
                            <td>
                              <strong className="table-title">{img.title}</strong>
                              <p className="table-desc">{img.description}</p>
                            </td>
                            <td><span className="table-cat">{img.category === 'lab' ? '🔬 Lab' : img.category === 'consulting' ? '🩺 Consulting' : '🛋️ Lobby'}</span></td>
                            <td>
                              <div className="table-actions">
                                <button onClick={() => { setGalleryEditingId(img.id); setGalTitle(img.title); setGalCategory(img.category); setGalDesc(img.description); setGalImageUrl(img.imageUrl) }} className="edit-action">Edit</button>
                                <button onClick={async () => { try { await deleteGalleryImage(img.id); await refreshAllData(); } catch(e) { alert(e.message) } }} className="delete-action">Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* ─── TAB 2: SPECIALISTS DIRECTORY ─── */}
          {activeTab === 'doctors' && (
            <motion.div key="doctors-tab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="admin-grid">
              {/* Form */}
              <div className="admin-form-col">
                <div className="form-card card-base">
                  <h2>{docEditingId ? '✍️ Edit Specialist Profile' : '🩺 Add New Doctor / Specialist'}</h2>
                  <p className="form-intro">Publish a new specialist on the website with complete academic credentials and photographs.</p>
                  
                  <form onSubmit={handleDoctorSubmit}>
                    <div className="admin-form-group">
                      <label htmlFor="doc-name">Full Doctor Name</label>
                      <input id="doc-name" type="text" placeholder="Dr. Priyanka Singh" value={docName} onChange={(e) => setDocName(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="doc-title">Designation Title</label>
                      <input id="doc-title" type="text" placeholder="e.g. Senior Embryologist & ART Lab Chief" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="doc-qual">Medical Qualifications</label>
                      <input id="doc-qual" type="text" placeholder="MS (OBGYN), MD Pediatrics, PhD Embryology..." value={docQual} onChange={(e) => setDocQual(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="doc-desc">Bio Description / Quote</label>
                      <textarea id="doc-desc" placeholder="A brief description of their training, specialization, and quote..." value={docDesc} onChange={(e) => setDocDesc(e.target.value)} rows="3" required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="doc-exp">Years of Experience</label>
                      <input id="doc-exp" type="text" placeholder="e.g. 10+ yrs or 15+ yrs" value={docExp} onChange={(e) => setDocExp(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="doc-patients">Successful Cases/Cycles</label>
                      <input id="doc-patients" type="text" placeholder="e.g. 1,200+ cases or 800+ cycles" value={docPatients} onChange={(e) => setDocPatients(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label>Portrait Upload</label>
                      <div className="upload-box">
                        <input type="file" accept="image/*" ref={docFileInputRef} onChange={handleDoctorUpload} style={{ display: 'none' }} />
                        <button type="button" className="upload-btn" onClick={() => docFileInputRef.current.click()}>📁 Browse Staff Portraits</button>
                        <span className="upload-specs">PNG, JPG, WEBP (Max 2MB)</span>
                      </div>
                      {docFileError && <p className="error-inline">{docFileError}</p>}
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="doc-url">Or Paste Portrait Web URL</label>
                      <input id="doc-url" type="url" placeholder="https://..." value={docImageUrl} onChange={(e) => setDocImageUrl(e.target.value)} />
                    </div>
                    {docImageUrl && (
                      <div className="live-preview-box">
                        <label>Portrait Preview</label>
                        <div className="preview-wrap">
                          <img src={docImageUrl} alt="preview" style={{ objectFit: 'contain' }} />
                          <button type="button" className="clear-img-btn" onClick={() => setDocImageUrl('')}>✕ Clear</button>
                        </div>
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                      <button type="submit" className="btn-primary-k" style={{ flex: 1, justifyContent: 'center' }}>
                        {docEditingId ? 'Save Changes' : 'Add to Specialists'}
                      </button>
                      {docEditingId && (
                        <button type="button" className="cancel-btn" onClick={() => { setDocEditingId(null); setDocName(''); setDocTitle(''); setDocQual(''); setDocDesc(''); setDocExp(''); setDocPatients(''); setDocImageUrl('') }}>Cancel</button>
                      )}
                    </div>
                  </form>
                </div>
                <button onClick={async () => { try { await resetDoctors(); await refreshAllData(); } catch(e) { alert(e.message) } }} className="reset-db-btn" style={{ marginTop: 20 }}>🔄 Restore Default Specialists</button>
              </div>
              
              {/* List */}
              <div className="admin-list-col">
                <div className="list-card card-base">
                  <h2>Specialists Directory List</h2>
                  <div className="assets-table-wrap">
                    <table className="assets-table">
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>specialist</th>
                          <th>Qualifications</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctorsList.map(doc => (
                          <tr key={doc.id}>
                            <td>
                              <div className="table-thumb" style={{ borderRadius: '50%', width: '56px', height: '56px' }}>
                                <img src={doc.image} alt="" style={{ objectPosition: 'top center' }} />
                              </div>
                            </td>
                            <td>
                              <strong className="table-title">{doc.name}</strong>
                              <span className="table-cat" style={{ color: doc.color, borderColor: `${doc.color}30`, background: doc.bg }}>{doc.title}</span>
                              <p className="table-desc" style={{ marginTop: 4 }}>{doc.desc}</p>
                            </td>
                            <td><p style={{ fontSize: '0.74rem', fontStyle: 'italic', maxWidth: 180 }}>{doc.qual}</p></td>
                            <td>
                              <div className="table-actions">
                                <button onClick={() => { setDocEditingId(doc.id); setDocName(doc.name); setDocTitle(doc.title); setDocQual(doc.qual); setDocDesc(doc.desc); setDocExp(doc.exp); setDocPatients(doc.patients); setDocImageUrl(doc.image) }} className="edit-action">Edit</button>
                                <button onClick={async () => { try { await deleteDoctor(doc.id); await refreshAllData(); } catch(e) { alert(e.message) } }} className="delete-action">Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* ─── TAB 3: PATIENT STORIES ─── */}
          {activeTab === 'testimonials' && (
            <motion.div key="testimonials-tab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="admin-grid">
              {/* Form */}
              <div className="admin-form-col">
                <div className="form-card card-base">
                  <h2>{testEditingId ? '✍️ Edit Success Story' : '👶 Add Success Story'}</h2>
                  <p className="form-intro">Publish happy family testimonials and patient reviews dynamically on the website.</p>
                  
                  <form onSubmit={handleTestimonialSubmit}>
                    <div className="admin-form-group">
                      <label htmlFor="test-name">Couple / Patient Names</label>
                      <input id="test-name" type="text" placeholder="Anjali & Dev Prasad" value={testName} onChange={(e) => setTestName(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="test-loc">Location</label>
                      <input id="test-loc" type="text" placeholder="e.g. Noida or Delhi NCR" value={testLocation} onChange={(e) => setTestLocation(e.target.value)} required />
                      <input id="test-loc" type="text" placeholder="e.g. Noida or Ambala" value={testLocation} onChange={(e) => setTestLocation(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="test-avatar">Avatar Emoji</label>
                      <select id="test-avatar" value={testAvatar} onChange={(e) => setTestAvatar(e.target.value)}>
                        <option value="👩‍👩‍👦">👩‍👩‍👦 Mother, Father & Son</option>
                        <option value="👩‍👩‍">👩‍👩‍ Mother, Father & Daughter</option>
                        <option value="👩‍👦">👩‍👦 Single Mother & Son</option>
                        <option value="👶">👶 Single Baby</option>
                        <option value="👩‍👩‍👦‍👦">👩‍👩‍👦‍👦 Twins</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="test-treatment">Treatment Course</label>
                      <input id="test-treatment" type="text" placeholder="e.g. IVF with ICSI — 1st Attempt" value={testTreatment} onChange={(e) => setTestTreatment(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="test-outcome">Successful Outcome Milestone</label>
                      <input id="test-outcome" type="text" placeholder="e.g. Healthy baby girl born — Oct 2025" value={testOutcome} onChange={(e) => setTestOutcome(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="test-quote">Patient Quote Testimony</label>
                      <textarea id="test-quote" placeholder="Paste the glowing review written by the couple..." value={testQuote} onChange={(e) => setTestQuote(e.target.value)} rows="4" required />
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                      <button type="submit" className="btn-primary-k" style={{ flex: 1, justifyContent: 'center' }}>
                        {testEditingId ? 'Save Changes' : 'Publish Review'}
                      </button>
                      {testEditingId && (
                        <button type="button" className="cancel-btn" onClick={() => { setTestEditingId(null); setTestName(''); setTestLocation(''); setTestAvatar('👶'); setTestTreatment(''); setTestQuote(''); setTestOutcome('') }}>Cancel</button>
                      )}
                    </div>
                  </form>
                </div>
                <button onClick={async () => { try { await resetTestimonials(); await refreshAllData(); } catch(e) { alert(e.message) } }} className="reset-db-btn" style={{ marginTop: 20 }}>🔄 Restore Default Reviews</button>
              </div>
              
              {/* List */}
              <div className="admin-list-col">
                <div className="list-card card-base">
                  <h2>Patient Success Stories List</h2>
                  <div className="assets-table-wrap">
                    <table className="assets-table">
                      <thead>
                        <tr>
                          <th>Avatar</th>
                          <th>Couple</th>
                          <th>Treatment & Outcome</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testimonialsList.map(t => (
                          <tr key={t.id}>
                            <td>
                              <div style={{ fontSize: '2rem', background: 'var(--warm)', border: '1px solid var(--lgrey)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {t.avatar || '👶'}
                              </div>
                            </td>
                            <td>
                              <strong className="table-title">{t.name}</strong>
                              <span style={{ fontSize: '0.72rem', color: 'var(--mgrey)' }}>📍 {t.location}</span>
                              <p className="table-desc" style={{ marginTop: 4 }}>"{t.quote}"</p>
                            </td>
                            <td>
                              <span className="table-cat" style={{ display: 'block', marginBottom: 4, width: 'fit-content' }}>{t.treatment}</span>
                              <span style={{ fontSize: '0.74rem', color: 'var(--k700)', fontWeight: '600' }}>{t.outcome}</span>
                            </td>
                            <td>
                              <div className="table-actions">
                                <button onClick={() => { setTestEditingId(t.id); setTestName(t.name); setTestLocation(t.location); setTestAvatar(t.avatar); setTestTreatment(t.treatment); setTestQuote(t.quote); setTestOutcome(t.outcome) }} className="edit-action">Edit</button>
                                <button onClick={async () => { try { await deleteTestimonial(t.id); await refreshAllData(); } catch(e) { alert(e.message) } }} className="delete-action">Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* ─── TAB 4: FAQ KNOWLEDGE BASE ─── */}
          {activeTab === 'faqs' && (
            <motion.div key="faqs-tab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="admin-grid">
              {/* Form */}
              <div className="admin-form-col">
                <div className="form-card card-base">
                  <h2>{faqEditingIndex !== null ? '✍️ Edit FAQ Q&A' : '❓ Add FAQ Q&A'}</h2>
                  <p className="form-intro">Manage patient Q&As by matching them into relevant clinical treatment sections.</p>
                  
                  <form onSubmit={handleFaqSubmit}>
                    <div className="admin-form-group">
                      <label htmlFor="faq-cat">Category Section</label>
                      <select id="faq-cat" value={faqCatId} onChange={(e) => setFaqCatId(e.target.value)} disabled={faqEditingIndex !== null}>
                        <option value="ivf">In Vitro Fertilization (IVF)</option>
                        <option value="iui">Intrauterine Insemination (IUI)</option>
                        <option value="freeze">Fertility Preservation (Egg Freezing)</option>
                        <option value="pgt">Genetic Testing (PGT)</option>
                        <option value="donor">Donor Programs</option>
                        <option value="lap">Laparoscopy & Surgical Procedures</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="faq-q">Question Text</label>
                      <input id="faq-q" type="text" placeholder="e.g. When is laparoscopy recommended?" value={faqQuestion} onChange={(e) => setFaqQuestion(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                      <label htmlFor="faq-a">Answer Text</label>
                      <textarea id="faq-a" placeholder="Enter the detailed clinic answer..." value={faqAnswer} onChange={(e) => setFaqAnswer(e.target.value)} rows="5" required />
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                      <button type="submit" className="btn-primary-k" style={{ flex: 1, justifyContent: 'center' }}>
                        {faqEditingIndex !== null ? 'Save Changes' : 'Add FAQ'}
                      </button>
                      {faqEditingIndex !== null && (
                        <button type="button" className="cancel-btn" onClick={() => { setFaqEditingCatId(null); setFaqEditingIndex(null); setFaqQuestion(''); setFaqAnswer('') }}>Cancel</button>
                      )}
                    </div>
                  </form>
                </div>
                <button onClick={async () => { try { await resetFaqs(); await refreshAllData(); } catch(e) { alert(e.message) } }} className="reset-db-btn" style={{ marginTop: 20 }}>🔄 Restore Default FAQs</button>
              </div>
              
              {/* List */}
              <div className="admin-list-col">
                <div className="list-card card-base">
                  <h2>FAQ Knowledge Base Directory</h2>
                  {faqCategories.length === 0 ? (
                    <p style={{ fontSize: '0.78rem', color: 'var(--mgrey)', padding: '12px 0' }}>No FAQs added yet. Use the form to add your first FAQ.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                      {faqCategories.map((faq) => (
                        <div key={faq._id} style={{ padding: '10px 14px', border: '1px solid var(--lgrey)', borderRadius: '8px', background: 'var(--warm)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ maxWidth: '85%' }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: '700', color: 'var(--k700)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{faq.catId}</span>
                            <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--k900)', marginBottom: 4, marginTop: 4 }}>Q: {faq.q}</p>
                            <p style={{ fontSize: '0.76rem', color: 'var(--mgrey)', lineHeight: 1.45 }}>A: {faq.a}</p>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                            <button onClick={() => { setFaqEditingCatId(faq._id); setFaqEditingIndex(0); setFaqCatId(faq.catId); setFaqQuestion(faq.q); setFaqAnswer(faq.a) }} style={{ background: 'none', border: 'none', color: 'var(--s700)', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>Edit</button>
                            <button onClick={async () => { try { await deleteFaq(faq._id); await refreshAllData(); } catch(e) { alert(e.message) } }} style={{ background: 'none', border: 'none', color: 'var(--k700)', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
        .admin-page {
          background: var(--warm);
          min-height: 100vh;
        }
        .admin-header {
          background: var(--white);
          border-bottom: 1px solid var(--lgrey);
          padding: 20px 0;
        }
        .admin-container-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .admin-header h1 {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--k900);
          margin-bottom: 4px;
        }
        .admin-header p {
          font-size: 0.8rem;
          color: var(--mgrey);
        }
        .logout-btn {
          background: #ffe3e5;
          color: var(--k700);
          border: 1px solid rgba(139, 17, 27, 0.2);
          border-radius: 8px;
          padding: 9px 18px;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }
        .logout-btn:hover {
          background: var(--k700);
          color: var(--white);
          border-color: var(--k700);
        }
        /* Tabs Bar Styling */
        .admin-tabs-bar {
          background: var(--white);
          border-bottom: 1px solid var(--lgrey);
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        .admin-tabs-container {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
        }
        .admin-tabs-container::-webkit-scrollbar { display: none; } /* Chrome */
        .admin-tab-btn {
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--mgrey);
          padding: 16px 8px;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
        }
        .admin-tab-btn:hover {
          color: var(--k700);
        }
        .admin-tab-btn.active {
          color: var(--k700);
          border-bottom-color: var(--k700);
          font-weight: 700;
        }
        /* Layout Grid */
        .admin-grid {
          display: grid;
          grid-template-columns: 4fr 8fr;
          gap: 28px;
          align-items: start;
        }
        .form-card, .list-card {
          padding: 32px;
          background: var(--white);
        }
        .form-card h2, .list-card h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--k900);
          margin-bottom: 6px;
        }
        .form-intro {
          font-size: 0.8rem;
          color: var(--mgrey);
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .admin-form-group {
          margin-bottom: 16px;
          text-align: left;
        }
        .admin-form-group label {
          display: block;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--k900);
          margin-bottom: 6px;
        }
        .admin-form-group input[type="text"],
        .admin-form-group input[type="url"],
        .admin-form-group select,
        .admin-form-group textarea {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid var(--lgrey);
          font-family: var(--font-body);
          font-size: 0.88rem;
          outline: none;
          background: var(--white);
          transition: var(--transition);
        }
        .admin-form-group input:focus,
        .admin-form-group select:focus,
        .admin-form-group textarea:focus {
          border-color: var(--k700);
        }
        /* Upload box */
        .upload-box {
          border: 2px dashed var(--k300);
          background: var(--k50);
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .upload-btn {
          background: var(--white);
          border: 1px solid var(--k300);
          color: var(--k700);
          padding: 6px 14px;
          border-radius: 6px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
        }
        .upload-btn:hover { background: var(--k100); }
        .upload-specs { font-size: 0.65rem; color: var(--mgrey); }
        .error-inline { font-size: 0.72rem; color: var(--k700); font-weight: 600; margin-top: 6px; }
        /* Preview box */
        .live-preview-box {
          margin-top: 14px;
          border: 1px solid var(--lgrey);
          border-radius: 8px;
          padding: 12px;
          background: var(--warm);
        }
        .live-preview-box label {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--mgrey);
          margin-bottom: 6px;
        }
        .preview-wrap { position: relative; aspect-ratio: 16 / 10; border-radius: 6px; overflow: hidden; background: #333; }
        .preview-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .clear-img-btn {
          position: absolute;
          top: 8px; right: 8px;
          background: rgba(0,0,0,0.65);
          color: #fff;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.68rem;
          font-weight: 700;
          cursor: pointer;
        }
        .cancel-btn {
          background: var(--lgrey);
          border: none;
          color: var(--dgrey);
          padding: 12px 20px;
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }
        .cancel-btn:hover { background: #d0d0d0; }
        .reset-db-btn {
          width: 100%;
          background: none;
          border: 1px dashed var(--k300);
          color: var(--k700);
          padding: 10px;
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }
        .reset-db-btn:hover { background: #ffebeb; border-style: solid; }
        /* Assets Table */
        .assets-table-wrap {
          overflow-x: auto;
          margin-top: 14px;
        }
        .assets-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .assets-table th {
          padding: 12px 16px;
          border-bottom: 2px solid var(--lgrey);
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--k900);
        }
        .assets-table td {
          padding: 18px 16px;
          border-bottom: 1px solid var(--lgrey);
          vertical-align: middle;
        }
        .table-thumb {
          width: 70px;
          aspect-ratio: 4 / 3;
          border-radius: 6px;
          overflow: hidden;
          background: #eee;
        }
        .table-thumb img { width: 100%; height: 100%; object-fit: cover; }
        
        .table-title { font-size: 0.88rem; font-weight: 700; color: var(--k900); display: block; margin-bottom: 2px; }
        .table-desc {
          font-size: 0.73rem;
          color: var(--mgrey);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 4px;
        }
        
        .table-cat {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 20px;
          background: var(--s100);
          color: var(--s900);
          border: 1px solid rgba(213,143,75,0.2);
        }
        .table-actions {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .edit-action, .delete-action {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          text-align: left;
        }
        .edit-action { color: var(--s700); }
        .edit-action:hover { color: var(--s900); text-decoration: underline; }
        .delete-action { color: var(--k700); }
        .delete-action:hover { color: var(--k900); text-decoration: underline; }
        @media (max-width: 1024px) {
          .admin-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .admin-container-top { flex-direction: column; text-align: center; }
          .form-card, .list-card { padding: 20px; }
        }
      `}</style>
    </div>
  )
}
