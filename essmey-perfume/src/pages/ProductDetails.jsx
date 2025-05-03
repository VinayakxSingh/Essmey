import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/context";
import { client } from "../utils/sanity";
import { useState, useEffect } from "react";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

import { ShareIcon } from "@heroicons/react/24/outline";

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
            "image": images[0].asset->url,
            "images": images[]->asset->url,
            category,
            "notes": {
              "top": notes.top[],
              "middle": notes.middle[],
              "base": notes.base[]
            }
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
        // console.log("Removed from wishlist");
      } else {
        addToWishlist(product);
        // console.log("Added to wishlist");
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
      // console.log(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const handleShareClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        // console.log("Shared successfully");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        // addToast("Link copied to clipboard");
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    } else {
      alert("Sharing not supported on this browser");
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
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="flex-1">
            <div className="relative">
              <img
                src={product.image || FALLBACK_IMAGE}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-amber-600 font-semibold mb-6">
                ₹{product.price?.toFixed(2)}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleWishlistClick}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  {isInWishlist(product._id) ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-black" />
                  )}
                </button>
                <button
                  onClick={handleShareClick}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <ShareIcon className="h-6 w-6 text-black" />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-neutral-500">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-neutral-100"
                    >
                      <span className="text-lg">-</span>
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock || 100, parseInt(e.target.value) || 1)))}
                      
                      max={product.stock || 100}
                      className="w-20 h-10 px-3 border rounded-md text-center"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock || 100, quantity + 1))}
                      className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-neutral-100"
                    >
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="btn-primary w-full text-lg py-4"
                  disabled={product.stock === 0 || quantity > product.stock}
                >
                  {product.stock === 0
                    ? "Out of Stock"
                    : quantity > product.stock
                    ? `Only ${product.stock} available`
                    : "Add to Cart"}
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-neutral-600 leading-relaxed">{product.description}</p>

                {/* Perfume Notes Section */}
                <div>
                  <h2 className="text-xl font-serif font-bold mb-4">Fragrance Notes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Top Notes */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-neutral-600">Top Notes</h3>
                        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center">
                          <span className="text-amber-500 text-2xl">↑</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {product.notes?.top?.map((note, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <span className="text-sm text-neutral-500">{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Middle Notes */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-neutral-600">Middle Notes</h3>
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-500 text-2xl">→</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {product.notes?.middle?.map((note, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                            <span className="text-sm text-neutral-500">{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Base Notes */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-neutral-600">Base Notes</h3>
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-500 text-2xl">↓</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {product.notes?.base?.map((note, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <span className="text-sm text-neutral-500">{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
