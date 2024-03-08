import React from 'react'
import CustomCarousel from './ImageSlider/ImageSlider.jsx'

function ProductPage() {

  const images = [{url:'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},{url:'https://images.unsplash.com/photo-1636115305669-9096bffe87fd?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},{
    url:'https://images.unsplash.com/photo-1559669865-5995d995c52c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}]

  return (
    <div className='productspage'>

<div className="slider">
      <CustomCarousel>

      {images.map((image, index) => {
          return <div style={{position:'relative'}}> <img key={index} src={image.url} alt={image.imgAlt} /> <div className="slidertext"><h1>Grab Your Favorites Before There're Gone!</h1>
          <p>Get <b>MAXX </b> Discounts On Every Product Category </p>
          <button>Shop Now</button>
          </div></div>;
        })}
        
      </CustomCarousel>
      </div>
      
    </div>
  )
}

export default ProductPage
