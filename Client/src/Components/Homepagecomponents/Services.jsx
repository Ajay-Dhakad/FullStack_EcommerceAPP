import React,{useMemo} from 'react'
import easyreturnspng from '../../assets/easyreturns.png'
import ordertrackingpng from '../../assets/ordertracking.png'
import securepaymentspng from '../../assets/securepayments.png'
import freeshippingpng from '../../assets/freeshipping.png'

function Services() {

    const servicesData = useMemo(() => [
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
      ], []);

  return servicesData&&(
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
  )
}

export default Services
