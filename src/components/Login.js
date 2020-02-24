import React from 'react'
import Notification from '../components/ErrorMessage'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin,setUsername,setPassword, username,password, newMessage }) => {
  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword:PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }
  return(
    <div>
      <h1>log in to application</h1>
      <Notification message= {newMessage}/>
      <form onSubmit ={handleLogin}>
        <div>
            username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm