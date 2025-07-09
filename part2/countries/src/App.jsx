import { useState, useEffect } from 'react'
import axios from 'axios'
import {SearchBar, CountryList} from './components/Search'
import comServices from './services/comunications'

function App() {
  const [countryList, setCountryList] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect( ()=>{ 
    comServices.getAll( ).then( response => {
            //response.slice(0,1).map( country=> console.log( country ) )
            setCountryList(response)             
          } )  
  },[])

  const handleSearchChange = (event) => {    
    const searchTerm = event.target.value.toLowerCase()
    const countryResults = countryList.filter( (country) => {
                              return country.name.common.toLowerCase().includes(searchTerm) 
                              } )
    setSearchResults(countryResults)
  }


  return (
    <div>
      <SearchBar handleChange={handleSearchChange}/>
      <CountryList searchResults={searchResults}/>
    </div>
  )
}

export default App
