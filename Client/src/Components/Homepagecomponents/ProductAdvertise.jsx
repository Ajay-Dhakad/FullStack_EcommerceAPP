import React from 'react'
import headPhoneImage from '../../assets/headphone.png'


function ProductAdvertise() {
  return (
    <div className="advertise">
    <div className="content">
      <div className="text">
        <h3>Up To 25% Off</h3>
        <h1>
          GRAB YOUR FAVORITES <br /> BEFORE THEY'RE GONE
        </h1>
        <p>
          Discover unparalleled quality at SnapStore. With meticulous
          attention to detail and stringent quality control, we promise a
          shopping experience where excellence is not just a commitment
          but our brand's foundation
        </p>
        <button onClick={() => navigate("/categories")}>
          EXPLORE CATEGORIES
        </button>
      </div>
      <div className="product">
        <img
          src={headPhoneImage}
          alt="Product Image"
        />
      </div>
    </div>
  </div>
  )
}

export default ProductAdvertise
