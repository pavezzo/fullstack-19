import React from 'react'

const Notification = (props) => {
    const style = {
        color: 'green',
        background: 'lightgrey',
        width: '100%',
        fontSize: 30,
        borderStyle: 'solid',
        padding: 20
    }

    if (props.message === null) {
        return null
    }

    return (
        <div style={style}>{props.message}</div>
    )
}

export default Notification