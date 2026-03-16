import { useState } from 'react'
import QRCode from 'react-qr-code'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import './App.css'

function App() {
  const { isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <Login />
  }
  const [form, setForm] = useState({
    name: '',
    cloth: '',
    mobile: '',
  })

  const [qrValue, setQrValue] = useState('')
  const [dateUsed, setDateUsed] = useState('')
  const [displayData, setDisplayData] = useState({ name: '', cloth: '', mobile: '' })

  const mobileInvalid = form.mobile.length > 0 && form.mobile.length !== 10

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10)
      setForm((prev) => ({ ...prev, [name]: digitsOnly }))
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerate = (e) => {
    e.preventDefault()

    const trimmed = {
      name: form.name.trim(),
      cloth: form.cloth.trim(),
      mobile: form.mobile.trim(),
    }

    if (!trimmed.name || !trimmed.cloth) {
      alert('Please fill Name and Cloth before generating QR code.')
      return
    }

    if (trimmed.mobile && !/^\d{10}$/.test(trimmed.mobile)) {
      alert('Mobile number: input exactly 10 digits. Only 0–9 allowed.')
      return
    }

    const currentDate = new Date().toISOString().slice(0, 10)
    setDateUsed(currentDate)

    const payload = {
      ...trimmed,
      date: currentDate,
      generatedAt: new Date().toISOString(),
    }

    setQrValue(JSON.stringify(payload))
    setDisplayData({ name: trimmed.name, cloth: trimmed.cloth, mobile: trimmed.mobile })
    setForm({ name: '', cloth: '', mobile: '' })
  }

  const handlePrint = () => {
    if (!qrValue) {
      alert('Generate a QR code before printing.')
      return
    }
    window.print()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="title">Wash-O-Dry QR Generator</h1>
        <button type="button" className="logout-button no-print" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="layout">
        <form className="qr-form" onSubmit={handleGenerate}>
          <h2>Customer & Order Details</h2>

          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Customer name"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="cloth">Cloth</label>
            <input
              id="cloth"
              name="cloth"
              type="text"
              value={form.cloth}
              onChange={handleChange}
              placeholder="e.g. 3 Shirts, 2 Pants"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={form.mobile}
              onChange={handleChange}
              placeholder="Optional, 10 digits (0–9 only)"
              className={mobileInvalid ? 'input-error' : ''}
            />
            {mobileInvalid && (
              <span className="field-error">Enter exactly 10 digits or leave empty. Only 0–9 allowed.</span>
            )}
          </div>

          <button type="submit" className="primary-button" disabled={mobileInvalid}>
            Generate QR Code
          </button>
        </form>

        <div className="qr-panel">
          <div className="print-card" id="print-area">
            <div className="print-header">
              <span className="brand">Wash-O-Dry</span>
            </div>

            {qrValue ? (
              <>
                <div className="qr-wrapper">
                  <QRCode value={qrValue} size={180} />
                </div>
                <div className="print-details">
                  <p className="print-row print-row--primary">
                    <span className="print-label">Name:</span> <span className="print-value">{displayData.name}</span>
                  </p>
                  <p className="print-row">
                    <span className="print-label">Cloth:</span> <span className="print-value">{displayData.cloth}</span>
                  </p>
                  <p className="print-row">
                    <span className="print-label">Date:</span> <span className="print-value">{dateUsed}</span>
                  </p>
                  <p className="print-row">
                    <span className="print-label">Mobile:</span>{' '}
                    <span className="print-value">{displayData.mobile || '-'}</span>
                  </p>
                </div>
              </>
            ) : (
              <p className="placeholder">Fill the form and generate to see QR.</p>
            )}
          </div>

          <button type="button" className="secondary-button no-print" onClick={handlePrint}>
            Print QR Code
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
