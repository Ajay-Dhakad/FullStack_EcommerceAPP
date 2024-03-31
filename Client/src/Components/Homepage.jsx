import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import homepagebackground from '../assets/homepagebackground.jpg'
import ProductAdvertise from "./Homepagecomponents/ProductAdvertise";
import Services from "./Homepagecomponents/Services";
import ProductCategories from "./Homepagecomponents/ProductCategories";

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="containerhome">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ backgroundImage: `url(${homepagebackground})` }}
        className="homepage"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="intro"
        >
          <p>
            Biggest <b>SALE</b> is Almost Here!
          </p>
          <h1>
            Elevate your lifestyle with our handpicked selection of must-have
            items
          </h1>
          <motion.button
            onClick={() => navigate("/products")}
          >
            Shop Now
          </motion.button>
        </motion.div>

        <ProductAdvertise/>

        <ProductCategories/>

        <Services/>
      </motion.div>
    </div>
  );
}

export default Homepage;
