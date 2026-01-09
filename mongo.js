require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

if (process.argv.length<=3) {

  Person.find({}).then( result => {
    console.log('phonebook:')
    result.forEach( person => {
      console.log(`${person.id} ${person.name} ${person.number}`)
    })
  mongoose.connection.close()  
  })

} else {

  person.save().then( result => {
  console.log(result)
  console.log('person saved!')
  mongoose.connection.close()

})
}




