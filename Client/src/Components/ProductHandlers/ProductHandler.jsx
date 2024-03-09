
export const getProducts = async(category=false,filter=false) => {

    const product = await fetch(`${import.meta.env.VITE_API_URI}/api/product/getproducts${category ?  '?category='+category : ''}${filter && category ? '&filter='+filter : ''}${filter && !category ? '?filter='+filter : ''}`)

    const json = await product.json()
    
    return json;

}