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

  const { dispatch: cartdispatch, userOrders } = useCart();

  console.log(userOrders)

  const [loader, setloader] = useState(false);

  window.document.title = pathname.replace(/\/|\-/g, " ");
  if (pathname == "/") {
    window.document.title = "Home";
  }

  const getUser = async (token) => {
    setloader(true);

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

    return data;
  };

  //fetching the users wishlist and cart items on app load --------------------------------

  const getUsersOrders = async () => {

    const data = await getOrders();

    if (data.success) {
      cartdispatch({ type: "SETORDERS", payload: data.orders });
    }


  }

  const getWishlist = async () => {
    try {
      const wishlist = await GetWishlistItems();
      if (wishlist.success) {
        cartdispatch({ type: "ADDTOWISHLIST", payload: wishlist.wishlist });
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const Cart = async () => {
    const cart = await getCart();
    if (!cart.success) {
      console.error(cart.message);
    }
    if (cart.success) {
      cartdispatch({ type: "ADDTOCART", payload: cart.cart });
    }
  };

  useEffect(() => {

    

    if (!user || pathname == '/profile') {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        return;
      }

    const userData = async () => {
      {
        if (token) {
          setloader(true);

          const data = await getUser(token);

          if (!data) {
            localStorage.removeItem("auth_token");
            dispatch({ type: "LOGOUT" });
            setloader(false);
          }

          if (data.success) {
            dispatch({
              type: "LOGIN",
              payload: { ...data.user, token: token },
            });

            await getWishlist();
            await Cart();
            await getUsersOrders();
            setloader(false);
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
      {!loader ? (
        <Outlet />
      ) : (
        <div className="loaderwrapper">
          <div className="loader"></div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
