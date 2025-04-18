import { useState, useRef } from "react";
import { useAppContext } from "../utils/context";
import { useNavigate } from "react-router-dom";

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

function randomID() {
  return (
    "ESS" +
    String(Date.now()).slice(-6) +
    Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0")
  );
}

const Checkout = () => {
  const { cartItems, cartSubtotal, user, isAuthenticated, clearCart } =
    useAppContext();
  const [placedOrder, setPlacedOrder] = useState(null);
  const formRef = useRef();
  const navigate = useNavigate();

  // Prefill if logged in
  const userPrefill = user
    ? {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
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

  if (cartItems.length === 0 && !placedOrder) {
    return (
      <div className="pt-28 pb-20 min-h-[50vh] text-center">
        <h2 className="text-2xl mb-3">Your cart is empty.</h2>
        <button className="btn-primary" onClick={() => navigate("/shop")}>
          Back to Shop
        </button>
      </div>
    );
  }

  // Input handler
  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Basic front-end validation
  function validate(fields) {
    let errs = {};
    if (!fields.name || fields.name.length < 2) errs.name = "Enter your name";
    if (!fields.email || !fields.email.includes("@"))
      errs.email = "Enter valid email";
    if (!fields.phone || fields.phone.length < 10) errs.phone = "Enter phone";
    if (!fields.address || fields.address.length < 4)
      errs.address = "Enter full address";
    if (!fields.pincode || fields.pincode.length !== 6)
      errs.pincode = "Enter valid 6 digit pincode";
    if (!fields.city) errs.city = "Enter city";
    if (!fields.state) errs.state = "Select state";
    return errs;
  }

  // Place order handler
  function handleOrder(e) {
    e.preventDefault();
    const valErrors = validate(form);
    setErrors(valErrors);
    if (Object.keys(valErrors).length > 0) return;

    // Prepare local order for future Shiprocket API
    const orderID = randomID();
    const order = {
      id: orderID,
      status: "placed",
      placedAt: new Date().toISOString(),
      customer: {
        ...form,
      },
      items: cartItems,
      total: cartSubtotal,
    };
    // Save locally
    const prevOrders = JSON.parse(
      localStorage.getItem("essmey_orders") || "[]"
    );
    localStorage.setItem(
      "essmey_orders",
      JSON.stringify([order, ...prevOrders])
    );
    setPlacedOrder(order);
    clearCart();
  }

  if (placedOrder) {
    return (
      <div className="pt-28 pb-20 min-h-[60vh] flex flex-col items-center">
        <h2 className="text-3xl font-serif font-bold mb-4">
          Thank You for Your Order!
        </h2>
        <p className="mb-2">
          Order ID:{" "}
          <span className="font-mono text-blue-700">{placedOrder.id}</span>
        </p>
        <p className="mb-6">
          You'll receive order updates via email/SMS (demo only). For real
          shipments, Shiprocket integration goes here!
        </p>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-[70vh]">
      <div className="container-custom grid gap-12 md:grid-cols-3">
        {/* Left: Shipping form */}
        <form
          ref={formRef}
          className="md:col-span-2 bg-white border rounded-lg shadow p-8"
          onSubmit={handleOrder}
        >
          <h1 className="text-2xl font-serif font-bold mb-4">
            Shipping Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="font-medium">Name*</label>
              <input
                name="name"
                value={form.name}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1"
                required
              />
              {errors.name && (
                <div className="text-red-500 text-xs mt-1">{errors.name}</div>
              )}
            </div>
            <div>
              <label className="font-medium">Email*</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1"
                required
              />
              {errors.email && (
                <div className="text-red-500 text-xs mt-1">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="font-medium">Phone*</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1"
                required
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
                className="w-full border px-3 py-2 rounded mt-1"
                required
                maxLength={6}
                minLength={6}
              />
              {errors.pincode && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.pincode}
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="font-medium">Address*</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleInput}
              className="w-full border px-3 py-2 rounded mt-1"
              required
            />
            {errors.address && (
              <div className="text-red-500 text-xs mt-1">{errors.address}</div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="font-medium">City*</label>
              <input
                name="city"
                value={form.city}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1"
                required
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
                className="w-full border px-3 py-2 rounded mt-1"
                required
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
          </div>
          <div className="mb-10">
            <label className="font-medium">Order Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleInput}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="Anything extra for your order? (optional)"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Place Order
          </button>
        </form>
        {/* Right: Cart summary */}
        <div className="bg-white border rounded-lg shadow p-8">
          <h2 className="text-lg font-serif font-semibold mb-5">Your Order</h2>

          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-16 object-cover rounded border"
                />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-neutral-400">
                    x{item.quantity} &times; ₹{item.price}
                  </div>
                </div>
                <div className="font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold border-t pt-4 mt-6 mb-2">
            <span>Total</span>
            <span>₹{cartSubtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
