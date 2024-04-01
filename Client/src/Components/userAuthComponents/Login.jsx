import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UseLogin } from './AuthHandlers/authHandlers'
import {Toaster,toast }from 'react-hot-toast'
function Login() {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loader,setloader] = useState(false)
    const navigate = useNavigate();
    
    

    const submitHandler = async(e) => {
        e.preventDefault();

        setloader(true);

        try {
            const response = await UseLogin(email, password)
            console.log(response)
            
            if (response.error){
                setloader(false)
                toast.error(response.error)

            }

            if (response.success){
                localStorage.setItem('auth_token', response.token)
                setloader(false)
                navigate('/')



            }

        } catch (error) {
            setloader(false);
            toast.error(error.message)
        }
       
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    },[])

  return (

    <>
    <Toaster  
    position="top-center"
    reverseOrder={false}/>

   <div className="loginsection">

    <div className="login_form">

    <div className="illustration">
        <img src="https://ouch-cdn2.icons8.com/SOMJJnavA0MTyYXpv987VMbj3ZtSUAwlVt2wd1hh5Zw/rs:fit:368:355/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjMz/LzQ3YjdiODc4LTM5/NjYtNDU2Mi1iOGVk/LTRhYTNlNmQyNTRk/NC5wbmc.png" alt="" />

        <h2>Login to your account!</h2>
        <br />
    </div>  
    <form onSubmit={submitHandler}>
        <input type="text" disabled={loader}  required  onChange={(e) => {setemail(e.target.value)}}  name="email" placeholder="Email"  value={email}/>
        <input type="password" disabled={loader} required onChange={(e) => {setpassword(e.target.value)}} name="password" placeholder="Password"  value={password}/>
    
        <button disabled={loader} type="submit">{loader ? 'loggingIn...' : 'Login'}</button>
        <p>Don't have an account? <Link to={'/signup'}>Sign Up</Link> </p>
        <div className="testelementslogin">
        <p onClick={() => setemail('ajaydhakad036@gmail.com') & setpassword('ajaydhakadA1!')}>Test As Admin</p>
        <p  onClick={() => setemail('testuser@gmail.com') & setpassword('testuserA1!')}>Test As User</p>
        </div>



    </form>
   
    </div>
    
   </div>
   </>

  )
}

export default Login
