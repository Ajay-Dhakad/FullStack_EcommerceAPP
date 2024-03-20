
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