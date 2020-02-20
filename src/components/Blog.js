import React, { useState } from 'react'
import Notification from '../components/ErrorMessage'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
const jwt = require('jsonwebtoken')
require('dotenv')



const Blog = ({ blog,  user, showBlogs }) => {



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [show, setShow] = useState(false)
  const onClick = (event) => {

    event.preventDefault()
    setShow(!show)
  }
  /*
blogService.update(blog).then(response =>{
            blogService.getAll().then(response =>{
              showBlogs(response)
            })
          })

  */

  const decodedToken = jwt.verify(user.token, process.env.REACT_APP_SECRET)

  if (show && blog.user.id === decodedToken.id) {
    return (
      <div style={blogStyle}>
        <p> {blog.title}   {blog.author} <Button onClick={onClick} text={'show'} /></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <Button onClick={() => {
          blog.likes = blog.likes + 1
          blogService.update(blog).then(response => {
            blogService.getAll().then(response => {
              showBlogs(response)
            })
          })
        }} text={'Like'} /></p>
        <p>{blog.user.name}</p>
        <Button onClick={() => {
          if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
            blogService.deleteBlog(blog.id).then(response => {
              blogService.getAll().then(response => {
                showBlogs(response)
              })
            })
          }
        }} text={'remove'} />
      </div>
    )
  }
  else if (show) {

    return (
      <div style={blogStyle}>
        <p> {blog.title}   {blog.author} <Button onClick={onClick} text={'show'} /></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <Button onClick={() => {
          blog.likes = blog.likes + 1
          blogService.update(blog).then(response => {
            blogService.getAll().then(response => {
              showBlogs(response)
            })
          })
        }} text={'Like'} /></p>
        <p>{blog.user.name}</p>
      </div>
    )
  }

  return (<div style={blogStyle}> {blog.title}   {blog.author} <Button onClick={onClick} text={'show'} /> </div>)
}
const BlogList = ({ blogs, user, showBlogs }) => {

  blogs.sort((a, b) => (a.likes - b.likes))
  blogs.reverse()
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} showBlogs = {showBlogs} />
      )}

    </div>
  )
}
const Button = ({ onClick, text }) => {
  const buttonStyle = {
    border: 'none',
    color: 'red'
  }
  if (text === 'remove') {
    return (
      <button style={buttonStyle} onClick={onClick} >
        {text}
      </button>
    )
  }
  return (
    <button onClick={onClick} >
      {text}
    </button>
  )
}
const CreateNew = ({ addBlog, newTitle, handleTitleAdd, newAuthor, handleAuthorAdd, newUrl, handleUrlAdd }) => {

  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input
          value={newTitle}
          onChange={handleTitleAdd}
        />
      </div>
      <div>
        author: <input
          value={newAuthor}
          onChange={handleAuthorAdd}
        />
      </div>
      <div>
        url: <input
          value={newUrl}
          onChange={handleUrlAdd}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  )
}

const BlogForm = ({ blogs, handleLogout, user, createBlog, newMessage, handleMessage, showBlogs }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  //jätin handlemessagen pois kun se on suurimman osan ajasta null, mutta välillä string joten sotkee asiat
  BlogForm.propTypes = {
    blogs: PropTypes.array.isRequired,
    handleLogout: PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    createBlog: PropTypes.func.isRequired,
    handleMessage: PropTypes.func.isRequired,
    showBlogs: PropTypes.func.isRequired
  }

  const addBlog = (event) => {
    event.preventDefault()
    try {
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      handleMessage(`a new blog ${newTitle} by ${newAuthor} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      handleMessage('failed to create message')
    }

  }

  const handleTitleAdd = (event) => {
    setTitle(event.target.value)

  }
  const handleAuthorAdd = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlAdd = (event) => {
    setUrl(event.target.value)
  }


  return (

    <div>
      <h2>blogs</h2>
      <Notification message={newMessage} />
      <h3>{user.name} logged in  <Button onClick={handleLogout} text={'logout'} /> </h3>
      <Togglable buttonLabel="new blog">
        <CreateNew addBlog={addBlog} newTitle={newTitle} handleTitleAdd={handleTitleAdd} newAuthor={newAuthor} handleAuthorAdd={handleAuthorAdd} newUrl={newUrl} handleUrlAdd={handleUrlAdd} />
      </Togglable>
      <BlogList blogs={blogs} user={user} showBlogs = {showBlogs}  />


    </div>
  )

}

export default BlogForm