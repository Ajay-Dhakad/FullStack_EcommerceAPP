import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, Link ,useLocation} from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../authContext/AuthContext.jsx";
import { useCart } from "../cartContext/CartContext.jsx";

function Header() {
  const { isAuthenticated, user, dispatch } = useAuth();
  const { userCart, userWishlist } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isPC = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      navigate(`/products/search/${search}`);
      setSearch('');
    }
  };

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [pathname]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/products" },
    { name: "Categories", link: "/categories" },
  ];

  const optionsData =useMemo(() =>  [
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
      link: '/cart'
    },
    {
      iconSrc:
        "https://threedio-cdn.icons8.com/wSm9abwAUOMFOoG41Le1hMW2PYS_auKnzZd29SE5AzI/rs:fit:256:256/czM6Ly90aHJlZWRp/by1wcm9kL3ByZXZp/ZXdzLzg1Mi9hMzRj/MWY1Ni1kOTA1LTQ5/NzUtYjNkNC1jNjRk/YTRmNWU5ODcucG5n.png",
      title: "WishList",
      link: '/wishlist'
    },
    {
      iconSrc:
        "https://threedio-cdn.icons8.com/L3r1XjtbhA5IbNmmonDtRL4K24WexXp2zVc4t4fap64/rs:fit:256:256/czM6Ly90aHJlZWRp/by1wcm9kL3ByZXZp/ZXdzLzEyNS80ZTVj/NjJlMy1lNTgyLTRl/NDAtYjFmMi1mNTZh/ZjljNzY2M2QucG5n.png",
      title: "MyOrders",
      link: '/orders'
    },
    {
      iconSrc: 'https://threedio-cdn.icons8.com/an5rAAyZeUgtqe3VJnqwOTlcyP90aFALCSGKs9VczWw/rs:fit:1024:1024/czM6Ly90aHJlZWRp/by1wcm9kL3ByZXZp/ZXdzLzU2Mi9kNzk3/NzU4ZS0xYjc2LTRm/YmQtOGRiNy0zMTRl/MDQ2NWVmMWUucG5n.png',
      title: "DashBoard",
      link: '/admin/dashboard'
    }
  ],[])

  return (
    <>
      <header style={{ top: 0, position: "fixed" }}>
        <div className="sitelogo">
          <img
            src="https://s3.amazonaws.com/ionic-marketplace/ecommerce-smart-shop-theme/icon.png"
            alt=""
          />
          <h2><Link to='/'>SnapStore</Link></h2>
        </div>
        <div className="useractions">
          <form className="searchbarPC" onSubmit={handleSearchSubmit} action="">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a product!" type="text" />
            <button type="submit"><i className="ri-search-line"></i></button>
          </form>
          {!menuOpen ? (
            <i onClick={() => setMenuOpen(true)} className="ri-menu-fill"></i>
          ) : (
            <i onClick={() => setMenuOpen(false)} className="ri-close-fill"></i>
          )}
        </div>
      </header>

      {menuOpen && (
        <div className="hamberger-menu">
          <form onSubmit={handleSearchSubmit} action="">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a product!" type="text" />
            <button type="submit"><i className="ri-search-line"></i></button>
          </form>
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  className={({ isActive }) => isActive ? "navactive" : ""}
                  to={item.link}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <button
              style={{ backgroundColor: isAuthenticated ? "red" : "green" }}
              onClick={() => isAuthenticated ? dispatch({ type: "LOGOUT" }) : navigate("/login")}
            >
              {!isAuthenticated ? "Login/Register" : "LogOut"}
            </button>
          </ul>

          <br />

          {isAuthenticated && (
            <div className="useroptions">
              {optionsData.map((option, index) => (
                option.title === 'DashBoard' && user.role !== 'admin' ? null :
                  <motion.div
                    onClick={() => { navigate(option.link); setMenuOpen(false) }}
                    initial={isPC && { opacity: 0, scale: 0 }}
                    animate={isPC && { opacity: 1, scale: 1 }}
                    transition={isPC && { delay: 0.02 * index, duration: 0.05 * index }}
                    key={index}
                    className="option"
                  >
                    <img src={option.iconSrc} alt="" />
                    <h1>{option.title}</h1>
                  </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="useractionsphone">
        <i onClick={() => navigate('/cart')} className="ri-shopping-cart-2-line"><div className="count">{userCart?.length}</div></i>
        <i onClick={() => navigate('/wishlist')} className="ri-heart-3-line"><div className="count">{userWishlist?.length}</div></i>
        <i onClick={() => user ? navigate('/profile') : navigate('/login')} className="ri-user-fill"></i>
        <i className="ri-store-3-line"></i>
      </div>
    </>
  );
}

export default Header;
