
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import headPhoneImage from '../assets/headphone.png'
import homepagebackground from '../assets/homepagebackground.jpg'
import easyreturnspng from '../assets/easyreturns.png'
import ordertrackingpng from '../assets/ordertracking.png'
import securepaymentspng from '../assets/securepayments.png'
import freeshippingpng from '../assets/freeshipping.png'
function Homepage() {
  const navigate = useNavigate();

  const products = [
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

  const servicesData = [
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

        <div className="advertise">
          <div className="content">
            <div className="text">
              <h3>Up To 25% Off</h3>
              <h1>
                GRAB YOUR FAVORITES <br /> BEFORE THEY'RE GONE
              </h1>
              <p>
                Discover unparalleled quality at SnapStore. With meticulous
                attention to detail and stringent quality control, we promise a
                shopping experience where excellence is not just a commitment
                but our brand's foundation
              </p>
              <button onClick={() => navigate("/categories")}>
                EXPLORE CATEGORIES
              </button>
            </div>
            <div className="product">
              <img
                src={headPhoneImage}
                alt="Product Image"
              />
            </div>
          </div>
        </div>

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

        <div className="whychooseus">
          <p>Why Choose SnapStore!</p>
          <h1>THE JOY OF SHOPPING AT ITS BEST</h1>
          <div className="services">
            {servicesData.map((service, index) => (
              <div key={index} className="service">
                <img src={service.iconSrc} alt="ServiceImage" />
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
