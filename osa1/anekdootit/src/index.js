import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

const MostVoted = (props) => {

    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[props.votes.indexOf(Math.max(...props.votes))]}</p>
            <p>has {props.votes[props.votes.indexOf(Math.max(...props.votes))]} votes</p>
        </div>
    )
}

const MainAnecdote = (props) => {
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdote}</p>
            <p>has {props.voted} votes</p>
        </div>

    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0));
    
    return (
        <div>
            <MainAnecdote anecdote={props.anecdotes[selected]} voted={votes[selected]}/>
            <Button handleClick={() => {
                const copy = [...votes];
                copy[selected] += 1;
                setVotes(copy);
            }} text={"vote"} />
            <Button handleClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))} text={"next anecdote"}/>
            <MostVoted votes={votes} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]  

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));

