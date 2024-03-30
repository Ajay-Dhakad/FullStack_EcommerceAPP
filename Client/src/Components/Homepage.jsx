
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
      <div style={{backgroundImage:`url(${homepagebackground})`}} className="homepage">
        <div className="intro">
          {/* <video
            autoPlay
            loop
            preload="auto"
            src="https://videos.pexels.com/video-files/5889058/5889058-hd_1920_1080_25fps.mp4"
            className="video"
          ></video> */}

          <p>
            Biggest <b>SALE</b> is Almost Here!
          </p>
          <h1>
            Elevate your lifestyle with our handpicked selection of must-have
            items
          </h1>
          <button onClick={() => navigate("/products")}>Shop Now</button>
        </div>

          <ProductAdvertise/>

          <ProductCategories/>

        <Services/>
      </div>
    </div>
  );
}

export default Homepage;
