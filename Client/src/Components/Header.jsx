import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {useLocation} from 'react-router-dom'
import { useAuth } from "../authContext/AuthContext.jsx";
function Header() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Categories", link: "/categories" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const { isAuthenticated, dispatch } = useAuth();
  const [menu, setmenu] = useState(false);
  const navigate = useNavigate();
  const headerstyles = { top: 0, position: "fixed" };
  const {pathname} = useLocation()


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
          <form action="">
            <input placeholder="Search a product!" type="text" />
            <button type="submit">Go!</button>
          </form>

          <ul>
            {navItems.map((item, index) => {
              return (
                <motion.li
                  initial={{ opacity: 0, translateX: -10 }}
                  whileInView={{ opacity: 1, translateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
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
                </motion.li>
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
          <hr />

          <div className="usersections"></div>
        </motion.div>
      )}
    </>
  );
}

export default Header;
