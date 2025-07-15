import { useEffect, useState } from 'react'
import axios from 'axios'
import comService from './services/communication'
import { Filter, PersonForm, Persons } from './components/dataC.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  
  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({text:'', color:''})

  useEffect( ()=>{
    /* console.log('effect') */
    comService.getAll().then( data=> setPersons(data)  )
    
  },[])

  console.log('render', persons.length, 'notes')
/////////////////////////////////////////////////////////////////////////
  const addName = (event) => {
    event.preventDefault()
    
    const exist = persons.map( (person) => person.name===newName ? 1: 0 ).some( value=> value===1 ) 
    //---------------------------------------------------------------------------------------------
    if (exist) {
      const replaceNumber = confirm( `${newName} is already added to phonebook, replace the old number with a new one?`)
      //======================================
      if (replaceNumber){
        
        const personObj = persons.filter( person => person.name==newName )[0]
        
        personObj.number = newNumber
        
        setPersons( persons.map( person => person.name===newName ? personObj : person ) )               

        comService
          .update(personObj.id, personObj)
            .catch( error => {
                        setNotificationMessage({text: `${personObj.name} was already removed from server`, color:'red'})
                        setTimeout(() => {
                             setNotificationMessage({text:'', color:''})
                            }, 5000)
                        setPersons( persons.filter( person => person.id !== personObj.id ) )
                        } )

        setNewName('')
        setNewNumber('')
        setNotificationMessage({text: `Updated ${personObj.name} with number ${personObj.number}`, color: 'green'})
        setTimeout(() => {
              setNotificationMessage({text:'', color:''})
            }, 2000)
      }
      //======================================
    }else{
      const nameObject = {
      name: newName,
      number: newNumber
      }
      comService
        .create(nameObject)
          .then( data =>{
            setPersons( persons.concat( data ) )
            setNewName('')
            setNewNumber('')
            setNotificationMessage({text:`Added ${nameObject.name}`, color:'green'})
            setTimeout(() => {
              setNotificationMessage({text:'', color:''})
            }, 2000)
      })
    }
    //--------------------------------------------------------------------------------------------------------
  }
  ///////////////////////////////////////////////////////////////////////////////////////////
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  const handleSearchChange = (event) =>{
    const searchTerm = event.target.value.toLowerCase()
    const personsList = document.querySelectorAll("p")

    personsList.forEach( (person)=> {
      person.style.display = 'revert'
      if (!person.innerText.toLowerCase().includes(searchTerm) ){
        person.style.display = 'none'
      }
    } )
  }
///////////////////////////////////////////////////////////////////////////
  const handleClickDelete = (event) => {
    const idToDelete = event.target.value
    
    const personToDelete = persons.filter( person => person.id===idToDelete )  

    const wantToDelete = confirm(`Delete to ${personToDelete[0].name}?`) 
    //--------------------------------------------------------------------
    if (wantToDelete){
      comService.deletePersonFromDb(idToDelete)
      setPersons( persons.filter( person => person.id !== idToDelete ) )
    }else{
        console.log('Nothing to update in persons list')
    }
    //---------------------------------------------------------------------
    } 
//////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMessage}/>
        < Filter handle={handleSearchChange}/>
      <h2>add a new</h2>
        <PersonForm 
          addName={addName}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons persons={persons} handleClick={handleClickDelete} />
    </div>
  )
  

}

export default App
