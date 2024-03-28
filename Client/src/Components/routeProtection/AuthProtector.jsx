import React, { useEffect } from 'react'
import {useAuth} from '../../authContext/AuthContext'
import {useNavigate} from 'react-router-dom'
function AuthProtector({children,authentication=false}) {

    const navigate = useNavigate()

    const {user} = useAuth()
    console.log(user)
    
   useEffect(() =>{ 
    
    if(!user && authentication){
        navigate('/login')
    }

    if(user && !authentication){
        navigate('/')
    }},[user,authentication])

  return (
    <>{children}</>
  )
}

export default AuthProtector
