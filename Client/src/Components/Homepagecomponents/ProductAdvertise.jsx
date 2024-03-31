import { motion } from "framer-motion";
import headPhoneImage from '../../assets/headphone.png';
import {useNavigate} from 'react-router-dom'

function ProductAdvertise() {
    const navigate = useNavigate()
  const isPC = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
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
          <button onClick={() => navigate('/categories')}>EXPLORE CATEGORIES</button>
        </div>
        {isPC && (
          <motion.div
            className="product"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: .5,delay:.5 }}
            viewport={{once:true}}
          >
            <img
              src={headPhoneImage}
              alt="Product Image"
            />
          </motion.div>
        )}
        {!isPC && (
          <div className="product">
            <img
              src={headPhoneImage}
              alt="Product Image"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductAdvertise;
