import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../ProductHandlers/ProductHandler'
import {Toaster,toast} from 'react-hot-toast'
import AddProductForm from './AddProductForm'
import {motion} from 'framer-motion'

function ProductsAdminPage({classname}) {

  const [products,setproducts] = useState(null)

  const [newProduct,setnewProduct] = useState(false)

  const [producttoedit,setproducttoedit] = useState(null)


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
        <h1 className='title'>{!newProduct ? "All Products" : 'New Product'} <button style={{backgroundColor:newProduct && 'red'}} onClick={() => {setnewProduct((prev) => !prev);setproducttoedit(null)}} className='new_productbtn'>{newProduct ? 'x' : '+'}</button></h1>
    {!newProduct &&
        <motion.table initial={{opacity:0}} whileInView={{opacity:1,translateX:0}} transition={{duration:.5}}  border="0">
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
   { products?.map((product,index) =>  <motion.tr key={product._id} initial={{opacity:0}} whileInView={{opacity:1,translateX:0}} transition={{duration:.2,delay:index*0.1}}>
      <td>{product._id}</td>
      <td><img src={product.image} alt={product.name}/></td>
      <td>{product.name.slice(0,50)}</td>
      <td>{product.category}</td>
      <td>{product.price}₹</td>
      <td>{product.description.slice(0,100)}</td>
      <td onClick={() => {setproducttoedit(product);setnewProduct(true)}}><i class="ri-file-edit-fill"></i></td>
      <td><i onClick={() => productDeleteHandler(product._id)} class="ri-delete-bin-6-line"></i></td>
    </motion.tr>)}
  </tbody>
</motion.table>}

{
  newProduct && <AddProductForm toast={toast} producttoedit={producttoedit} setproducts={setproducts} setnewProduct={setnewProduct}/>
}

{
  products == null && <div className="loaderwrapper">
     <br /><br /><br /><br />
  <div className="loader"></div>
</div>
}

    </div>
    </>
  )
}

export default ProductsAdminPage
