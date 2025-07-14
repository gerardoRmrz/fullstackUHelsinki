let persons = [
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
   
//////////////////////////////////////////////////

const express = require('express')
const app = express()

app.use(express.json())

const morgan = require('morgan')


morgan.token('body', (req, res) => { 
    if (req.body){
        return `{ "name":"${req.body.name}","number":"${req.body.number}" }`     
    }else{
        return null
    }
}
)


middleware = morgan( (tokens, req, res)=>{
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),'-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
} )
  
app.use(middleware)


app.get('/api/persons', (request, response) => {
    response.json(persons)
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
    
    response.send(`<p>Phonebook has info for ${persons.length}  people</p>
        <p>${dateString} ${timeZoneName}</p>`)
})

/////////////////////////////////////////

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find( person => person.id=== id )
    if (person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter( person => person.id !== id )
    response.status(204).end()
})
 
const generateID = () => {
    const maxNumber = 100000
    const id = Math.round( 1 + maxNumber*Math.random())
    return id.toString()
}

app.post('/api/persons', (request, response) => {
    const body = request.body

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

    if ( persons.find( person => person.name===body.name ) ){      
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateID(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})