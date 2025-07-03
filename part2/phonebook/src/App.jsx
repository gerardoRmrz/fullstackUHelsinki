import { useState } from 'react'

const Filter = ( {handle} ) => {
  return(
  <>
  filter shown with <input onChange={handle}/>
  </>)
}

const PersonForm = ( { addName, newName, handleNameChange, newNumber, handleNumberChange } ) =>{
  return(
  <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}

const Persons = ( { persons } ) =>{
  return(
   persons.map( (person) =>( <p key={person.id}>{person.name}  {person.number}</p> ) ) 
)
}  

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    const exist = persons.map( (person) => person.name===newName ? 1: 0 ).some( value=> value===1 ) 

    if (exist) {
      alert( `${newName} is already added to phonebook`  )
    }else{
      const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }

    setPersons( persons.concat(nameObject) )
    setNewName('')
    setNewNumber('')
    }
    
  }
  
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) =>{
    const searchTerm = event.target.value.toLowerCase()
    const personsList = document.querySelectorAll("p")

    personsList.forEach( (person)=> {
      //console.log(person.innerText.toLowerCase().includes(searchTerm))
      person.style.display = 'revert'
      if (!person.innerText.toLowerCase().includes(searchTerm) ){
        person.style.display = 'none'
      }
    } )
  }

  return (
    <div>
      <h2>Phonebook</h2>
        < Filter handle={handleSearchChange}/>
      <h2>add a new</h2>
        <PersonForm 
          addName={addName}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons persons={persons}/>
    </div>
  )
  

}

export default App
