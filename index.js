const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
       "id": 1,
       "content": "HTML is very easy",
       "important": true 
    },
{
   "id": 2,
   "content": "JavaScript is versatile",
   "important": false 
},
{
   "id": 3,
   "content": "Node.js is powerful",
   "important": true 
},
{
   "id": 4,
   "content": "Express makes server-side development easy",
   "important": false 
},
{
   "id": 5,
   "content": "APIs are essential for modern web apps",
   "important": true 
},
{
   "id": 6,
   "content": "JSON is a lightweight data format",
   "important": false 
}
]

app.get('/', (request, response) => {
    response.send(
        '<h1>Hello World</h1>'
    )
})

app.get('/api/notes', (request, response) =>{
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) =>{
    const id = request.params.id
    const note = notes.find(note => note.id == id)

    note ? response.json(note) : response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

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