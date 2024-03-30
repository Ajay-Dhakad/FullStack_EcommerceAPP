import React, { useEffect, useState } from "react";
import {
  AddToWishlist,
  deleteProductReview,
  getProduct,
  ProductReview,
} from "./ProductHandlers/ProductHandler";
import { useParams, Link,useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../authContext/AuthContext";
import { AddToCart } from "./ProductHandlers/ProductHandler";
import { useCart } from "../cartContext/CartContext";
import OrderConfirmation from "./OrderConfirmation";
import formatPrice from "./Utils/formatPrice";

function ProductPage() {
  const { productid } = useParams(null);

  const navigate = useNavigate()

  const [Product, setproduct] = useState(null);

  const { userWishlist, userCart, userOrders , dispatch } = useCart();

  console.log(Product);

  const [Buy, setBuying] = useState(false);

  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const { user } = useAuth();

  const [quantity, setquantity] = useState(1);

  const [existingInWishlist, setExistingInWishlist] = useState(false);

  const [existingInCart, setExistingInCart] = useState(false);

  const [existingOrder, setExistingInOrder] = useState(false);

  const [review, setReview] = useState({});

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
    if (!user){
      toast.error('Please login to add to Wishlist');
      return
    }
    const response = await AddToWishlist(productid);

    if (response.success) {
      toast.success(response.message);
      setExistingInWishlist(true);
      dispatch({type:'ADDWISHLISTITEM',payload:response.newWishlistItem})

    }

    if (!response.success) {
      toast.error(response.message);
      setExistingInWishlist(false);
    }
  };

  const addToCartHandler = async () => {

    if (!user){
      toast.error('Please login to add to cart')
      return
    }

    const response = await AddToCart(productid, quantity, user);

    console.log(response);

    if (!response.success) {
      toast.error(response.message);
      setExistingInCart(false);
    }
    if (response.success) {
      toast.success(response.message);
      setExistingInCart(true);
      dispatch({type:'ADDITEMTOCART',payload:response.cart})
    }
  };

  const reviewHandler = async (e) => {
    e.preventDefault();

    if (review.text != "" && review.rating > 0 && review.rating <= 5) {
      const response = await ProductReview(productid, review);
      console.log(response);
      if (response.success) {
        toast.success(response.message);
        setproduct({
          ...Product,
          productReviews: response.product.productReviews,
        });
        setIsSubmittingReview(false);
      }
      if (!response.success) {
        console.log(response);
        toast.error(response.error);
        setIsSubmittingReview(false);
      }
    }

    setIsSubmittingReview(false);
    setReview({ text: "", rating: "" });
  };

  const deleteReviewHandler = async (reviewid) => {
    const response = await deleteProductReview(productid, reviewid);
    console.log(response);
    if (response.success) {
      toast.success(response.message);
      setproduct({
        ...Product,
        productReviews: response.product.productReviews,
      });
    }
    if (!response.success) {
      toast.error(response.message);
    }
  };

  //check if product is already added in users cart or wishlist

  useEffect(() => {
    Getproduct();
    window.scrollTo({ top: 0, behavior: "smooth" });

    const checkExistingWishlist = userWishlist.length > 0 ? userWishlist.some(
      (item) => item?.product?._id == productid
    ) : false;

    const checkExistingCart = userCart.length > 0 ? userCart.some(
      (item) => item?.product?._id == productid
    ): false;

    const checkExistingOrder = userOrders.length > 0 ? userOrders.some(
      (item) => item?.product?._id == productid && item.orderStatus == "Delivered"
    ) : false; // TODO : remove pending order and add Delivered

    if (checkExistingWishlist == true) {
      setExistingInWishlist(true);
    }

    if (checkExistingCart == true) {
      setExistingInCart(true);
    }
    if (checkExistingOrder == true) {
      setExistingInOrder(true);
    } else {
      setExistingInOrder(false);
    }
  }, [productid]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {Buy && (
        <OrderConfirmation
          setbuying={setBuying}
          user={user}
          Product={Product}
          quantity={quantity}
        />
      )}
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
          {  Product != null && (
            <>
              <div className="product_image">
                <img src={Product.image} alt="Product Image" />
                <i
                  onClick={() =>
                    existingInWishlist
                      ? toast.error("Already In Wishlist!")
                      : AddToWishlistHandler()
                  }
                  className={
                    existingInWishlist ? "ri-heart-fill" : "ri-heart-line"
                  }
                ></i>
              </div>
              <div className="product_details">
                <h1 className="productsName">{Product.name.slice(0,80)}</h1>
                <p>{Product.description.slice(0,150)}</p>
                <div className="star-rating">
                  {Product?.productReviews.length != 0 &&
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
                  ₹{formatPrice(Product.price)}{" "}
                  <del style={{ opacity: 0.8 }}>₹{formatPrice(Product.actualprize)}</del>{" "}
                  <b>{parseInt(((Product.actualprize - Product.price) /
                    Product.actualprize) *
                    100)+'% Off'}</b>
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
                  <button
                    onClick={() =>
                      existingInCart
                        ? toast.error("Already In Cart")
                        : addToCartHandler()
                    }
                  >
                    {existingInCart ? "Added!" : "Add To Cart"}
                  </button>
                  <button onClick={() =>user ? setBuying(true) : navigate('/login')}>Buy Now</button>
                </div>

                <div className="product_reviews">
                  <h2>Product Reviews</h2>

                  {existingOrder && (
                    <div className="addReview_btn">
                      {!isSubmittingReview && (
                        <button onClick={() => setIsSubmittingReview(true)}>
                          Submit Review
                        </button>
                      )}
                      {isSubmittingReview && (
                        <form onSubmit={reviewHandler}>
                          <p>Leave your review:</p>
                          <select
                            onChange={(e) =>
                              setReview({ ...review, rating: e.target.value })
                            }
                            value={review.rating}
                            name="rating"
                            id=""
                            required
                          >
                            <option value="">Select Ratings</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="1">⭐</option>
                          </select>
                          <input
                            maxLength={50}
                            placeholder="Enter Your Review"
                            name="message"
                            value={review.text}
                            onChange={(e) =>
                              setReview({ ...review, text: e.target.value })
                            }
                            type="text"
                            required
                          />
                          <button>Submit Review</button>
                        </form>
                      )}
                    </div>
                  )}

                  {Product?.productReviews?.length > 0 ? (
                    Product.productReviews.map((review, index) => (
                      <div className="review" key={index}>
                        <h4>
                          user :{" "}
                          {review.user == user?._id
                            ? user?.name + " (Me)"
                            : review.name || review.user}
                        </h4>
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
                        {review.user == user?._id && (
                          <button
                            onClick={() => deleteReviewHandler(review._id)}
                            className="delete_review"
                          >
                            x
                          </button>
                        )}
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
