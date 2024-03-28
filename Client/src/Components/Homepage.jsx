import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const products = [
    {
      title: "Men's Fashion",
      videourl:
      "https://videos.pexels.com/video-files/8346468/8346468-hd_720_1366_25fps.mp4",
     link: "/category/men",
    },
    {
      title: "Women's Fashion",
      videourl:
        "https://videos.pexels.com/video-files/3894706/3894706-hd_720_1366_50fps.mp4",
      link: "/category/women",
    },
    {
      title: "Accessories",
      videourl:'https://videos.pexels.com/video-files/3946211/3946211-hd_1080_2048_25fps.mp4',
      link: "/category/accessories",
    },
  ];

  const servicesData = [
    {
      iconSrc: "https://www.iconsdb.com/icons/preview/white/truck-xxl.png",
      title: "FREE SHIPPING",
      description:
        "Delight in seamless free shipping, enhancing your shopping experience. Navigate our diverse collection, where cost savings meet product joy",
    },
    {
      iconSrc: "https://www.iconsdb.com/icons/preview/white/padlock-3-xxl.png",
      title: "SECURE PAYMENTS",
      description:
        "Shop with confidence using our secure payment methods. Your transactions are protected, providing peace of mind for a worry-free shopping",
    },
    {
      iconSrc: "https://www.iconsdb.com/icons/preview/white/pin-8-xxl.png",
      title: "ORDER TRACKING",
      description:
        "Track your order effortlessly with our streamlined system. Stay informed and in control as your purchase makes its way to your doorstep",
    },
    {
      iconSrc: "https://www.iconsdb.com/icons/preview/white/return-xxl.png",
      title: "EASY RETURNS",
      description:
        "Celebrate worry-free shopping with our hassle-free returns – because we're here to make your shopping experience as smooth as possible",
    },
  ];

  return (
    <div className="containerhome">
      <div className="homepage">
        <div className="intro">
          <video
            autoPlay
            loop
            src="https://videos.pexels.com/video-files/5889058/5889058-hd_1920_1080_25fps.mp4"
            className="video"
          ></video>

          <motion.p
            initial={{ opacity: 0, translateY: -20 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Biggest <b>SALE</b> is Almost Here!
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, translateY: -20 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Elevate your lifestyle with our handpicked selection of must-have
            items
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, width: "100px" }}
            whileInView={{ opacity: 1, translateY: 0, width: "250px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={() => {
              navigate("/products");
            }}
          >
            ShopNow
          </motion.button>
        </div>

        <div className="advertise">
          <div className="content">
            <div className="text">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Up To 25% Off
              </motion.h3>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                GRAB YOUR FAVORITES <br /> BEFORE THEY'RE GONE
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Discover unparalleled quality at SnapStore. With meticulous
                attention to detail and stringent quality control, we promise a
                shopping experience where excellence is not just a commitment
                but our brand's foundation
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                onClick={() => {
                  navigate("/categories");
                }}
              >
                EXPLORE CATEGORIES
              </motion.button>
            </div>
            <div className="product">
              <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                src="https://websitedemos.net/black-friday-04/wp-content/uploads/sites/1419/2023/11/headphone-01.png"
                alt=""
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
                  onClick={() => {
                    navigate(product.link); 
                  }}
                  initial={{ opacity: 0, translateY: -100 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: 0.3 * index, duration: 1.5 }}
                  viewport={{ once: true }}
                  key={product.title}
                  className="product"
                >
                  <div className="img">
                    <video onMouseOver={(e) => e.target.play()} onMouseLeave={(e) => e.target.pause()} loop={true} src={product.videourl}></video>
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
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, translateX: -200 }}
                transition={{ delay: 0.2 * index, duration: 1 }}
                whileInView={{ opacity: 1, translateX: 0 }}
                key={index}
                className="service"
              >
                <img src={service.iconSrc} alt="ServiceImage" />
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
