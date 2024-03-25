import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../ProductHandlers/ProductHandler'
import {Toaster,toast} from 'react-hot-toast'

function ProductsAdminPage({classname}) {

  const [products,setproducts] = useState(null)

  console.log(products)

  const getproducts = async () => {
    const data = await getProducts();
    if (data?.success && data?.products?.length > 0) {
      setproducts(data.products)
    } else {
      setproducts([])
  
  }
}

const productDeleteHandler = async(productid) => {
  const response = await deleteProduct(productid);
  if (response.success) {
    toast.success(response.message);
    setproducts(products.filter(product => product._id !== productid))
  } else {
    toast.error(response.message);
  }
}

  useEffect(() => {

    getproducts()

  },[])

  return (
    <>
    <Toaster position='top-center' />
    <div className={classname}>
        <h1 className='title'>Products <button className='new_productbtn'>+</button></h1>
    
        <table border="0">
  <thead>
    <tr>
      <th>Product ID</th>
      <th>Image</th>
      <th>Product Name</th>
      <th>Category</th>
      <th>Price (INR)</th>
      <th>Description</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
   { products?.map((product,index) =>  <tr>
      <td>{product._id}</td>
      <td><img src={product.image} alt={product.name}/></td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}₹</td>
      <td>{product.description}</td>
      <td><i class="ri-file-edit-fill"></i></td>
      <td><i onClick={() => productDeleteHandler(product._id)} class="ri-delete-bin-6-line"></i></td>
    </tr>)}
  </tbody>
</table>
    </div>
    </>
  )
}

export default ProductsAdminPage
