import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = ( ) =>{
    const request = axios.get(baseURL)
return request.then( response => response.data )
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
return request.then( response =>  response.data )
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
                    
}

const deletePersonFromDb = (id) => {
    const promise = axios.get( `${baseURL}/${id}` ).then( (response) => response.data )
     promise.then( response => {
            axios.delete(`${baseURL}/${id}`)            
            console.log( `${response.name} was deleted!!!` )    
    } ) 
}

export default { getAll, create, update, deletePersonFromDb }

