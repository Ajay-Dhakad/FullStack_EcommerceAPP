import React from 'react'
import {  NavLink } from 'react-router-dom'
import {motion} from 'framer-motion'
function Header() {

    const navItems = [{name: 'Home',link:'/'}, {name: 'Categories',link:'/categories'},{name: 'About', link: '/about'
},{name: 'Contact', link: '/contact'}];  //add more items as

  return (
    
    <header>

    <div className='sitelogo'>
        <img src="https://cdn-icons-png.flaticon.com/512/8764/8764182.png" alt="" />
        <h2>SnapStore</h2></div>
    <ul>
        {
            navItems.map((item,index) => {
                return <motion.li initial={{opacity:0,translateX:-10}} whileInView={{opacity:1,translateX:0}} viewport={{once:true}} transition={{delay:.1*index}} key={index}><NavLink className={({isActive}) => {return isActive ? 'navactive' : ''}} to={item.link}>{item.name}</NavLink></motion.li>
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
