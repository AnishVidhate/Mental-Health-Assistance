import React from "react";
import config from "./config";
const RazorpayButton1 = ({ orderId, amount, userId }) => {

  const URL=config.BaseURL;
  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_rZfdStCvfRhsxH", // Replace with your Razorpay Key
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      name: "MindCare",
      description: "Invest in yourself today!",
      image: "https://your-logo-url.com/logo.png", // Optional
      order_id: orderId, //  Attach orderId from backend response

      handler: async function (response) {
        

        //  Ensure all required fields are received
        if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
          alert("Payment verification failed! Required details are missing.");
          return;
        }

        //  Call Verify API after payment is successful
        try {
          const verifyResponse = await fetch(`${URL}/Payment/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: response.razorpay_order_id, //  Fix: Use correct Order ID
              paymentId: response.razorpay_payment_id, //  Fix: Use correct Payment ID
              signature: response.razorpay_signature, //  Fix: Use correct Signature
              userId: userId, //  Include userId for tracking
            }),
          });

          const verifyResult = await verifyResponse.json();
          

          if (verifyResponse.ok) {
            alert("Payment Verified Successfully!");
          } else {
            alert("Payment Verification Failed!");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          alert("Error verifying payment.");
        }
      },

      prefill: {
        name: "John Doe", // Replace with user's name dynamically
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <button className="btn btn-danger mt-2" onClick={handlePayment}>
      Buy Subscription
    </button>
  );
};

export default RazorpayButton1;
