import { useAppContext } from "../utils/context";
import { Link } from "react-router-dom";
import { XMarkIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart, isInWishlist } =
    useAppContext();

  return (
    <div className="pt-24 pb-16 min-h-[50vh]">
      <div className="container-custom">
        <h1 className="text-3xl font-serif font-bold mb-8">My Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-xl mb-3">Your wishlist is empty.</p>
            <Link to="/shop" className="btn-primary">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="relative border rounded-lg overflow-hidden p-4 bg-white flex flex-col"
              >
                <button
                  className="absolute top-2 right-2 p-1 bg-white bg-opacity-90 rounded-full hover:bg-red-100"
                  onClick={() => removeFromWishlist(item.id)}
                  title="Remove from wishlist"
                >
                  <XMarkIcon className="h-5 w-5 text-black" />
                </button>
                <Link to={`/product/${item.id}`} className="block mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover rounded mb-3"
                  />
                  <h2 className="font-medium text-lg mb-1">{item.name}</h2>
                  <span className="block text-sm text-neutral-500 mb-2">
                    ${item.price.toFixed(2)}
                  </span>
                </Link>
                <button
                  className="btn-primary mt-auto flex items-center justify-center gap-2"
                  onClick={() => addToCart(item)}
                  disabled={!item.stock || item.stock < 1}
                  title={item.stock < 1 ? "Out of stock" : "Add to Cart"}
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  {item.stock < 1 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
