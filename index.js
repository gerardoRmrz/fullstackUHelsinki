const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
  const nPeople = persons.length
  const date = new Date()
  response.send(`<p>Pnonebook has info of ${nPeople} people</p> <p>${date.toString()}</p>`)
})


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find( p => p.id === id )

  if (!person){
    return response.status(404).end()
  }else{
    return response.json(person)
  }
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number( request.params.id )
  persons = persons.filter( p => p.id!==id )
  
  response.status(204).end()
})

const getRandomID = () => {
  const n = 100000000
  return Math.floor( n*Math.random() ) +1  
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!( body.name && body.number )){
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const personExist = persons.filter( p=> p.name===body.name )
  
  if (personExist) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: getRandomID()
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)

})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})