import React from "react";

const PaymentButton = () => {
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500 *100 }), // Convert to paise
      });

      const order = await response.json();
      console.log("Order Response:", order);

      if (!order || !order.id) {
        alert("Error creating order");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please check your internet connection.");
        return;
      }

      const options = {
        key: "rzp_test_hum4AjwPDSgi5p", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: "INR",
        name: "Your Book Store",
        description: "Book Purchase Payment",
        order_id: order.id,
        handler: async (response) => {
          console.log("Payment Response:", response);

          const verifyResponse = await fetch("http://localhost:5000/api/payment/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const result = await verifyResponse.json();
          console.log("Verification Response:", result);

          if (result.success) {
            alert("Payment Successful!");
          } else {
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed, please try again.");
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;
