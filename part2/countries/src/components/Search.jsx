import comServices from '../services/comunications'
// oceano@grmZrso api 309ccb59579548bfbc3205955251007


const CountryFlag = ({ countryFlagInfo })=> {
    const flagStyle = {
        border:'2px solid black'
    }
    return (
        <div>
            <img src={countryFlagInfo.png} alt={countryFlagInfo.alt} style={flagStyle}/>
        </div>
    )
}


const CountryInfo = ({ countryData, setWeatherData={setWeatherData}, weatherData={weatherData} }) =>{

    return(
        <>        
        <div>
            <h1>{countryData.name.common}</h1>
            <h2>{`Capital ${countryData.capital[0]}`}</h2>
            <h2>{`Area ${countryData.area}`}</h2>
        </div>
        <div>
            <h1>Languages</h1>
            <ul>
               {Object.values(countryData.languages).map( language => <li key={language}>{language}</li> )}
            </ul>
        </div>
        <div>
            <CountryFlag countryFlagInfo={countryData.flags} />
        </div>
        <div>
            <CountryWeather countryCapital={countryData.capital} setWeatherData={setWeatherData} weatherData={weatherData}/>
        </div>

        </>
        

    )
}

export const SearchBar = ( { handleChange } ) => {

    return (
        <div>             
            <form >
            find countries  <input onChange={handleChange} ></input>     
            </form>
        </div>
    )
}

const ShowButton = ({ handleClick, country }) =>{
   // console.log( country )
    return(
        <button onClick={handleClick} country={country.name.common}>Show</button>
    )
}

const CountryName = ({ country, handleClick })=>{
    //console.log( country )
    return(
        <><p> {country.name.common} < ShowButton handleClick={handleClick} country={country}/></p> </>
    )
} 
 
const CountryWeather = ({ countryCapital, setWeatherData, weatherData })=>{

    const urlapi = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${countryCapital}&aqi=no`
    comServices.getWeather(urlapi)
                .then( response => {
                   //console.log(response.current.condition.icon)
                   setWeatherData(response.current)
                } )
    if (weatherData.condition==null) {
        return(
        <>
        <h1>Weather in {countryCapital}</h1>
        <p>Temperature {weatherData.temp_c}</p>       
        <p>Wind {Math.round(weatherData.wind_kph*3.6)} m/s</p>
        </>
        )
    }else{
    return (
        <>
        <h1>Weather in {countryCapital}</h1>
        <p>Temperature {weatherData.temp_c} Celsius</p>
        <img src={weatherData.condition.icon} />
        <p>Wind {Math.round(weatherData.wind_kph*3.6)} m/s</p>
        </>
    )}
}
 
export const CountryList = ({ searchResults, handleClick, setWeatherData, weatherData }) => {
    if ( searchResults.length>1 && searchResults.length<=10   ){
        return(
        searchResults.map( country => <CountryName key={country.name.common} country={country} handleClick={handleClick}/> )    
    )
    }else if (searchResults.length>10) {
        return( 
            <p>Too many matches, specify another filter</p>
        )
    }else if (searchResults.length===1){     
        return( 
            searchResults.map( country => <CountryInfo key={country.name.common} countryData={country} setWeatherData={setWeatherData} weatherData={weatherData}/>)
        )
    }else{
        return(
            <></>
        )
    }    
}
