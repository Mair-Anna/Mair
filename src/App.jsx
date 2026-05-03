import { useState } from 'react'

function App() {
  const [userImage, setUserImage] = useState(null)
  const [garmentImage, setGarmentImage] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUserImage = (e) => {
    const file = e.target.files[0]
    if (file) setUserImage(URL.createObjectURL(file))
  }

  const handleGarmentImage = (e) => {
    const file = e.target.files[0]
    if (file) setGarmentImage(URL.createObjectURL(file))
  }

  const handleTryOn = async () => {
    if (!userImage || !garmentImage) {
      alert('Uploade les deux photos !')
      return
    }
    setLoading(true)
    setResult(null)

    try {
      const userFile = document.querySelector('#userInput').files[0]
      const garmentFile = document.querySelector('#garmentInput').files[0]

      const userForm = new FormData()
      userForm.append('file', userFile)
      const userUpload = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        body: userForm
      })
      const userData = await userUpload.json()

      const garmentForm = new FormData()
      garmentForm.append('file', garmentFile)
      const garmentUpload = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        body: garmentForm
      })
      const garmentData = await garmentUpload.json()

      const response = await fetch('http://127.0.0.1:8000/api/tryon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userImage: userData.url,
          garmentImage: garmentData.url
        })
      })
      const data = await response.json()
      setResult(data.result_url)
    } catch (err) {
      alert('Erreur — réessaie !')
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F8F6F2',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '3rem 1rem',
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
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '800px'
      }}>
        <div style={{
          background: 'white',
          border: '0.5px solid rgba(0,0,0,0.15)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9590' }}>Ta photo</p>
          {userImage ? (
            <img src={userImage} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          ) : (
            <div style={{
              height: '300px', background: '#F8F6F2',
              border: '0.5px dashed rgba(0,0,0,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#9A9590', fontSize: '12px'
            }}>Ta photo ici</div>
          )}
          <label style={{
            background: '#111', color: 'white', padding: '0.75rem',
            fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: 'pointer', textAlign: 'center'
          }}>
            Uploader ma photo
            <input id="userInput" type="file" accept="image/*" onChange={handleUserImage} style={{ display: 'none' }} />
          </label>
        </div>

        <div style={{
          background: 'white',
          border: '0.5px solid rgba(0,0,0,0.15)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9590' }}>Le vêtement</p>
          {garmentImage ? (
            <img src={garmentImage} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          ) : (
            <div style={{
              height: '300px', background: '#F8F6F2',
              border: '0.5px dashed rgba(0,0,0,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#9A9590', fontSize: '12px'
            }}>Photo du vêtement ici</div>
          )}
          <label style={{
            background: '#111', color: 'white', padding: '0.75rem',
            fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: 'pointer', textAlign: 'center'
          }}>
            Uploader le vêtement
            <input id="garmentInput" type="file" accept="image/*" onChange={handleGarmentImage} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      <button
        onClick={handleTryOn}
        disabled={loading}
        style={{
          background: loading ? '#9A9590' : '#111',
          color: 'white', border: 'none',
          padding: '1rem 3rem',
          fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%', maxWidth: '800px'
        }}>
        {loading ? 'Essayage en cours...' : 'Essayer ce vêtement →'}
      </button>

      {result && (
        <div style={{
          background: 'white',
          border: '0.5px solid rgba(0,0,0,0.15)',
          padding: '1.5rem',
          width: '100%', maxWidth: '800px'
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9590', marginBottom: '1rem' }}>Résultat</p>
          <img src={result} style={{ width: '100%', borderRadius: '4px' }} />
        </div>
      )}
    </div>
  )
}

export default App