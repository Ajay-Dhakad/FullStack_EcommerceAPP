import React, { useEffect, useState } from "react";
import ImageSliderComponent from "./ImageSlider/ImageSliderComponent";
// import Categories from "./Categories";
import { getProducts } from "./ProductHandlers/ProductHandler.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import formatPrice from "./Utils/formatPrice.js";
function ProductPage() {
  const [Products, setproducts] = useState();

  const { filter, category, search } = useParams();

  const navigate = useNavigate();

  const GetProducts = async () => {
    const data = await getProducts(category, filter, search);

    if (data?.success && data?.products?.length > 0) {
      setproducts([...data.products]);
    }
    else{
      setproducts([])
    }
  };

  const handleFilterChange = (e) => {
    const ifsearch = search ? "/search/" + search : "";
    const selectedFilter = e.target.value;
    const currentCategory = category ? `/category/${category}` : "";
    const newFilter = selectedFilter !== "" ? `/filter/${selectedFilter}` : "";

    navigate(`/products${ifsearch}${newFilter}${currentCategory}`);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const currentFilter = filter ? `/filter/${filter}` : "";
    const newCategory =
      selectedCategory !== "" ? `/category/${selectedCategory}` : "";

    navigate(`/products${currentFilter}${newCategory}`);
  };

  useEffect(() => {
    GetProducts();
  }, [filter, category, search]);

  //automatically scroll to top when page is loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="productspage">
      <ImageSliderComponent />

      {search && (
        <>
          {" "} 
          <br />{" "}
          <center style={{ backgroundColor: "white",color:'black' }}>
            <h1>Showing results for {search}</h1>
          </center>{" "}
          <br />
        </>
      )}

      <div className="sortings">
        {!search && (
          <div className="sorting">
            <h1>Categories </h1>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="custom-select"
            >
              <option value="">All Categories</option>
              <option value="mens fashion">Mens fashion</option>
              <option value="womens fashion">Womens Fashion</option>
              <option value="accessories">Accessories</option>
              <option value="phones">Phones</option>
              <option value="laptops">Laptops</option>
              <option value="bags">Bags</option>
              <option value="shoes">Shoes</option>
              <option value="jewellery">Jewellery</option>

              {/* Add more categories as needed */}
            </select>
          </div>
        )}
        <div className="sorting">
          <h1>Sort By</h1>
          <select value={filter} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="prize-low">Price: Low to High</option>
            <option value="prize-high">Price: High to Low</option>
            <option value="rating-low">Rating: Low to High</option>
            <option value="rating-high">Rating: High to Low</option>

          </select>
        </div>
      </div>

      {Products?.length == 0  && (
        <center>
          <br />
          <h2>No Products Found For {search || category} !</h2>
          <br />
        </center>
      )}

      {Products?.length > 0 ? (
        <div className="products">
          {Products.map((product, index) => {
            console.log(product);
            return (
              <motion.div
                initial={{ opacity: 0, translateX: -50 }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{once:true}}
                onClick={() => navigate(`/product/${product._id}`)}
                className="product"
                key={product._id}
              >
                <div className="img">
                  <img src={product.image} alt="" />
                </div>

                <p>
                  <del style={{ color: "red" }}>{formatPrice(product.actualprize)}₹ </del>
                  {formatPrice(product.price)}₹{" "}
                </p>
                <h3>{product.name.slice(0,50)+'...'}</h3>
                <div class="star-rating-productspage">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index <
                    product.totalRatings / product.productReviews.length ? (
                      <span style={{ color: "gold" }}>★</span>
                    ) : (
                      <span style={{ color: "grey" }}>★</span>
                    )
                  )}
                </div>
                {/* <p className="ratings">Ratings : {product.totalRatings && product.productReviews.length !==0 ? product.totalRatings/product.productReviews.length : '0'}/5⭐</p> */}
                <div className="discount">
                  {parseInt(
                    ((product.actualprize - product.price) /
                      product.actualprize) *
                      100
                  ) + "% Off"}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        Products == null &&
        !search && (
          <div className="loaderwrapper">
            <div className="loader loadersm"></div>
          </div>
        )
      )}
    </div>
  );
}

export default ProductPage;
