import React from 'react'
import {motion} from 'framer-motion'

function Homepage() {
  return (
    <div className="homepage">

<div className="intro">

<motion.p initial={{opacity:0,translateY:20}} whileInView={{opacity:1,translateY:0}} transition={{duration:.5,delay:.2}}>Biggest <b>SALE</b> is Almost Here!</motion.p>
<motion.h1 initial={{opacity:0,translateY:20}} whileInView={{opacity:1,translateY:0}} transition={{duration:.5,delay:.5}}>Elevate your lifestyle with our handpicked selection of must-have items</motion.h1>
<motion.button initial={{opacity:0,width:'100px'}} whileInView={{opacity:1,translateY:0,width:'250px'}} transition={{duration:.5,delay:.6}}>ShopNow</motion.button>

</div>

    </div>
  )
}

export default Homepage
