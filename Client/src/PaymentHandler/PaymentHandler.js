
export const PaymentHandler = async ({ product, quantity, user,handlePaymentStatus}) => {

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

    const receipt = await data.json()

   if (!receipt.success) {
    handlePaymentStatus({status:false})
   }

   if (receipt.success) {
    handlePaymentStatus({status:true,order:receipt.order})
   }


    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phoneNumber,
    },
    notes: {
      address: user.address,
    },
    theme: {
      color: "#005BF2",
    },
  };

  const razor = new window.Razorpay(options);

  razor.open();
  
};
