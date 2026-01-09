import { useState } from 'react'

const Title = () =>{
  return (
    <h1>Give Feedback</h1>
  )
}

const StatisticsTitle = () => {
  return(
      <h2>Statistics</h2>
  )
}

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>{props.text}</button>)
}

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) =>{
  let total = props.good + props.neutral + props.bad
  let average = Math.round(100*(props.good - props.bad)/total)/100
  let positive = Math.round(1000*props.good/total)/10
  
  if (total == 0){
    return(
    <p>No feddback given</p>
  )  
  }
  return(
  <>
  <table>
    <tbody>
    <StatisticsLine text="good" value={props.good}/>
    <StatisticsLine text="neutral" value={props.neutral}/>
    <StatisticsLine text="bad" value={props.bad}/>
    <StatisticsLine text="total" value={total}/>
    <StatisticsLine text="average" value={average}/>
    <StatisticsLine text="positive" value={positive.toString()+" %"}/>
    </tbody>
  </table>
  </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title /> 
      <Button handleClick={()=> setGood(good+1)} text="Good" />
      <Button handleClick={()=> setNeutral(neutral+1)} text="Neutral" />
      <Button handleClick={()=> setBad(bad+1)} text="Bad" />       
      <StatisticsTitle />  
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
