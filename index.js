const express = require('express')
const knex = require('knex')
const knexConfig = require('./db/knexfile')

const mainRoute = require('./routes/appRoute')

const app = express()
const db = knex(knexConfig)

app.use(express.json())
app.use('/api/users', mainRoute(db))

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log('server kalan');
})