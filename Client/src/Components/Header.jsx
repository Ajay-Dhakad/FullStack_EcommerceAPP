import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext.jsx";
import { useCart } from "../cartContext/CartContext.jsx";
function Header() {


  // const {userWishlist,userCart,userOrders} = useCart()

  const navItems = [
    { name: "Home", link: "/" },
    {name:'Shop',link:'/products'},
    { name: "Categories", link: "/categories" },
    // { name: "About", link: "/about" },
    // { name: "Contact", link: "/contact" },
  ];

  const [search,setsearch] = useState('')

  const optionsData = [
    {
      iconSrc:
        "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png",
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
    },{
      iconSrc:'https://threedio-cdn.icons8.com/an5rAAyZeUgtqe3VJnqwOTlcyP90aFALCSGKs9VczWw/rs:fit:1024:1024/czM6Ly90aHJlZWRp/by1wcm9kL3ByZXZp/ZXdzLzU2Mi9kNzk3/NzU4ZS0xYjc2LTRm/YmQtOGRiNy0zMTRl/MDQ2NWVmMWUucG5n.png',
      title: "DashBoard",
      link:'/admin/dashboard'
    }
  ];

  const { isAuthenticated,user, dispatch } = useAuth();

  const [menu, setmenu] = useState(false);
  const {userCart,userWishlist} = useCart()

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
            src="https://www.pngitem.com/pimgs/b/105-1055966_google-search-logos-ecommerce-logo-logo-google-a.png"
            alt=""
          />
          <h2>SnapStore</h2>
        </div>

        {/* hamberger Buttons |>> */}

        <div className="useractions">

        <form 
        className="searchbarPC"

        onSubmit={(e) =>{
          e.preventDefault;search.trim() !== '' ? navigate(`/products/search/${search}`) && setsearch(''): null}
          } action="">
            <input value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search a product!" type="text" />
            <button type="submit"><i className="ri-search-line"></i></button>
          </form>

          {!menu && (
            <i  onClick={(() => {
                  setmenu(true);
                })} className="ri-menu-fill"></i>
          )}


          {menu && (
            <i onClick={(() => setmenu(false))} className="ri-close-fill"></i>
          )}
        </div>
      </header>

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
            <button type="submit"><i className="ri-search-line"></i></button>
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

          {/* <br />
          <h2>{isAuthenticated ? `WELCOME - ${user.name}` : 'Hey User! Please Login To Continue.'}</h2>
          <br /> */}

          <br />
          
          
          {isAuthenticated && <div className="useroptions">
          {optionsData.map((option, index) => (
           option.title == 'DashBoard' && user.role != 'admin' ? null : 
        <motion.div onClick={() => {navigate(`${option.link}`);setmenu(false)}} initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{delay:0.02*index,duration:.05*index}} key={index} className="option">
          <img src={option.iconSrc} alt="" />
          <h1>{option.title}</h1>
        </motion.div>
      ))}

            
          </div>}
        </motion.div>
      )}

      <div className="useractionsphone">
      <i onClick={(() => navigate('/cart'))} className="ri-shopping-cart-2-line"><div className="count">{userCart?.length}</div></i>
        <i onClick={(() => navigate('/wishlist') )} className="ri-heart-3-line"><div className="count">{userWishlist?.length}</div></i>
        <i onClick={(() => user ? navigate('/profile') : navigate('/login') )} className="ri-user-fill"></i>
        <i className="ri-store-3-line"></i>  
      </div>

    </>
  );
}

export default Header;
