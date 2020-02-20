import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import LoginForm from './components/Login'
import BlogForm from './components/Blog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newMessage, setMessage] = useState(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs),
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const handleMessage = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }



  const handleLogout = async (event) => {
    console.log("logout")
    event.preventDefault()
    try {
      setUser(null)
      window.localStorage.clear()
      blogService.setToken(null)
      console.log("logout successfull")
    } catch (exception) {
      console.log("logout failed")
    }
  }

  const handleLogin = async (event) => {

    event.preventDefault()
    try {
      console.log("try")
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      handleMessage('succesfully logged in')
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("catch")
      handleMessage('wrong credentials')
      setUsername('')
      setPassword('')

    }
  }
  const addBlog = (blogObject) => {

    blogService
      .create(blogObject)
      .then(blog => { setBlogs(blogs.concat(blog)) })


  }
  const showBlogs = (blogsList) => {
    setBlogs(blogsList)
  }

  

  
  return (
    <div>

      {user === null && <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} newMessage={newMessage} />}
      {user !== null && <BlogForm blogs={blogs} handleLogout={handleLogout} user={user} createBlog={addBlog} newMessage={newMessage} handleMessage={handleMessage} showBlogs = {showBlogs} />}



    </div>
  )
}


export default App