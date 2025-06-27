import React, { useEffect } from "react";
import axios from "axios";
import config from "../Config/Config";

const RazorpayButton = () => {
  const URL = config.BaseURL;

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      
      const storedUser = localStorage.getItem('user');
     

      const userId = JSON.parse(storedUser).id;
      const paymentAmount = 5000; // 
  
      const orderResponse = await axios.post(`${URL}/payment/createorder`, {
        userId: userId,
        amount: paymentAmount, // 
        currency: "INR",
      });
  
      if (!orderResponse.data.orderId) {
        throw new Error("Order ID missing in response");
      }
  
      const { orderId } = orderResponse.data;
  
      
      const options = {
        key: "rzp_test_rZfdStCvfRhsxH",
        name: "Mind Care",
        description: "Test Transaction",
        order_id: orderId,
        amount: paymentAmount * 100, 
        handler: async (response) => {
          try {
            const paymentData = {
              userId: userId,  
              amount: paymentAmount,  
              paymentDate: new Date().toISOString(),  
              referenceId: response.razorpay_payment_id,  
              orderId: response.razorpay_order_id,
            };
            
            await axios.post(`${URL}/payment/savepayment`, paymentData); 
            await axios.post(`${URL}/DepositPlans`, paymentData);
            alert('Payment Successful! Details have been saved.');
  
          } catch (error) {
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "1100900009",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp1 = new window.Razorpay(options);
  
      rzp1.on('payment.failed', (response) => {
        alert(`Payment failed: ${response.error.description}`);
      });
  
      rzp1.open();
  
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('Error creating order or fetching user details.');
    }
  };
  

  useEffect(() => {
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js')
      .catch(() => alert("Failed to load Razorpay SDK"));
  }, []);
  
  return (
    <button onClick={handlePayment} style={{ padding: "10px 20px", background: "#008CBA", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
      Pay Now
    </button>
  );
};

export default RazorpayButton;
