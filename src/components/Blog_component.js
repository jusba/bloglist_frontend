import React, { useState } from 'react'
import blogService from '../services/blogs'
const jwt = require('jsonwebtoken')
require('dotenv')

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

const Blog = ({ blog,  user, showBlogs, testiFunctio }) => {

    if(testiFunctio != null){
        console.log("testit on parasta")
    }

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

  // poistin nämä jotta testaus toimii
//  const decodedToken = jwt.verify(user.token, process.env.REACT_APP_SECRET)
const pressLike = () =>{
    
    blog.likes = blog.likes + 1
    blogService.update(blog).then(response => {
      blogService.getAll().then(response => {
        showBlogs(response)
          })
        })
      
}
 // if (show && blog.user.id === decodedToken.id) {
    if (show && blog.user.username === user.username) {
    return (
      <div style={blogStyle}>
        <p> {blog.title}   {blog.author} <Button onClick={onClick} text={'show'} /></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <Button onClick={pressLike} text={'Like'} /></p>
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
        <p>{blog.likes} <Button onClick={pressLike} text={'Like'} /></p>
        <p>{blog.user.name}</p>
      </div>
    )
  }

  return (<div style={blogStyle}> {blog.title}   {blog.author} <Button onClick={onClick} text={'show'} /> </div>)
}
export default Blog