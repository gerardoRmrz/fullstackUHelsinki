require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/people')

const app = express()
 
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan( (tokens, request, response) => {
  let data = null
  if( tokens.method(request, response) === 'POST' ) {
    data = JSON.stringify(request.body)
  } 
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-', 
    tokens['response-time'](request, response), 'ms',
    data
  ].join(' ')
} ))

let people = [
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
  const nPeople = people.length
  const date = new Date()
  response.send(`<p>Pnonebook has info of ${nPeople} people</p> <p>${date.toString()}</p>`)
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then( people => {
    response.json(people)
  })
  
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
  
  if (!personExist) {
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

const unknownEndPoint = (request, response) => {
  response.status(404).send({ 
    error: 'unknown endpoint'
  })
}

app.use(unknownEndPoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})