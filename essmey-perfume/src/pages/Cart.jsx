import { useAppContext } from "../utils/context";
import { Link, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartCount,
    clearCart,
  } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-16 min-h-[50vh]">
      <div className="container-custom">
        <h1 className="text-3xl font-serif font-bold mb-8">Your Cart</h1>
        {cartCount === 0 ? (
          <div className="text-center mt-16">
            <p className="text-xl mb-4">Your cart is empty.</p>
            <Link to="/shop" className="btn-primary">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart items table */}
            <div className="flex-1">
              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full bg-white">
                  <thead>
                    <tr className="text-sm font-semibold uppercase border-b">
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Quantity</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        className="border-b group"
                        key={`${item.id}-${item.selectedSize || ""}`}
                      >
                        <td className="p-3 flex items-center gap-4">
                          <Link
                            to={`/product/${item.id}`}
                            className="block hover:opacity-90"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-20 object-cover rounded border"
                            />
                          </Link>
                          <div>
                            <Link
                              to={`/product/${item.id}`}
                              className="font-medium hover:underline"
                            >
                              {item.name}
                            </Link>
                            {item.selectedSize && (
                              <div className="text-xs text-neutral-400">
                                Size: {item.selectedSize}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-neutral-600">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            min={1}
                            max={99}
                            value={item.quantity}
                            className="w-14 border px-2 py-1 rounded"
                            onChange={(e) =>
                              updateCartQuantity(
                                item.id,
                                Number(e.target.value),
                                item.selectedSize
                              )
                            }
                          />
                        </td>
                        <td className="p-3 font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            className="p-1 text-neutral-400 hover:bg-neutral-100 rounded-full"
                            title="Remove"
                            onClick={() =>
                              removeFromCart(item.id, item.selectedSize)
                            }
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-6">
                <button className="btn-secondary" onClick={clearCart}>
                  Clear Cart
                </button>
                <Link to="/shop" className="text-sm underline hover:text-black">
                  Continue Shopping
                </Link>
              </div>
            </div>
            {/* Cart Summary */}
            <div className="w-full max-w-sm mx-auto border rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-serif mb-6 font-semibold">
                Order Summary
              </h2>
              <div className="flex justify-between mb-1">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-neutral-500 text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <button
                className="btn-primary w-full mb-2"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
              <span className="block text-center text-xs text-neutral-500 mt-1">
                No payment is required (demo app)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
