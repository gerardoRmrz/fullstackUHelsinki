const express = require('express')
const app = express()

app.use(express.json())

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
 

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})