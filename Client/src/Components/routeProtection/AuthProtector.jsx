import React, { useEffect } from 'react'
import {useAuth} from '../../authContext/AuthContext'
import {useNavigate} from 'react-router-dom'
function AuthProtector({children,authentication=false}) {

    const navigate = useNavigate()

    const {user} = useAuth()
    
   useEffect(() =>{ 
  
      if (authentication && !user) {
        navigate('/login');
      } else if (!authentication && user) {
        navigate('/');
      }},[user,authentication,navigate])

  return (
    <>{children}</>
  )
}

export default AuthProtector
