
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import homepagebackground from '../assets/homepagebackground.jpg'
import easyreturnspng from '../assets/easyreturns.png'
import ordertrackingpng from '../assets/ordertracking.png'
import securepaymentspng from '../assets/securepayments.png'
import freeshippingpng from '../assets/freeshipping.png'
import ProductAdvertise from "./Homepagecomponents/ProductAdvertise";
import Services from "./Homepagecomponents/Services";
import ProductCategories from "./Homepagecomponents/ProductCategories";


function Homepage() {
  const navigate = useNavigate();

 

  const servicesData = useMemo(() => {

    return[
      {
        iconSrc: freeshippingpng,
        title: "FREE SHIPPING",
        description:
          "Delight in seamless free shipping, enhancing your shopping experience. Navigate our diverse collection, where cost savings meet product joy",
      },
      {
        iconSrc: securepaymentspng,
        title: "SECURE PAYMENTS",
        description:
          "Shop with confidence using our secure payment methods. Your transactions are protected, providing peace of mind for a worry-free shopping",
      },
      {
        iconSrc: ordertrackingpng,
        title: "ORDER TRACKING",
        description:
          "Track your order effortlessly with our streamlined system. Stay informed and in control as your purchase makes its way to your doorstep",
      },
      {
        iconSrc: easyreturnspng,
        title: "EASY RETURNS",
        description:
          "Celebrate worry-free shopping with our hassle-free returns – because we're here to make your shopping experience as smooth as possible",
      },
    ];

  }) 

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

        <Services servicesData={servicesData}/>
      </div>
    </div>
  );
}

export default Homepage;
