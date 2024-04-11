import React, { useState } from 'react';
import { NewProduct, UpdateProduct } from '../ProductHandlers/ProductHandler';
import {motion} from 'framer-motion'

const AddProductForm = ({setnewProduct,setproducts,toast,producttoedit}) => {
  const [imagePreview, setImagePreview] = useState(producttoedit?.image || null);
  const [name, setName] = useState(producttoedit?.name || null);
  const [image,setImage] = useState(null);
  const [description,setdescription] = useState(producttoedit?.description || null);
  const [category,setcategory] = useState(producttoedit?.category || null);
  const [price,setprice] = useState( producttoedit?.price ||null);
  const [stock,setstock] = useState(producttoedit?.stock ||  null);
  const [actualprize,setactualprice] = useState(producttoedit?.actualprize || null);
  const [loader,setloader] = useState(false);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file)



    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setloader(true)

    try{

        const formData = new FormData();
        if(image){formData.append('image', image);}
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('actualprize', actualprize);
        formData.append('category', category);
        formData.append('stock', stock);
 
      const response = !producttoedit ? await NewProduct(formData) : await UpdateProduct(formData,producttoedit._id)
      if (!response.success){
        setloader(false)
        toast.error(response.message)
        console.log(response)
      }
      if (response.success){
        setloader(false)
        toast.success(response.message)

        if(!producttoedit){setproducts((prev) => [response.product,...prev])}
        else{
            setproducts((prev) => prev.map((product) => product._id === response.product._id? response.product : product))
        }

        setnewProduct(false)
        console.log(response)
      }
    }
    catch(e){
      setloader(false)
      toast.error(e.message)
    }
  }

  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1,translateX:0}} transition={{duration:.5}} className="form-container">
      <div className="image-preview"  >
        {<img src={imagePreview ? imagePreview : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'} alt="Preview" />}
      </div>
      <form  onSubmit={handleSubmit} className="form">
        <input  disabled={loader} type="file" accept="image/*" onChange={handleImageChange} />
        <input  disabled={loader} type="text" value={name} onChange={((e) => setName(e.target.value))} placeholder="Name" />
        <textarea disabled={loader} value={description} onChange={((e) => setdescription(e.target.value))}  placeholder="Description"></textarea>
        <input  disabled={loader} type="number" value={price} onChange={((e) => setprice(e.target.value))} placeholder="Price" />
        <input  disabled={loader} type="number" value={actualprize} onChange={((e) => setactualprice(e.target.value))} placeholder="Actual Price" />
        <select  disabled={loader} type="text" value={category} onChange={((e) => setcategory(e.target.value))} placeholder="Category" >
        <option value="mens fashion">Mens fashion</option>
        <option value="womens fashion">Womens Fashion</option>
        <option value="accessories">Accessories</option>
        <option value="phones">Phones</option>
        <option value="laptops">Laptops</option>
        <option value="bags">Bags</option>
        <option value="shoes">Shoes</option>
        <option value="jewellery">Jewellery</option>
        </select>
        <input  disabled={loader} type="number" value={stock} onChange={((e) => setstock(e.target.value))} placeholder="Stock" />
        <button disabled={loader} type="submit">{!loader ? 'Submit' : !producttoedit ? 'Adding Product...' : 'Updating Product...'}</button>
      </form>
    </motion.div>   
    
    
  );
};

export default AddProductForm;
