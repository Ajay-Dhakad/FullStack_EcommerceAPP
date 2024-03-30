import React,{useMemo} from 'react'
import {motion} from 'framer-motion'

function ProductCategories() {

    const products = useMemo(() => {

        return [
           {
             title: "Men's Fashion",
             imageurl:
               "https://i.pinimg.com/736x/86/4c/be/864cbe2c99d71f4040087c50fcb37144.jpg",
             link: "/category/men",
             poster: ''
           },
           {
             title: "Women's Fashion",
             imageurl:
               "https://thumbs.dreamstime.com/b/portrait-two-sexy-pretty-beautiful-women-fashion-style-clothes-sisters-long-curly-hair-perfect-make-up-people-lifestyle-113021487.jpg",
             link: "/category/women",
             poster: ''
           },
           {
             title: "Accessories",
             imageurl:
               "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWNjZXNzb3J5fGVufDB8fDB8fHww",
             link: "/category/accessories",
             poster: ''
           },
         ];
     
       }) 

  return (
    <div className="productshowcase">
          <p>Unbelievable Discounts Await You!</p>
          <h1>EXPLORE THE VARIETIES</h1>
          <div className="products">
            {products.map((product, index) => {
              return (
                <motion.div
                key={product.title}
                className="product"
                initial={{ opacity: 0,translateX:-20 }}
                whileInView={{opacity:1,translateX:0}}
                transition={{duration:index*0.3,delay:index*0.3}}
                onClick={() => navigate(product.link)}
                viewport={{once:true}}
              >
                <div className="img">
                  {/* <video loop autoPlay src={product.videourl} type="video/mp4"></video> */}
                  <img src={product.imageurl} alt="" />
                </div>
                <h1>{product.title}</h1>
              </motion.div>
              );
            })}
          </div>
        </div>
  )
}

export default ProductCategories
