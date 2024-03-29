
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const products = [
    {
      title: "Men's Fashion",
      videourl:
        "https://videos.pexels.com/video-files/7764127/7764127-hd_720_1366_25fps.mp4",
      link: "/category/men",
      poster: ''
    },
    {
      title: "Women's Fashion",
      videourl:
        "https://videos.pexels.com/video-files/3894706/3894706-hd_720_1366_50fps.mp4",
      link: "/category/women",
      poster: ''
    },
    {
      title: "Accessories",
      videourl:
        "https://videos.pexels.com/video-files/3946211/3946211-hd_1080_2048_25fps.mp4",
      link: "/category/accessories",
      poster: ''
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="containerhome">
      <div className="homepage">
        <div className="intro">
          <video
            autoPlay
            loop
            preload="metadata"
            src="https://videos.pexels.com/video-files/5889058/5889058-hd_1920_1080_25fps.mp4"
            className="video"
          ></video>
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
                <div
                  onClick={() => {
                    navigate(product.link);
                  }}
                  key={product.title}
                  className="product"
                >
                  <div className="img">
                    <video loop autoPlay src={product.videourl} type='video/mp4'></video>
                  </div>
                  <h1>{product.title}</h1>
                </div>
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
