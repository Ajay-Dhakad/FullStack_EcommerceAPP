import { useEffect, useState } from 'react'
import {Outlet,useLocation} from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { useAuth } from './authContext/AuthContext'

function App() {

  const {pathname} = useLocation()

  const {user,dispatch} = useAuth();

  const [loader,setloader] = useState(false)
  

  const getUser = async (token) => {

    setloader(true)
    
    const response = await fetch(`${import.meta.env.VITE_API_URI}/api/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    const data = await response.json()

    if (!data.success) {
      return false
    }

    return data
  }

  useEffect(() =>{ 

    const token = localStorage.getItem('auth_token')

   const userData = async() =>{
    {if (token){

      setloader(true)

     const data = await getUser(token)

     if (!data) {
       localStorage.removeItem('auth_token')
       dispatch({type: 'LOGOUT'})
       setloader(false)
     }
      
     if(data.success){
      dispatch({type: 'LOGIN', payload: {...data.user,token:token}})
      setloader(false)
     }

    }}
  }

  if (!user){
  userData()
  }
  window.document.title = pathname.replace(/\/|\-/g, " ")
  if (pathname == '/'){
    window.document.title = "Home"
  }


  },[pathname])

  return (
    <>
    <Header/>
    {!loader ? <Outlet/> : <div className='loaderwrapper'><div className="loader"></div>
</div> }
    <Footer/>
    </>
  )
}

export default App
