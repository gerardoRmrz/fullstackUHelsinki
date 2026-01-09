import { useState } from 'react'


const Titles = (props) =>{
  return(
  <h1>{props.text}</h1>
)
}

const Nextanecdote = (props) =>{
  return(
    <button onClick={props.handleClick} >next anecdote</button>
  )
}

const AnecdoteStr = (props) =>{
  return(
    <p>{props.text}</p>
  )
} 

const Vote = (props) =>{
  return(
    <button onClick={props.handleClick}>vote</button>
  )
}

const ShowVotes = (props) =>{
  return(
    <p>has {props.text} votes</p>
  )
}

const MostVoted = ( props ) =>{ 
   
  if (props.votes.every( v => v===0 ) ){
    return( <p> No votes yet </p> )
  }

  const maxVal = Math.max( ...props.votes )

  const indexMax = props.votes.map((val, i) => val===maxVal ? i : null ).filter( element => element !== null )[0]
  
  return(
    <p>{props.anecdotes[indexMax]}</p>
  )
}

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const randomf = ()=>{
    let min = 0
    let max = anecdotes.length
    return(
      Math.floor(min + (max-min)* Math.random())
    )
  } 
  
  let zeroArr = Array(anecdotes.length).fill(0)

  const [index, setCount] = useState(0)
  const [votes, setVotes] = useState( zeroArr )
  
  const updateVotes = (index) => {
    const copy = [ ...votes ]
     copy[index] += 1 
    setVotes( copy )
    return( votes )
  }
  
  return (
    <div>
      <Titles text="Anecdote of the day"/>
      <AnecdoteStr text={anecdotes[index]}/>
      <ShowVotes text={votes[index]}/>
      <Vote handleClick={()=>updateVotes(index)}/>
      <Nextanecdote handleClick={()=> setCount(randomf()) }/> 
      <Titles text="Anecdote with most votes"/> 
      <MostVoted votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
