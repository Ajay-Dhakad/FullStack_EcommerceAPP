import React from 'react'
import {  NavLink } from 'react-router-dom'

function Header() {

    const navItems = [{name: 'Home',link:'/'}, {name: 'Categories',link:'/categories'},{name: 'About', link: '/about'
},{name: 'Contact', link: '/contact'}];  //add more items as

  return (
    
    <header>

    <h2>FashionHUB</h2>
    <ul>
        {
            navItems.map((item,index) => {
                return <li key={index}><NavLink className={({isActive}) => {return isActive ? 'navactive' : ''}} to={item.link}>{item.name}</NavLink></li>
            })
        }

    </ul>

    <div className=''>
        <button>Login</button>
        <button>Register</button>
    </div>

    </header>
  )
}

export default Header
