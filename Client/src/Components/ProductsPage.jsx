import React, { useEffect, useState } from "react";
import ImageSliderComponent from "./ImageSlider/ImageSliderComponent";
import Categories from "./Categories";
import { getProducts } from "./ProductHandlers/ProductHandler.jsx";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
function ProductPage() {
  const [Products, setproducts] = useState();

  const { filter, category } = useParams();

  console.log(filter, category);

  const navigate = useNavigate();

  const GetProducts = async () => {
    const data = await getProducts(category, filter);
    // console.log(data)

    if (data?.success && data?.products?.length > 0) {
      setproducts([...data.products]);
    }
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    const currentCategory = category ? `/category/${category}` : "";
    const newFilter = selectedFilter !== "" ? `/filter/${selectedFilter}` : "";

    navigate(`/products${newFilter}${currentCategory}`);
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
  }, [filter, category]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="productspage">
      <ImageSliderComponent />

      <div className="sortings">
        <div className="sorting">
          <h1>Categories </h1>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="custom-select"
          >
            <option value="">All Categories</option>
            <option value="mens clothings">Mens Clothing</option>

            {/* Add more categories as needed */}
          </select>
        </div>
        <div className="sorting">
          <h1>Sort By</h1>
          <select value={filter} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="prize-low">Price: Low to High</option>
            <option value="prize-high">Price: High to Low</option>
            <option value="rating-high">Rating: High to Low</option>
            <option value="rating-low">Rating: Low to High</option>
          </select>
        </div>
      </div>

      {Products?.length > 0 ? (
        <div className="products">
          {Products.map((product, index) => {
            console.log(product);
            return (
              <motion.div
                initial={{ opacity: 0, translateX: -50 }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/product/${product._id}`)}
                className="product"
                key={product._id}
              >
                <div className="img">
                  <img src={product.image} alt="" />
                </div>

                <p>
                  <del style={{ color: "red" }}>{product.actualprize}₹ </del>
                  {product.price}₹{" "}
                </p>
                <h1>{product.name}</h1>
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
                  {((product.actualprize - product.price) /
                    product.actualprize) *
                    100}
                  %Off
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="loaderwrapper">
          <div className="loader loadersm"></div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
