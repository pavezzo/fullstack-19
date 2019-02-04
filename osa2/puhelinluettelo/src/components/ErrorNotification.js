import React from 'react'

const ErrorNotification = (props) => {
    const style = {
        color: 'red',
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
        <div style={style}>{props.style}</div>
    )
}

export default ErrorNotification