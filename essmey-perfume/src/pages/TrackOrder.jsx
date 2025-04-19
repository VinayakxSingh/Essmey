import { useState } from "react";

const TrackOrder = () => {
  const [formData, setFormData] = useState({
    orderNumber: "",
    email: "",
  });
  const [trackingStatus, setTrackingStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // In a real application, you would make an API call to check the order status
    // For this example, we'll simulate a response after a brief delay
    setTimeout(() => {
      // Mock response - in a real app this would come from your backend
      if (
        formData.orderNumber === "12345" &&
        formData.email === "test@example.com"
      ) {
        setTrackingStatus({
          found: true,
          orderNumber: formData.orderNumber,
          status: "Shipped",
          date: "April 15, 2025",
          carrier: "Express Delivery",
          trackingNumber: "EX123456789IN",
          estimatedDelivery: "April 18, 2025",
          items: [
            { name: "Essmey Signature Perfume", quantity: 1, price: "$85.00" },
            { name: "Essmey Summer Collection", quantity: 1, price: "$75.00" },
          ],
          timeline: [
            {
              date: "April 12, 2025",
              status: "Order Placed",
              details: "Your order has been received and is being processed.",
            },
            {
              date: "April 13, 2025",
              status: "Payment Confirmed",
              details: "Your payment has been successfully processed.",
            },
            {
              date: "April 14, 2025",
              status: "Order Processed",
              details: "Your order has been prepared and packaged.",
            },
            {
              date: "April 15, 2025",
              status: "Shipped",
              details: "Your order has been handed over to the courier.",
            },
          ],
        });
      } else {
        setTrackingStatus({
          found: false,
          message:
            "We couldn't find any order matching these details. Please check your order number and email address and try again.",
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-[#1a1208] text-white py-20 mb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/essmeybg.jpg')] bg-cover bg-center"></div>
        <div className="container-custom text-center max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-amber">
            Track Your Order
          </h1>
          <p className="text-xl font-light">
            Stay updated on the status of your Essmey perfume order
          </p>
          <div className="w-24 h-1 bg-amber mx-auto mt-8"></div>
        </div>
      </section>

      <div className="container-custom max-w-4xl mx-auto">
        {!trackingStatus && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-2xl font-serif font-medium mb-6 text-amber">
              Enter Your Order Details
            </h2>
            <div className="w-16 h-1 bg-amber mb-8"></div>

            <p className="mb-6 text-gray-700">
              Please enter your order number and the email address used for the
              purchase to track your order status.
            </p>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="mb-6">
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  Order Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                  placeholder="e.g., ES12345"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-colors"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can find your order number in your order confirmation
                  email.
                </p>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., your@email.com"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full btn-primary bg-amber hover:bg-amber/90 flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Tracking Order...
                  </>
                ) : (
                  "Track Order"
                )}
              </button>
            </form>

            <div className="mt-12 border-t border-gray-200 pt-8">
              <h3 className="text-xl font-medium mb-4">Having Trouble?</h3>
              <p className="text-gray-700 mb-4">
                If you're having difficulty tracking your order or have any
                questions, our customer service team is here to help.
              </p>
              <a href="/contact" className="text-amber hover:underline">
                Contact Our Customer Service Team
              </a>
            </div>
          </div>
        )}

        {trackingStatus && (
          <div className="mb-16">
            {trackingStatus.found ? (
              <div>
                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-serif font-medium text-amber">
                        Order #{trackingStatus.orderNumber}
                      </h2>
                      <p className="text-gray-500">
                        Placed on {trackingStatus.date}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {trackingStatus.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">
                          Shipping Details
                        </h3>
                        <p className="text-gray-700 mb-1">
                          <strong>Carrier:</strong> {trackingStatus.carrier}
                        </p>
                        <p className="text-gray-700 mb-1">
                          <strong>Tracking Number:</strong>{" "}
                          {trackingStatus.trackingNumber}
                        </p>
                        <p className="text-gray-700">
                          <strong>Estimated Delivery:</strong>{" "}
                          {trackingStatus.estimatedDelivery}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">
                          Order Items
                        </h3>
                        <div className="space-y-2">
                          {trackingStatus.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <p className="text-gray-700">
                                {item.quantity}x {item.name}
                              </p>
                              <p className="text-gray-700">{item.price}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h3 className="text-xl font-serif font-medium mb-6 text-amber">
                    Tracking Timeline
                  </h3>
                  <div className="w-16 h-1 bg-amber mb-8"></div>

                  <div className="relative">
                    {trackingStatus.timeline.map((event, index) => (
                      <div key={index} className="mb-8 relative">
                        <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div
                              className={`rounded-full h-8 w-8 flex items-center justify-center ${index === 0 ? "bg-amber text-white" : "bg-amber/10 text-amber"}`}
                            >
                              {index + 1}
                            </div>
                            {index < trackingStatus.timeline.length - 1 && (
                              <div className="h-full w-0.5 bg-amber/20 my-2"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-lg font-medium">
                              {event.status}
                            </h4>
                            <p className="text-gray-500 text-sm mb-2">
                              {event.date}
                            </p>
                            <p className="text-gray-700">{event.details}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setTrackingStatus(null)}
                    className="btn-secondary border-amber text-amber hover:bg-amber/10"
                  >
                    Track Another Order
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-serif font-medium mb-4">
                  Order Not Found
                </h2>
                <p className="text-gray-700 mb-8 max-w-md mx-auto">
                  {trackingStatus.message}
                </p>
                <button
                  onClick={() => setTrackingStatus(null)}
                  className="btn-primary bg-amber hover:bg-amber/90"
                >
                  Try Again
                </button>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Need Help?</h3>
                  <p className="text-gray-700 mb-4">
                    If you're having trouble finding your order, our customer
                    service team is here to assist you.
                  </p>
                  <a href="/contact" className="text-amber hover:underline">
                    Contact Customer Service
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <section className="bg-sand p-8 rounded-lg text-center mb-16">
          <h2 className="text-2xl font-serif font-medium mb-4">
            Need Help With Your Order?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            If you have any questions about your order or delivery, our customer
            service team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="btn-primary bg-amber hover:bg-amber/90"
            >
              Contact Us
            </a>
            <a
              href="/faq"
              className="btn-secondary border-amber text-amber hover:bg-amber/10"
            >
              View FAQs
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TrackOrder;
