import { useState } from 'react'

function App() {
  const [image, setImage] = useState(null)

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F8F6F2',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: '300',
        letterSpacing: '0.2em',
        color: '#111'
      }}>MAIR</h1>

      <p style={{
        fontSize: '14px',
        color: '#9A9590',
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}>Cabine d'essayage virtuelle</p>

      <div style={{
        border: '0.5px solid rgba(0,0,0,0.15)',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        background: 'white',
        width: '400px'
      }}>
        {image ? (
          <img src={image} alt="Ta photo" style={{
            width: '100%',
            borderRadius: '4px',
            objectFit: 'cover'
          }} />
        ) : (
          <div style={{
            width: '100%',
            height: '300px',
            background: '#F8F6F2',
            border: '0.5px dashed rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9A9590',
            fontSize: '13px',
            letterSpacing: '0.08em'
          }}>
            Ta photo apparaîtra ici
          </div>
        )}

        <label style={{
          background: '#111',
          color: 'white',
          padding: '0.85rem 2rem',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'center'
        }}>
          Uploader ma photo
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  )
}

export default App