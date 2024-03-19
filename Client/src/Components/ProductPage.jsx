import React, { useEffect, useState } from "react";
import { AddToWishlist, getProduct } from "./ProductHandlers/ProductHandler";
import { useParams, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../authContext/AuthContext";
import { AddToCart } from "./ProductHandlers/ProductHandler";
import { useCart } from "../cartContext/CartContext";
import { PaymentHandler } from "../PaymentHandler/PaymentHandler";

function ProductPage() {
  const { productid } = useParams(null);

  const [Product, setproduct] = useState(null);

  const { userWishlist, userCart } = useCart();

  const { user } = useAuth();

  const [quantity, setquantity] = useState(1);

  const [existingInWishlist, setExistingInWishlist] = useState(false);

  const [existingInCart, setExistingInCart] = useState(false);

  const Getproduct = async () => {
    const product = await getProduct(productid);
    if (product.success) {
      setproduct(product.product);
    }
    if (product.error) {
      toast.error(product.error);
    }
  };

  const AddToWishlistHandler = async () => {
    const response = await AddToWishlist(productid);

    console.log(response);

    if (response.success) {
      toast.success(response.message);
      setExistingInWishlist(true);
    }

    if (!response.success) {
      toast.error(response.message);
      setExistingInWishlist(false);
    }
  };

  const addToCartHandler = async () => {
    const response = await AddToCart(productid, quantity, user);

    console.log(response);

    if (!response.success) {
      toast.error(response.message);
      setExistingInCart(false);
    }
    if (response.success) {
      toast.success(response.message);
      setExistingInCart(true);
    }
  };

  //check if product is already added in users cart or wishlist

  useEffect(() => {
    Getproduct();
    window.scrollTo({ top: 0, behavior: "smooth" });

    const checkExistingWishlist = userWishlist?.some(
      (item) => item.product._id == productid
    );

    const checkExistingCart = userCart?.some(
      (item) => item.product._id == productid
    );

    console.log(checkExistingCart, checkExistingWishlist);

    if (checkExistingWishlist == true) {
      setExistingInWishlist(true);
    }

    if (checkExistingCart == true) {
      setExistingInCart(true);
    }
  }, [productid]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        style={{
          backgroundImage: `url('${Product?.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="product_page"
      >
        <div className="cover">
          {Product && (
            <>
              <div className="product_image">
                <img src={Product.image} alt="Product Image" />
                <i
                  onClick={()=>existingInWishlist ? toast.error('Already In Wishlist!') : AddToWishlistHandler()}
                  className={
                    existingInWishlist ? "ri-heart-fill" : "ri-heart-line"
                  }
                ></i>
              </div>
              <div className="product_details">
                <h1>{Product.name}</h1>
                <p>{Product.description}</p>
                <div className="star-rating">
                  {Product.productReviews.length != 0 &&
                    Array.from({ length: 5 }).map((_, index) =>
                      index <
                      Product.totalRatings / Product.productReviews.length ? (
                        <span key={index} style={{ color: "gold" }}>
                          ★
                        </span>
                      ) : (
                        <span key={index} style={{ color: "grey" }}>
                          ★
                        </span>
                      )
                    )}
                  &nbsp;{" "}
                  {Product.productReviews.length == 0 ? (
                    <p> No ratings Yet! </p>
                  ) : (
                    <p> by {Product.productReviews.length} users</p>
                  )}
                </div>

                <p>{Product.stock} Units left</p>
                <p>
                  <Link to={`/products/category/${Product.category}`}>
                    {Product.category}
                  </Link>
                </p>

                <h2>
                  {" "}
                  ₹{Product.price}{" "}
                  <del style={{ opacity: 0.8 }}>₹{Product.actualprize}</del>{" "}
                  <b>50% Off</b>
                </h2>

                <div className="quantity">
                  <button
                    disabled={quantity == 1}
                    onClick={() =>
                      quantity > 1 ? setquantity(quantity - 1) : null
                    }
                  >
                    -
                  </button>

                  <input
                    readOnly
                    type="text"
                    value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      quantity < 10
                        ? setquantity(quantity + 1)
                        : toast.error("Only 10 products at a time!")
                    }
                  >
                    +
                  </button>
                </div>
                <div className="buying_options">
                  <button onClick={()=>existingInCart ? toast.error('Already In Cart') : addToCartHandler()}>
                    {existingInCart ? "Added!" : "Add To Cart"}
                  </button>
                  <button
                    onClick={() =>
                      PaymentHandler({ product: Product, user, quantity })
                    }
                  >
                    Buy Now
                  </button>
                </div>

                <div className="product_reviews">
                  <h2>Product Reviews</h2>

                  {Product.productReviews.length > 0 ? (
                    Product.productReviews.map((review, index) => (
                      <div className="review" key={index}>
                        <h4>user : {review.user}</h4>
                        <div className="star-rating">
                          {Array.from({ length: 5 }).map((_, index) =>
                            index < review.rating ? (
                              <span key={index} style={{ color: "gold" }}>
                                ★
                              </span>
                            ) : (
                              <span key={index} style={{ color: "grey" }}>
                                ★
                              </span>
                            )
                          )}
                        </div>
                        <p>{review.text}</p>
                      </div>
                    ))
                  ) : (
                    <h3> No Reviews for This Product </h3>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
