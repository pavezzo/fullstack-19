import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  })

  const handleLogin = async(event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception.message)
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  const handleNewBlog = async(event) => {
    event.preventDefault()

    const newBlog = {
      token: user.token,
      author: author,
      title: title,
      url: url
    }

    const request = blogService.postNewBlog(newBlog)
    setBlogs(blogs.concat(request))
  }

  return (
    <div>
      
      {user === null && <LoginForm onSubmit={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>}
      {user !== null && 
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Log out</button>
        <NewBlog handleNewBlog={handleNewBlog} title={title} author={author} url={url}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>}
      
    </div>
  )
}

export default App