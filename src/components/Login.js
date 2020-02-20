import React from 'react'
import Notification from '../components/ErrorMessage'

const LoginForm = ({handleLogin,setUsername,setPassword, username,password, newMessage}) => {
    
    return(
    <div>
    <h1>log in to application</h1>
    <Notification message= {newMessage}/>
    <form onSubmit ={handleLogin}>
        <div>
            username
          <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            password
          <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
    </form>
    </div>
    )
}


export default LoginForm