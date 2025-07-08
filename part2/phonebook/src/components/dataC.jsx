export function Filter( {handle} ) {
  return(
  <>
  filter shown with <input onChange={handle}/>
  </>)
}

export function PersonForm ( { addName, newName, handleNameChange, newNumber, handleNumberChange } ) {
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

export function Persons ( { persons, handleClick } ){
  return(
   persons.map( (person) =>( <p key={person.id}> {person.name}  {person.number} <></>  
    <button value={person.id} onClick={handleClick}>delete</button> </p>  ) ) 
)
}


