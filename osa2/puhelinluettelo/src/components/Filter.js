import React from 'react'

const Filter = (props) => {
    return (
        <div>rajaa näytettäviä <input value={props.newCheck} onChange={props.handleNewCheck}/></div>
    )
}

export default Filter;