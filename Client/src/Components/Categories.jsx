import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Categories() {
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
},[])
  return (
    
    <div className='categoriespage'>
  
  <h1>Explore The Categories!</h1>

  <div className="categories">

    <div className="category">
        <div onClick={() => navigate('/products/category/mens fashion')}  className="img">
            <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lbnMlMjBmYXNoaW9ufGVufDB8fDB8fHww" alt="" />
        </div>
        <h2>Men's Fashion</h2>
    </div>


    <div onClick={() => navigate('/products/category/womens fashion')} className="category">
        <div className="img">
            <img src="https://images.unsplash.com/photo-1624309845812-a7c7e12259f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
        </div>
        <h2>Women's Fashion</h2>
    </div>

    <div onClick={() => navigate('/products/category/electronics')}  className="category">
        <div className="img">
            <img src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <h2>Electronics</h2>
    </div>

    <div onClick={() => navigate('/products/category/accessories')}  className="category">
        <div className="img">
            <img src="https://images.pexels.com/photos/157888/fashion-glasses-go-pro-female-157888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <h2>Accessories</h2>
    </div>

    
    

  </div>
    </div>
  )
}

export default Categories
