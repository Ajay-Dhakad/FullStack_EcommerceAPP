// import React from 'react'
// import { Link } from 'react-router-dom'

// function Footer() {
//   return (
//    <footer>
//     <div className="copyright">
//         <p>Copyright © 2024 SnapStore | Powered by SnapStore</p>
//     </div>
//     <div className="nav">
//         <ul>
//             <li><Link to={'/'}>Home</Link></li>
//             <li><Link to={'/categories'}>Shop</Link></li>
//             <li><Link to={'/about'}>About</Link></li>
//             <li><Link to={'/contact'}>Contact</Link></li>
//         </ul>
//     </div>
//    </footer>
//   )
// }

// export default Footer
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
// import './Footer.css'; // Import CSS file for styling

const Footer = () => {
    const isPC = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <motion.footer initial={isPC && {opacity:0,y:100}} transition={ isPC && {delay:.5,duration:.5}} whileInView={ isPC && {opacity:1,y:0}} viewport={{once:true}} className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3>Follow Us</h3>
          <div className="footer__social-icons">
            <Link to={'/'} target="_blank" rel="noopener noreferrer"><FaFacebook /></Link>
            <Link to={'/'} target="_blank" rel="noopener noreferrer"><FaTwitter /></Link>
            <Link to={'/'} target="_blank" rel="noopener noreferrer"><FaInstagram /></Link>
            <Link to={'/'} target="_blank" rel="noopener noreferrer"><FaPinterest /></Link>
          </div>
        </div>
        <div className="footer__section">
          <h3>About Us</h3>
          <p>SnapStore is your go-to destination for the latest trends in fashion, tech, and home decor. With a curated selection of high-quality products and exceptional customer service, we're here to help you express your unique style.</p>
        </div>
        <div className="footer__section">
          <h3>Contact</h3>
          <p>Email: ajaydhakad.py@gmail.com</p>
          <p>Phone:91xxxxxxxx</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
      </div> 
      <div className="footer__developers">
        <p>Developed with <span role="img" aria-label="heart">❤️</span> by <Link to={'https://github.com/Ajay-Dhakad'} target="_blank" rel="noopener noreferrer">Ajay Dhakad</Link></p>
      </div>
      <div className="footer__copyright">
        &copy; {new Date().getFullYear()} SnapStore. All Rights Reserved.
      </div>
    </motion.footer>
  );
}

export default Footer;
