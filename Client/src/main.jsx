import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Homepage from './Components/Homepage.jsx'
import { AuthContextProvider } from './authContext/AuthContext.jsx'
import Login from './Components/userAuthComponents/Login.jsx'
import SignUp from './Components/userAuthComponents/SignUp.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Homepage/>
      },{
        path:'/login',
        element:<Login/>
      },{
        path:'/signup',
        element:<SignUp/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router}/>
    </AuthContextProvider>
  </React.StrictMode>,
)
