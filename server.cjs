const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001
const SCALES_FILE = path.join(__dirname, 'scales.json')

app.use(express.json())

// Serve the built frontend
app.use(express.static(path.join(__dirname, 'dist')))

// Load scales from file
function loadScales() {
  try {
    if (fs.existsSync(SCALES_FILE)) {
      return JSON.parse(fs.readFileSync(SCALES_FILE, 'utf8'))
    }
  } catch (e) {
    console.error('Error loading scales:', e)
  }
  return {}
}

// Save scales to file
function saveScales(scales) {
  try {
    fs.writeFileSync(SCALES_FILE, JSON.stringify(scales, null, 2))
  } catch (e) {
    console.error('Error saving scales:', e)
  }
}

// GET all scales
app.get('/api/scales', (req, res) => {
  res.json(loadScales())
})

// PUT a single scale
app.put('/api/scales/:key', (req, res) => {
  const { key } = req.params
  const { value } = req.body
  const scales = loadScales()
  scales[key] = value
  saveScales(scales)
  res.json({ ok: true, key, value })
})

// DELETE a single scale (reset)
app.delete('/api/scales/:key', (req, res) => {
  const { key } = req.params
  const scales = loadScales()
  delete scales[key]
  saveScales(scales)
  res.json({ ok: true, key })
})

// SPA fallback - serve index.html for all other routes (Express 5 syntax)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  } else {
    next()
  }
})

app.listen(PORT, () => {
  console.log(`Static Ad Maker server running on port ${PORT}`)
})
