import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useAppContext } from "../utils/context";

const FALLBACK_IMAGE = "/images/product-1.jpg";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useAppContext();

  const productId = product._id;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1); // Add 1 quantity as default from quick add
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : FALLBACK_IMAGE;

  return (
    <div
      className="product-card relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${productId}`} className="block h-full">
        <div className="relative overflow-hidden group">
          <div className="aspect-[3/4] bg-neutral-100 overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.src = FALLBACK_IMAGE;
              }}
            />
            <button
              onClick={handleWishlistClick}
              className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100"
              aria-label="Add to Wishlist"
            >
              {isInWishlist(productId) ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
          <div
            className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white px-4 py-3 flex justify-between items-center transition-transform duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <span className="text-sm">Quick Add</span>
            <button
              onClick={handleAddToCart}
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-20"
              aria-label="Add to Cart"
              disabled={!product.stock || product.stock < 1}
            >
              <ShoppingBagIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <div className="flex justify-between items-center mt-1">
            <span className="text-neutral-600">
              ₹{(product.price || 0).toFixed(2)}
            </span>
            {product.category && (
              <span className="text-xs text-neutral-500 uppercase">
                {product.category}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
