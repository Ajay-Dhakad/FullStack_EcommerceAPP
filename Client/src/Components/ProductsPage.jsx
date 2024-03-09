import React, { useEffect, useState } from 'react'
import ImageSliderComponent from './ImageSlider/ImageSliderComponent'
import Categories from './Categories'
import { getProducts } from './ProductHandlers/ProductHandler.jsx'
import {useParams,useNavigate,useLocation}  from 'react-router-dom'
function ProductPage() {

  
  const [Products,setproducts] = useState()

  const {filter,category} = useParams();

  // console.log(filter,category)

  const {pathname} = useLocation();

  const navigate  = useNavigate();

  const GetProducts = async() => {

    const data = await getProducts(category,filter)
    // console.log(data)

    if (data?.success && data?.products?.length > 0) {

      setproducts([...data.products])
      

    }

  }

  
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    const newFilter = selectedFilter !== '' ? `/filter/${selectedFilter}` : '';
  
    const currentCategory = category ? `/category/${category}` : '';
  
    navigate(`/products${newFilter}${currentCategory}`);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const newCategory = selectedCategory !== '' ? `/category/${selectedCategory}` : '';

    navigate(`/products${filter ? `/filter/${filter}` : ''}${newCategory}`);
  };

  useEffect(() => {

    GetProducts()

  },[filter,category])


  return (
<div className='productspage'>

  <ImageSliderComponent/>

  <div className="sortings">

     <div className='sorting'>
      <h1>Categories </h1>
      <select value={category} onChange={handleCategoryChange} className="custom-select">
            <option value=''>All Categories</option>
            <option value='mens clothings'>Mens Clothing</option>
            <option value='category2'>Category 2</option>
            {/* Add more categories as needed */}
          </select>
       </div>
       <div className="sorting">
          <h1>Sort By</h1>
          <select value={filter} onChange={(e) => e.target.value == '' ? navigate('/products') : navigate(`/products/filter/${e.target.value}`)}>
          <option value=''>Sort By</option>
            <option value="prize-low">Price: Low to High</option>
            <option value="prize-high">Price: High to Low</option>
            <option value="rating-high">Rating: High to Low</option>
            <option value="rating-low">Rating: Low to High</option>
          </select>
        </div>
        </div>

      {Products?.length > 0 ? <div className="products">  
        
      {
        Products.map((product,index) => {
          console.log(product)
          return (
            <div className="product" key={product._id}>
              <div className="img">
                <img src={product.image} alt="" />
              </div>
              
              <p><del style={{color:'red'}}>{product.actualprize}₹  </del>{product.price}₹ </p>
              <h1>{product.name}</h1>
              <p className="ratings">Ratings : {product.totalRatings && product.productReviews.length !==0 ? product.totalRatings/product.productReviews.length : '0'}/5⭐</p>
              <div className='discount'>{((product.actualprize - product.price) / product.actualprize)*100}%Off</div>
            </div> 
          )
        })
      }
      </div> : <div className='loaderwrapper'><div className="loader loadersm"></div>
</div> }
      
      
</div>
    
  )
}

export default ProductPage
