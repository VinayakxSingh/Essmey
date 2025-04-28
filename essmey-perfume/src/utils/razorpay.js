// src/utils/razorpay.js

export const openRazorpay = (orderDetails) => {
  if (process.env.NODE_ENV === "development") {
    // Mock behavior in development environment
    console.log("Mock Razorpay payment:", orderDetails);
    setTimeout(() => {
      alert("Mock payment successful. Order placed.");
      window.location.href = "/thank-you"; // Redirect to thank you page
    }, 1000);
    return;
  }

  if (window.Razorpay) {
    const options = {
      key: process.env.VITE_RAZORPAY_KEY, // Razorpay key
      amount: orderDetails.amount * 100, // amount in paise (multiply by 100)
      currency: "INR",
      name: "Essmey Perfumes",
      description: "Perfume Purchase",
      image: "/logo-dark.png",
      handler: function (response) {
        console.log("Payment successful:", response);
        window.location.href = "/thank-you"; // Redirect to thank you page
      },
      prefill: {
        name: orderDetails.customerName,
        email: orderDetails.customerEmail,
        contact: orderDetails.customerPhone,
      },
      notes: {
        address: orderDetails.customerAddress,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } else {
    console.error("Razorpay SDK not loaded");
  }
};
