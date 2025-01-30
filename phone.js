var morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())


let phoneBook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('host', function(request, response) {
    return request.hostname;
});

app.use(cors())
app.use(morgan('tiny'))

app.get('/api/persons', (request,response) => {
    response.json(phoneBook)
})

app.get('/api/info', (request, response) => {
    const totalReq = phoneBook.length;
    response.send(`
        <p>Phonebook has info for ${totalReq} people</p>
        ${new Date()}
    `);
})

app.get('/api/persons/:id', (requset, response) =>{
    const id = requset.params.id
    const person = phoneBook.find(person => person.id == id)
    if(person){
        response.json(person)
    }else{
        response.status(403).end()
    }
})


app.delete('/api/persons/:id', (request,response) =>{
    const id = request.params.id
    const cek = phoneBook.find(person => person.id == id)
    if (cek) {
        phoneBook = phoneBook.filter(person => person.id !== id)
        response.status(204).end()
    } else {
        response.status(403).end()
    }
})

const maxId = () =>{
    const maxID = phoneBook.length > 0 ? Math.max(...phoneBook.map(p => p.id)) : 0

    return maxID + 1
}

app.post('/api/persons', (request, response) =>{
    const body = request.body
    const cekNama = phoneBook.find(person => person.name == body.name)

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'content missing' })
    }

    cekNama && response.status(400).json({ error: 'Nama sama' })

    const phone = {
        id: maxId(),
        name: body.name,
        number: body.number
    }

    phoneBook = phoneBook.concat(phone)

    response.json(phone)

})



const unknownEndPoint = (request, response) => {
    response.status(404).send({error: "404 ges"})
}


app.use(unknownEndPoint)

const PORT = 3001
app.listen(PORT, () =>{
    console.log('jalan di '+ PORT);
})