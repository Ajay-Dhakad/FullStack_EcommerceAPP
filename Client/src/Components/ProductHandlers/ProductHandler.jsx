
import {useAuth} from '../../authContext/AuthContext.jsx'

export const getProducts = async(category=false,filter=false,search=false) => {

    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/product/getproducts${search ? `?search=${search }` : ''}${category ?  '?category='+category : ''}${filter && category ? '&filter='+filter : ''}${filter && !category && !search ? '?filter='+filter : ''}${filter && search ? '&filter='+filter : ''}`)

    const json = await product.json()
    
    return json;

}


export const getProduct = async (productid) => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/product/getproduct/${productid}`)
    
    const json = await product.json()
    
    return json;
}

export const deleteProduct = async(productid) => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/product/deleteproduct/${productid}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
    })
    
    const json = await product.json()
    
    return json;
}

export const NewProduct = async(formData) => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/product/addproduct`,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body:formData
    })
    
    const json = await product.json()
    
    return json;
}

export const UpdateProduct = async(formData,productid) => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/product/updateproduct/${productid}`,{
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body:formData
    })
    
    const json = await product.json()
    
    return json;
}


export const AddToCart = async (productid,quantity,user) => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/cart/addtocart`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({productid,quantity})
    })
    
    const json = await product.json()
    
    return json;
}

export const getCart = async() => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/cart/getcart`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
    
    const json = await product.json()
    
    return json;
}

export const updateCartQuantity = async(productid,action) => {

    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/cart/updatecart/${productid}/${action}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },

    })
    
    const json = await product.json()
    
    return json;

}

export const deleteFromCart = async(productid) => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/cart/removefromcart/${productid}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
    })

    const json = await product.json()
    
    return json;

}


//Add to Wishlist

export const AddToWishlist = async(productid) => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/wishlist/addtowishlist/${productid}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
       
    })
    
    const json = await product.json()
    
    return json;
}

export const GetWishlistItems = async()=> {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/wishlist/getwishlist`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
    })
    
    const json = await product.json()
    
    return json;
    
}

export const RemoveFromWishlist = async(id)=> {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/wishlist/removefromwishlist/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
    })
    
    const json = await product.json()
    
    return json;
}

export const getOrders = async() => {
    
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/order/getorders`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
    })
    
    const json = await product.json()
    
    return json;
}

export const getOrder = async(orderid) => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/order/getorder/${orderid}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
    })
    
    const json = await product.json()
    
    return json;
}

export const getAllOrders = async() => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/order/getallorders`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
    })
    
    const json = await product.json()
    
    return json;
}

export const updateOrderStatus = async(orderid,status) => {
    
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/order/orderstatus`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({orderid,status})

    })
    
    const json = await product.json()
    
    return json;

}

export const ProductReview =  async(productid,review) => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/product/review/${productid}`,{
        method: 'POST',
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({...review})
    })
    
    const json = await product.json()
    
    return json;
}

export const deleteProductReview = async(productid,reviewid) => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/product/deletereview/${productid}/${reviewid}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
    })
    
    const json = await product.json()
    
    return json;
}

//getall users from db//

export const getAllUsers = async() => {
    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/getallusers`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
    })
    
    const json = await product.json()
    
    return json;
}