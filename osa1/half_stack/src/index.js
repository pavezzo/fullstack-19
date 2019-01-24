import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.excercises}</p>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map((obj) => <Part name={obj.name} excercises={obj.excercises} />)}
        </div>
    )
}

const Total = (props) => {
    return (
        <p>
            Yhteensä {props.parts.map((obj) => obj.excercises).reduce((a, b) => a+b, 0)}
        </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                excercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                excercises: 7
            }, 
            {
                name: 'Komponenttien tila',
                excercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));