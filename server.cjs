const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001
const SCALES_FILE = path.join(__dirname, 'scales.json')

app.use(express.json())

// Serve the built frontend
app.use(express.static(path.join(__dirname, 'dist')))

// --- Scales API (QC persistence) ---

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

function saveScales(scales) {
  try {
    fs.writeFileSync(SCALES_FILE, JSON.stringify(scales, null, 2))
  } catch (e) {
    console.error('Error saving scales:', e)
  }
}

app.get('/api/scales', (req, res) => {
  res.json(loadScales())
})

app.put('/api/scales/:key', (req, res) => {
  const { key } = req.params
  const { value } = req.body
  const scales = loadScales()
  scales[key] = value
  saveScales(scales)
  res.json({ ok: true, key, value })
})

app.delete('/api/scales/:key', (req, res) => {
  const { key } = req.params
  const scales = loadScales()
  delete scales[key]
  saveScales(scales)
  res.json({ ok: true, key })
})

// --- AI Headline Generation API ---

const HOOK_CATEGORIES = {
  curiosity: {
    name: 'Curiosity',
    templates: [
      'I just found out about [thing] and I\'m [emotion]',
      'Nobody\'s talking about [this thing] and it\'s [claim]',
      'Wait - is [thing] actually [claim]?',
    ],
  },
  social_proof: {
    name: 'Social Proof',
    templates: [
      'There\'s a reason [number] people [action]',
      'My [friend/partner] put me onto [thing] and...',
      'Everyone keeps asking me about [thing]',
    ],
  },
  pain: {
    name: 'Pain / Frustration',
    templates: [
      'I\'m so tired of [pain point]',
      'If you\'re still [bad behaviour], you need to hear this',
      'Stop [common mistake] - do this instead',
    ],
  },
  pattern_interrupt: {
    name: 'Pattern Interrupt',
    templates: [
      'POV: you [relatable scenario]',
      'This is your sign to [action]',
      'Hear me out - [unexpected take]',
    ],
  },
  controversy: {
    name: 'Controversy / Hot Take',
    templates: [
      'Unpopular opinion: [take]',
      'I don\'t care what anyone says - [bold statement]',
      '[Thing] is a scam. Except [this one]',
    ],
  },
  direct: {
    name: 'Direct / No-Nonsense',
    templates: [
      'Okay here\'s the deal with [product]',
      'Let me save you [time/money]',
      'You need [product] and here\'s why',
    ],
  },
  reveal: {
    name: 'Reveal / Result',
    templates: [
      'This [thing] changed my [routine]',
      '[Result] in just [timeframe]',
      'I never thought I\'d say this but [outcome]',
    ],
  },
  authority: {
    name: 'Authority / Expert',
    templates: [
      'As a [credential], I never thought I\'d recommend [thing]',
      'I\'ve [experience] and this is the only [thing] I recommend',
      'After [researching] [number], here\'s the truth',
    ],
  },
  relatability: {
    name: 'Relatability',
    templates: [
      'POV: you [relatable daily moment]',
      'Tell me you\'re a [type] without telling me',
      'If you [relatable habit], you need to see this',
    ],
  },
  urgency: {
    name: 'Urgency / Scarcity',
    templates: [
      'This [offer] won\'t be here long',
      'I almost missed out on [thing]',
      'Last chance to [action]',
    ],
  },
  education: {
    name: 'Education / Value-First',
    templates: [
      '3 things you didn\'t know about [topic]',
      'The [thing] most people get wrong about [topic]',
      'Here\'s why [common belief] is actually wrong',
    ],
  },
  subscription: {
    name: 'Subscription-Specific',
    templates: [
      'I was sceptical about another subscription but [result]',
      '[Timeframe] with [product] - was it worth keeping?',
      'For less than [price anchor], you get [value]',
    ],
  },
}

const PERSONAS = {
  young_professional: {
    name: 'Young Professional (24-30)',
    context: 'City-dwelling, single or couple, no kids. Snacks at desk (3pm slump) and on sofa (Netflix evening). Motivated by novelty, discovery, "little treat culture", social currency. Frustrated by boring supermarket snack aisle.',
  },
  parent: {
    name: 'Parent (30-42)',
    context: 'Has kids. Two angles: self-treater (opens box after kids in bed, "I earned this") or family activity (opens with kids, educational). Motivated by self-care, guilt relief, family bonding. The leaflet is a big selling point for educational parents.',
  },
  gifter: {
    name: 'Gifter (any age)',
    context: 'Buying for someone else: partner, adult child, friend, grandchild. Triggered by birthdays, Christmas, "impossible to buy for". Motivated by thoughtfulness, the recipient\'s reaction.',
  },
  foodie: {
    name: 'Foodie / Adventurer (25-35)',
    context: 'Food is identity. Follows food accounts. Actively shares what they eat on social. Motivated by novelty, social currency, discovery, the story behind the snack.',
  },
  nostalgic: {
    name: 'Nostalgic / Comfort Seeker',
    context: 'Buying because it reminds them of travel or triggers cultural connection. Includes returned expats. Motivated by travel nostalgia, cultural identity, comfort.',
  },
  any: {
    name: 'Any / Broad',
    context: 'General audience, no specific persona targeting.',
  },
}

app.post('/api/generate-headlines', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(400).json({ error: 'ANTHROPIC_API_KEY not configured' })
  }

  const { hookCategory = 'curiosity', persona = 'any', count = 10 } = req.body
  const hook = HOOK_CATEGORIES[hookCategory] || HOOK_CATEGORIES.curiosity
  const pers = PERSONAS[persona] || PERSONAS.any

  const prompt = `You are a performance media buyer writing static ad headlines for SnackVerse, a UK-based international snack subscription box.

PRODUCT: SnackVerse delivers snacks from a different country every month. Three tiers: Mini Box (£7.99, 5+ snacks), Original Box (£13.99, 10+ snacks), Premium Box (£23.99, 20+ snacks). Free UK shipping. Cancel anytime. Countries include Japan, South Korea, Canada, Italy, USA, France, Germany, and more.

HEADLINE RULES:
- 2-6 words MAXIMUM. Short punchy phrases, not sentences.
- End with a period if it's a statement. No exclamation marks.
- No emojis, no hashtags
- Prices in GBP (£)
- Country names capitalised
- Can reference specific countries, prices, snack counts, or emotions
- Style reference: "Worldwide snacks.", "Did nothing, snacks arrived.", "From £7.99", "Japan Snack Box", "You'll eat these.", "New snacks. Monthly."

HOOK CATEGORY: ${hook.name}
Hook templates for reference: ${hook.templates.join(' | ')}

TARGET PERSONA: ${pers.name}
${pers.context}

Generate exactly ${count} unique static ad headlines for SnackVerse. Each should be a different angle within the ${hook.name} category. Output ONLY the headlines, one per line, nothing else.`

  try {
    const Anthropic = require('@anthropic-ai/sdk')
    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text
    const headlines = text.split('\n').map(h => h.trim()).filter(h => h && !h.startsWith('-') && !h.startsWith('*'))

    res.json({ headlines })
  } catch (err) {
    console.error('Claude API error:', err.message)
    res.status(500).json({ error: 'Failed to generate headlines: ' + err.message })
  }
})

// SPA fallback
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
