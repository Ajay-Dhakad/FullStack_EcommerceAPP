import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
   <footer>
    <div className="copyright">
        <p>Copyright © 2024 SnapStore | Powered by SnapStore</p>
    </div>
    <div className="nav">
        <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/categories'}>Shop</Link></li>
            <li><Link to={'/about'}>About</Link></li>
            <li><Link to={'/contact'}>Contact</Link></li>
        </ul>
    </div>
   </footer>
  )
}

export default Footer
