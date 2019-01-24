import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const {good, neutral, bad} = props;
    const yhteensa = good + neutral + bad;
    const keskiarvo = (good - bad) / yhteensa || 0;
    const positiivisia = (good / yhteensa) * 100 || 0;

    if (yhteensa > 0) {
        return (
            <div>
                <h1>statistiikka</h1>
                <table>
                    <tbody>
                        <Statistic title={"hyvä"} value={good} />
                        <Statistic title={"neutraali"} value={neutral} />                
                        <Statistic title={"huono"} value={bad} />                
                        <Statistic title={"yhteensä"} value={yhteensa} />                
                        <Statistic title={"keskiarvo"} value={keskiarvo} />                
                        <Statistic title={"positiivisia"} value={positiivisia + "%"} />    
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <p>Ei yhtään palautetta annettu</p>
        </div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
} 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>anna palautetta</h1>
        <Button handleClick={() => setGood(good+1)} text="hyvä"/>
        <Button handleClick={() => setNeutral(neutral+1)} text="neutraali"/>
        <Button handleClick={() => setBad(bad+1)} text="huono"/>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)