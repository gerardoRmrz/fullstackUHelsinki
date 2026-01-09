require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/people')

const app = express()
 
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

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

/* let people = [
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
] */


app.get('/info', (request, response) => {
  const nPeople = Person.find({}).then( people => {
    const nPeople = people.length
    const date = new Date()
    response.send(`<p>Phonebook has info of ${ nPeople } people</p> <p>${date.toString()}</p>`)
  } )
  
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then( people => {
    response.json(people)
  })
  
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then( person => {
      if (!person){
        return response.status(404).end()
      }else{
        return response.json(person)
      }
    })
    .catch( error => next(error))  
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then( result => {
    response.status(204).end()
  } )
  .catch( error => {
    next(error)    
  } )
})

/* const getRandomID = () => {
  const n = 100000000
  return Math.floor( n*Math.random() ) +1  
}
 */
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const newPerson = new Person(
    {
    name: body.name,
    number: body.number,
  }
  ) 
  
  newPerson.save()
    .then( savedPerson => {
      response.json(savedPerson)
    })
    .catch( error => next(error) )

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate( 
    request.params.id,
    person,
    {new: true, runValidators:true, context:'query'})
    .then( updatedPerson => {
      response.json(updatedPerson)
    } )
    .catch( error => next(error))
})


const unknownEndPoint = (request, response) => {
  response.status(404).send({ 
    error: 'unknown endpoint'
  })
}

app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if(error.name=== 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})