import React from 'react';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p >{props.name} {props.exercises}</p>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map((obj) => <Part key={obj.id} name={obj.name} exercises={obj.exercises} />)}
        </div>
    )
}

const Total = (props) => {
    return (
        <p>
            Yhteensä {props.parts.map((obj) => obj.exercises).reduce((a, b) => a+b, 0)} tehtävää
        </p>
    )
}

const Course = (props) => {
    const course = props.course;
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course;