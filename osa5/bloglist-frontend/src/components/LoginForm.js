import React from 'react'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
        <div>
          käyttäjätunnus
            <input
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          salasana
            <input
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
        </form>
    )
}

export default LoginForm