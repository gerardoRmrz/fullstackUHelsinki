
const CountryFlag = ({ countryFlagInfo })=> {
    return (
        <div>
            <img src={countryFlagInfo.png} alt={countryFlagInfo.alt}/>
        </div>
    )
}


const CountryInfo = ({ countryData }) =>{
    console.log(countryData.flags)
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
            <CountryFlag countryFlagInfo={countryData.flags}/>
        </div>
        </>
        

    )
}


export const SearchBar = ( { handleChange } ) => {

    return (
        <div>             
            <form >
            find countries  <input onChange={handleChange}></input>     
            </form>
        </div>
    )
}

export const CountryList = ({ searchResults }) => {
    if ( searchResults.length>1 && searchResults.length<=10   ){
        return(
        searchResults.map( country => <p key={country.name.common}>{country.name.common}</p> )    
    )
    }else if (searchResults.length>10) {
        return( 
            <p>Too many matches, specify another filter</p>
        )
    }else if (searchResults.length===1){        
        return( 
            searchResults.map( country => <CountryInfo key={country.name.common} countryData={country}/>)

        )
    }else{
        return(
            <></>
        )
    }
    
}

