const express = require('express')
const knex = require('knex')
const knexConfig = require('./knexfile').development
const main = require('./app')
// import second from './knexfile'

const mainRoute = require('./routes/appRoute')

const db = knex(knexConfig)
const app = express()

app.use(express.json())
app.use('/api/', mainRoute(db))
// app.use((req, res, next) => {
//     console.log('Middleware untuk posts');
//     next();
// });

// const generateId = () => {
//     const maxId = notes.length > 0
//       ? Math.max(...notes.map(n => Number(n.id)))
//       : 0
//     return String(maxId + 1)
//   }

// app.post('/api/notes', (request, response) => {
//     const body = request.body

//     if (!body.content) {
//       return response.status(400).json({ 
//         error: 'content missing' 
//       })
//     }
  
//     const note = {
//       content: body.content,
//       important: Boolean(body.important) || false,
//       id: generateId(),
//     }
  
//     notes = notes.concat(note)
  
//     response.json(note)
// })

const PORT = 3001
app.listen(PORT, ()=>{
    console.log('server kalan');
})