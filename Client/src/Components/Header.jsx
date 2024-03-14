import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext.jsx";
function Header() {
  const navItems = [
    { name: "Home", link: "/" },
    {name:'Shop',link:'/products'},
    { name: "Categories", link: "/categories" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const [search,setsearch] = useState('')

  const optionsData = [
    {
      iconSrc:
        "https://threedio-cdn.icons8.com/nyQTub5XpLLjDfeBRnGZWVUGg_zQTGs4QC0GAdhQSKM/rs:fit:1024:1024/czM6Ly90aHJlZWRp/by1wcm9kL3ByZXZp/ZXdzLzExNy82M2Qx/NDFiNS04MjQ4LTRi/ZDQtYmQ1Mi1lNWE2/ZmI0NDBjNTMucG5n.png",
      title: "Profile",
      link: "/profile",
    },
    {
      iconSrc:
        "https://threedio-cdn.icons8.com/CXxmo8CW6ZgmvcmrtJzwrNvzcHrZOGj3kyIS_M2W5Oc/rs:fit:1024:1024/czM6Ly90aHJlZWRp/by1wcm9kL3ByZXZp/ZXdzLzgxNS80YTg1/YmY3MC0xNGRmLTQw/ZmQtYTE5YS0xM2Vj/ZTU4NzZjNWMucG5n.png",
      title: "Cart",
      link:'/cart'
    },
    {
      iconSrc:
        "https://threedio-cdn.icons8.com/wSm9abwAUOMFOoG41Le1hMW2PYS_auKnzZd29SE5AzI/rs:fit:256:256/czM6Ly90aHJlZWRp/by1wcm9kL3ByZXZp/ZXdzLzg1Mi9hMzRj/MWY1Ni1kOTA1LTQ5/NzUtYjNkNC1jNjRk/YTRmNWU5ODcucG5n.png",
      title: "WishList",
      link:'/wishlist'
    },
    {
      iconSrc:
        "https://threedio-cdn.icons8.com/L3r1XjtbhA5IbNmmonDtRL4K24WexXp2zVc4t4fap64/rs:fit:256:256/czM6Ly90aHJlZWRp/by1wcm9kL3ByZXZp/ZXdzLzEyNS80ZTVj/NjJlMy1lNTgyLTRl/NDAtYjFmMi1mNTZh/ZjljNzY2M2QucG5n.png",
      title: "MyOrders",
      link:'/orders'
    },
  ];

  const { isAuthenticated,user, dispatch } = useAuth();

  console.log(user)
  const [menu, setmenu] = useState(false);
  const navigate = useNavigate();
  const headerstyles = { top: 0, position: "fixed" };
  const { pathname } = useLocation();

  useEffect(() => {
    if (menu) {
      setmenu(false)
    }
  },[pathname])

  return (
    <>
      <header style={headerstyles}>
        <div className="sitelogo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/8764/8764182.png"
            alt=""
          />
          <h2>SnapStore</h2>
        </div>

        {/* hamberger Buttons |>> */}

        <div className="useractions">
          {!menu && (
            <motion.img
              style={{ cursor: "pointer" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setmenu(true);
              }}
              width="39"
              height="39"
              src="https://img.icons8.com/ios/50/FA5252/menu-squared-2.png"
              alt="menu-squared-2"
            />
          )}

          {menu && (
            <motion.img
              style={{ cursor: "pointer" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => setmenu(false)}
              width="39"
              height="39"
              src="https://img.icons8.com/ios/50/FA5252/multiply-2.png"
              alt="multiply-2"
            />
          )}
        </div>
      </header>

      {/* hamberger div |>> */}

      {menu && (
        <motion.div
          initial={{ translateX: 1000, display: "none" }}
          animate={{ translateX: 0, display: "block" }}
          transition={{ duration: 0.3 }}
          className="hamberger-menu"
        >
          <form onSubmit={(e) =>{
          e.preventDefault;navigate(`/products/search/${search}`)}
          } action="">
            <input value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search a product!" type="text" />
            <button type="submit">Go!</button>
          </form>

          <ul>
            {navItems.map((item, index) => {
              return (
                <li
                  
                  key={index}
                >
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "navactive" : "";
                    }}
                    to={item.link}
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}

            <button
              style={{
                backgroundColor: `${isAuthenticated ? "red" : "green"}`,
              }}
              onClick={() =>
                isAuthenticated
                  ? dispatch({ type: "LOGOUT" })
                  : navigate("/login")
              }
            >
              {!isAuthenticated ? "Login/Register" : "LogOut"}
            </button>
          </ul>

          <br />
          <h2>{isAuthenticated ? `WelCome - ${user.name}` : 'Hey User! Please Login To Continue.'}</h2>
          <br />
          
          
          {isAuthenticated && <div className="useroptions">
          {optionsData.map((option, index) => (
        <motion.div onClick={() => navigate(`${option.link}`)} initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{delay:0.001*index,duration:.2}} key={index} className="option">
          <img src={option.iconSrc} alt="" />
          <h1>{option.title}</h1>
        </motion.div>
      ))}
          </div>}
        </motion.div>
      )}
    </>
  );
}

export default Header;
