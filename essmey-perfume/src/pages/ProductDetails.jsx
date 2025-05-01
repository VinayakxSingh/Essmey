import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/context";
import { client } from "../utils/sanity";
import { useState, useEffect } from "react";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const FALLBACK_IMAGE = "/images/product-1.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    error: contextError,
    wishlist,
  } = useAppContext();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const productResult = await client.fetch(
          `*[_type == "product" && _id == $id][0]{
            _id,
            name,
            price,
            stock,
            description,
            "image": images[0].asset->url
          }`,
          { id }
        );

        if (!productResult) {
          throw new Error("Product not found");
        }

        setProduct(productResult);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err.message || "Failed to load product data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleWishlistClick = (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (isInWishlist(product._id)) {
        removeFromWishlist(product._id);
        console.log("Removed from wishlist");
      } else {
        addToWishlist(product);
        console.log("Added to wishlist");
      }
    } catch (err) {
      console.error("Error handling wishlist:", err);
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) {
      console.error("Product is out of stock");
      return;
    }
    if (quantity > product.stock) {
      console.error(`Only ${product.stock} items available`);
      return;
    }
    try {
      addToCart(product, quantity);
      console.log(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-24 pb-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          {error || "Product Not Found"}
        </h1>
        <Link to="/shop" className="btn-primary mt-4">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {contextError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {contextError}
          </div>
        )}
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="aspect-[3/4] bg-neutral-100 relative rounded overflow-hidden mb-4">
              <img
                src={product.image || FALLBACK_IMAGE}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
              <button
                onClick={handleWishlistClick}
                className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow transition-all duration-200"
                aria-label={
                  isInWishlist(product._id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                {isInWishlist(product._id) ? (
                  <HeartSolidIcon className="h-7 w-7 text-red-500" />
                ) : (
                  <HeartIcon className="h-7 w-7 text-black" />
                )}
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-xl font-medium text-black mb-2">
              ₹{product.price?.toFixed(2)}
            </p>
            <div className="mb-4 text-neutral-700">{product.description}</div>
            <div className="mb-4">
              <span
                className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {product.stock > 0
                  ? `${product.stock} left in stock`
                  : "Out of stock"}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm">Quantity:</span>
              <input
                type="number"
                min={1}
                max={product.stock || 10}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(
                      1,
                      Math.min(product.stock || 10, Number(e.target.value))
                    )
                  )
                }
                className="w-16 border border-neutral-300 rounded px-2 py-1"
                disabled={product.stock <= 0}
              />
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
