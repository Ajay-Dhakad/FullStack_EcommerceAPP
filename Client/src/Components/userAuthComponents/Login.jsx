import React from 'react'

function Login() {


  return (
   <div className="loginsection">

    <div className="login_form">

    <div className="illustration">
        <img src="https://ouch-cdn2.icons8.com/SOMJJnavA0MTyYXpv987VMbj3ZtSUAwlVt2wd1hh5Zw/rs:fit:368:355/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjMz/LzQ3YjdiODc4LTM5/NjYtNDU2Mi1iOGVk/LTRhYTNlNmQyNTRk/NC5wbmc.png" alt="" />
    </div>  
    <form action="">
        <div className="error">not valid</div>

        <input type="text"  name="username" placeholder="Username"/>
        <input type="password" name="password" placeholder="Password"/>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="#">Sign Up</a></p>

    </form>
   
    </div>
    
   </div>
  )
}

export default Login
