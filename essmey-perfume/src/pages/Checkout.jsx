import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../utils/context";
import { useNavigate } from "react-router-dom";
import { openRazorpay } from "../utils/razorpay";
import { client } from "../utils/sanity";
import { generateOrderId } from "../utils/orderId";
import { useAuth } from "../utils/AuthContext";
import { useToastContext } from "../utils/ToastContext";

const statesIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Puducherry",
];

const Checkout = () => {
  const {
    cartItems,
    cartSubtotal,
    clearCart,
    error: contextError,
  } = useAppContext();
  const { user, isLoading } = useAuth();
  const { addToast } = useToastContext();
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef();
  const navigate = useNavigate();

  // Handle authentication check and navigation
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", {
        state: {
          from: "/checkout",
          message: "Please login to proceed with checkout",
        },
      });
    }
  }, [user, isLoading, navigate]);

  const userPrefill = user
    ? {
        name: user.displayName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      }
    : {};

  const [form, setForm] = useState({
    name: userPrefill.name || "",
    email: userPrefill.email || "",
    phone: userPrefill.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="pt-28 pb-20 min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-lg">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Show empty cart message if cart is empty and no order is placed
  if (cartItems.length === 0 && !placedOrder) {
    return (
      <div className="pt-28 pb-20 min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-3">Your cart is empty.</h2>
        <button className="btn-primary" onClick={() => navigate("/shop")}>
          Back to Shop
        </button>
      </div>
    );
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "pincode") {
      // Only allow numbers
      if (/[^0-9]/.test(value) && value !== "") return;
    }
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = (fields) => {
    let errs = {};
    if (!fields.name || fields.name.length < 2) errs.name = "Enter your name";
    if (!fields.email || !fields.email.includes("@"))
      errs.email = "Enter valid email";
    if (!fields.phone || fields.phone.length < 10)
      errs.phone = "Enter phone (10+ digits)";
    if (!fields.address || fields.address.length < 4)
      errs.address = "Enter full address";
    if (!fields.pincode || fields.pincode.length !== 6)
      errs.pincode = "Enter valid 6 digit pincode";
    if (!fields.city) errs.city = "Enter city";
    if (!fields.state) errs.state = "Select state";
    return errs;
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate form before proceeding
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      // First create the order in Sanity
      const orderData = {
        _type: "order",
        items: cartItems.map((item) => ({
          _type: "orderItem",
          product: {
            _type: "reference",
            _ref: item._id,
          },
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: cartSubtotal,
        shippingAddress: form,
        paymentMethod: "razorpay",
        status: "pending",
        user: {
          _type: "reference",
          _ref: user.uid,
        },
      };

      const createdOrder = await client.create(orderData);

      // Open Razorpay payment window
      const razorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: cartSubtotal * 100,
        currency: "INR",
        name: "Essmey Perfume",
        description: "Payment for your order",
        order_id: createdOrder._id,
        handler: async function (response) {
          try {
            // Update the order with payment details
            await client
              .patch(createdOrder._id)
              .set({
                status: "paid",
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              })
              .commit();

            clearCart();
            setPlacedOrder(response.razorpay_order_id);
            addToast(
              "Payment successful! Your order has been placed.",
              "success"
            );
            navigate("/thank-you");
          } catch (error) {
            console.error("Error updating order:", error);
            addToast("Error updating order status", "error");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      await openRazorpay(razorpayOptions);
    } catch (error) {
      console.error("Order error:", error);
      setError(error.message || "Something went wrong with the payment");
      addToast(error.message || "Payment failed or was cancelled", "error");
    } finally {
      setLoading(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="pt-28 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
        <p className="mb-6">
          Thank you for your purchase.
          <br />
          <strong>Your Order ID is {placedOrder}.</strong>
          <br />
          <span>
            Use this Order ID to&nbsp;
            <a
              className="text-amber-700 underline hover:text-amber-800 transition-colors"
              href="/track-order"
              onClick={(e) => {
                e.preventDefault();
                navigate("/track-order");
              }}
            >
              track your order
            </a>
            .
          </span>
        </p>
        <button className="btn-primary" onClick={() => navigate("/shop")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-[70vh]">
      <div className="container-custom grid gap-12 md:grid-cols-3">
        <form
          ref={formRef}
          className="md:col-span-2 bg-white border rounded-lg shadow p-8"
          onSubmit={handleOrder}
        >
          <h1 className="text-2xl font-serif font-bold mb-4">
            Shipping Details
          </h1>
          {(error || contextError) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error || contextError}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="font-medium">Name*</label>
              <input
                name="name"
                value={form.name}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                disabled={loading}
              />
              {errors.name && (
                <div className="text-red-500 text-xs mt-1">{errors.name}</div>
              )}
            </div>
            <div>
              <label className="font-medium">Email*</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                disabled={loading}
              />
              {errors.email && (
                <div className="text-red-500 text-xs mt-1">{errors.email}</div>
              )}
            </div>
            <div>
              <label className="font-medium">Phone*</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                disabled={loading}
              />
              {errors.phone && (
                <div className="text-red-500 text-xs mt-1">{errors.phone}</div>
              )}
            </div>
            <div>
              <label className="font-medium">Pincode*</label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                disabled={loading}
              />
              {errors.pincode && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.pincode}
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="font-medium">Address*</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                disabled={loading}
              />
              {errors.address && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.address}
                </div>
              )}
            </div>
            <div>
              <label className="font-medium">City*</label>
              <input
                name="city"
                value={form.city}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                disabled={loading}
              />
              {errors.city && (
                <div className="text-red-500 text-xs mt-1">{errors.city}</div>
              )}
            </div>
            <div>
              <label className="font-medium">State*</label>
              <select
                name="state"
                value={form.state}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                disabled={loading}
              >
                <option value="">Select State</option>
                {statesIndia.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <div className="text-red-500 text-xs mt-1">{errors.state}</div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="font-medium">Notes (Optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={loading}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Place Order"
            )}
          </button>
        </form>
        <div className="bg-white border rounded-lg shadow p-8 h-fit">
          <h2 className="text-xl font-serif font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{cartSubtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
