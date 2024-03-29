import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useAuth } from "./authContext/AuthContext";
import {
  GetWishlistItems,
  getCart,
  getOrders,
} from "./Components/ProductHandlers/ProductHandler";
import { useCart } from "./cartContext/CartContext";

function App() {
  const { pathname} = useLocation();

  const { user, dispatch } = useAuth();

  const { dispatch: cartdispatch} = useCart();

  const [loader, setloader] = useState(true);


  const getUser = async (token) => {
    
    const response = await fetch(
      `${import.meta.env.VITE_API_URI}/api/getuser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!data.success) {
      return false;
    }
    if (data.success) {
      setloader(false)
    }

    return data;
  };

  //fetching the users wishlist and cart items on app load --------------------------------

  const getUsersOrders = async () => {

    const data = await getOrders();

    if (data.success) {
      cartdispatch({ type: "SETORDERS", payload: data.orders });
    }
    else{
      return
    }


  }

  const getWishlist = async () => {
    try {
      const wishlist = await GetWishlistItems();
      if (wishlist.success) {
        cartdispatch({ type: "ADDTOWISHLIST", payload: wishlist.wishlist });
      }else{
        cartdispatch({ type: "ADDTOWISHLIST", payload: [] })
        return
      }
    } catch (e) {
      console.error(e.message);
      return
    }
  };

  const Cart = async () => {
    const cart = await getCart();
    if (!cart.success) {
      console.error(cart.message);
      return
    }
    if (cart.success) {
      cartdispatch({ type: "ADDTOCART", payload: cart.cart });
    }
  };

  useEffect(() => {

    if (user){
      setloader(false)
      console.log("Loading")
    }

  },[user])

  useEffect(() => {

    if (!user || pathname == '/profile') {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setloader(false);
        return;

      }

    const userData = async () => {
      {
        if (token) {
          const data = await getUser(token);

          if (!data) {
            localStorage.removeItem("auth_token");
            dispatch({ type: "LOGOUT" });
            setloader(false);
            return;
          }

          if (data.success) {
            dispatch({
              type: "LOGIN",
              payload: { ...data.user, token: token },

            });

            await getWishlist();
            await Cart();
            await getUsersOrders();
          }
        }
      }
    };
      userData();
    }

  }, [pathname]);

  return (
    <>
      <Header />
      {loader  ? 
       <div className="loaderwrapper">
       <div className="loader"></div>
     </div>
        
       : 
       <Outlet />
       
      }
      <Footer />
    </>
  );
}

export default App;
