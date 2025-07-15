import { useState, useEffect } from 'react'
import axios from 'axios'
import {SearchBar, CountryList} from './components/Search'
import comServices from './services/comunications'

function App() {
  const [countryList, setCountryList] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [weatherData, setWeatherData] = useState({})
 
  useEffect( ()=>{ 
    comServices.getAll( ).then( response => {
            setCountryList(response)
            setSearchResults([])
            setWeatherData({})  
                     
          } )  
  },[])

  const searchCountry=(countryList, searchTerm)=>{
    const countryResults = countryList.filter( (country) => {
                              return country.name.common.toLowerCase().includes(searchTerm) 
                              } )
    return countryResults                          
  }

  const handleSearchChange = (event) => {    
    const searchTerm = event.target.value.toLowerCase()
    const countryResults = searchCountry(countryList, searchTerm)
    setSearchResults(countryResults)
  }

  const handleClick = (event)=>{
    const countryName = event.target.attributes.country.value.toLowerCase()
    const countryResults = searchCountry(countryList, countryName)                          
   setSearchResults(countryResults)
  }

 // console.log(import.meta.env.VITE_API_KEY)
  //console.log(weatherData.condition.icon)  
  return (
    <div>
      
      <SearchBar handleChange={handleSearchChange}/>
      <CountryList searchResults={searchResults} handleClick={handleClick} setWeatherData={setWeatherData} weatherData={weatherData}/>
    </div>
  )
}

export default App
