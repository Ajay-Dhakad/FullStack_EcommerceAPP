export const PaymentHandler = async ({ product, quantity, user }) => {
  console.log(product);

  const data = await fetch(
    `${import.meta.env.VITE_API_URI}/api/createorder/getkey`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    }
  );

  const { key } = await data.json();

  console.log(key);

  const amountData = await fetch(
    `${import.meta.env.VITE_API_URI}/api/createorder/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({ amount: product.price * quantity }),
    }
  );

  const { order } = await amountData.json();

  console.log(order);

  const options = {
    key: key,
    amount: order.amount,
    currency: order.currency,
    name: "SnapShop",
    description: "Best Deals In Your Hands.",
    image:
      "https://www.pngitem.com/pimgs/b/105-1055966_google-search-logos-ecommerce-logo-logo-google-a.png",
    order_id: order.id,

    handler: async (response) => {
      console.log(response);
      const data = await fetch(
        `${import.meta.env.VITE_API_URI}/api/createorder/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify({
            razorpay_order_id: order.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            product_id: product._id,
            quantity,
            totalPrice: product.price * quantity,
            price: product.price,
            deliveryAddress: user.address,
            paymentStatus: true,
          }),
        }
      );
    },
    prefill: {
      name: "ajay",
      email: "email@email.com",
      contact: "0101010101",
    },
    notes: {
      address: "my address",
    },
    theme: {
      color: "#005BF2",
    },
  };

  const razor = new window.Razorpay(options);

  razor.open();
};
