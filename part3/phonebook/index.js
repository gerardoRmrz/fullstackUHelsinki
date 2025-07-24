require('dotenv').config()

const express = require('express')
const app = express()

const morgan = require('morgan')

const Person = require('./models/person')


morgan.token('body', (req, res) => { 
    if (req.body){
        return `{ "name":"${req.body.name}","number":"${req.body.number}" }`     
    }else{
        return null
    }
}
)

const middleware = morgan( (tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),'-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
} )

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformated id'})
    }

    next(error)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware)

app.get('/api/persons', (request, response) => {
    Person.find({}).then( people => {
        response.json( people )
    } )   
})

app.get('/api/info', (request, response) => {
    const currentTime = new Date()
    const daysOfWeek = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dayName = daysOfWeek[currentTime.getDay()]
    const monthName = months[ currentTime.getMonth() ]
    const dayOfMonth = currentTime.getDate()
    const fullYear = currentTime.getFullYear()
    const hour = currentTime.getHours()
    const minutes = currentTime.getMinutes()
    const seconds = currentTime.getSeconds()
    const timeZone = 100*currentTime.getTimezoneOffset()/60 
    const timeZoneString = timeZone < 0 ? '+'+`${timeZone}`.padStart(4,'0') : '-'+ `${timeZone}`.padStart(4,'0')

    const dateString = `${dayName} ${monthName} ${dayOfMonth} ${fullYear} ${hour}:${minutes}:${seconds} GMT${timeZoneString}`
    const timeZoneName = '(Peruvian Standard Time)'
    
    Person.find({}).then( people => {
         response.send(`<p>Phonebook has info for ${people.length}  people</p>
        <p>${dateString} ${timeZoneName}</p>`)
    } )
    
})

/////////////////////////////////////////

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById( request.params.id )
        .then( person => {
            if (person){
                response.json(person)
            }else{
                response.status(404).end()
            }            
    })
    .catch( error => next(error))    
})


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete( request.params.id )
        .then( result => {
            response.status(204).end()
        })
        .catch( error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = request.body.name
            person.number = request.body.number

            return person.save().then( updatedPerson => {
                response.json(updatedPerson)
            } )
        })
        .catch( error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if (!body.name){
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person( {
        name: body.name,
        number: body.number
    })

    person.save().then( savePerson => {
        response.json( savePerson )
    })
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})