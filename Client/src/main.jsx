import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Homepage from './Components/Homepage.jsx'
import { AuthContextProvider } from './authContext/AuthContext.jsx'
import Login from './Components/userAuthComponents/Login.jsx'
import SignUp from './Components/userAuthComponents/SignUp.jsx'
import Categories from './Components/Categories.jsx'
import ProductsPage from './Components/ProductsPage.jsx'
import ProductPage from './Components/ProductPage.jsx'
import CartPage from './Components/CartPage.jsx'
import { CartContextProvider } from './cartContext/CartContext.jsx'
import WishlistPage from './Components/WishlistPage.jsx'
import ProfilePage from './Components/ProfilePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children:[
      {
        path:'/:homepage?',
        element:<Homepage/>
      },{
        path:'/login',
        element:<Login/>
      },{
        path:'/signup',
        element:<SignUp/>
      },{
        path:'/categories',
        element:<Categories/>
      },{
        path:'/products/search?/:search?/filter?/:filter?/category?/:category?',
        element:<ProductsPage/>
      },{
        path:'/product/:productid',
        element: <ProductPage/>
      },{
        path:'/cart',
        element:<CartPage/>
      },{
        path:'/wishlist',
        element:<WishlistPage/>
      },{
        path:'/profile',
        element:<ProfilePage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartContextProvider>  
    <AuthContextProvider>
    <RouterProvider router={router}/>
    </AuthContextProvider>
    </CartContextProvider>

  </React.StrictMode>,
)
