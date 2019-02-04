import React from 'react'

const Persons = (props) => {
    return props.persons.filter(e => 
        e.name.toLowerCase().includes(props.newCheck.toLowerCase())).map(e => 
            <p key={e.name}>{e.name} {e.number} <button id={e.id} onClick={props.handleDelete}>poista</button></p>)
}

export default Persons