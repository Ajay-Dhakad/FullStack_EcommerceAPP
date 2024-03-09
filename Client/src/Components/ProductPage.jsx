import React, { useEffect,useState } from 'react'
import { getProduct } from './ProductHandlers/ProductHandler';
import {useParams,Link} from 'react-router-dom'

function ProductPage() {

    const {productid} = useParams();

    const [Product,setproduct] = useState(null)

    // console.log(productid)

    const Getproduct = async() => {
        
      
          
            const product = await getProduct(productid)


            if (product?.success){

                setproduct(product.product)

            console.log(Product)

            }
    
    }

    useEffect(() => {

        Getproduct()
        
    },[productid])


  return (
    <div style={{backgroundImage:`url('${Product?.image}')`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}} className='product_page'>
    <div className="cover">
     {Product && <><div className="product_image">
        <img src={Product.image} alt="" />
      </div>
      <div className="product_details">
      <p >#<Link to={`/products/category/${Product.category}`}>{Product.category}</Link></p>
        <h1>{Product.name}</h1>
        <p>{Product.description}</p>
        {/* <p>{Product.totalRatings && Product.productReviews.length !==0 ? Product.totalRatings/Product.productReviews.length : 'no ratings available'} by {Product.productReviews.length} Users</p> */}
          <div class="star-rating">

            {

            Array.from({length:5}).map((_,index) => index < (Product.totalRatings / Product.productReviews.length) ? <span style={{color:'gold'}}>★</span>   : <span style={{color:'grey'}}>★</span>  ) 
            }
            </div>  
        <h2> ₹{Product.price} <del style={{opacity:.8}} >₹{Product.actualprize}</del> <b>50% Off</b></h2>
      </div></>}
      </div>
    </div>
  )
}


export default ProductPage;
