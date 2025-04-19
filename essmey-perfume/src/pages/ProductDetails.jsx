import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../utils/context";
import { sanityClient } from "../utils/sanity";
import { useState, useEffect } from "react";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const FALLBACK_IMAGE = "/images/product-1.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useAppContext();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    sanityClient
      .fetch(
        `*[_type == "product" && _id == $id][0]{
        _id,
        name,
        category,
        price,
        stock,
        featured,
        bestSeller,
        new,
        description,
        notes,
        "images": images[].asset->url
      }`,
        { id }
      )
      .then((productResult) => {
        if (!productResult) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        setProduct(productResult);
        setSelectedImg(
          productResult &&
            productResult.images &&
            productResult.images.length > 0
            ? productResult.images[0]
            : FALLBACK_IMAGE
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product data. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="pt-24 pb-16 text-center">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="pt-24 pb-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">{error || "Product Not Found"}</h1>
        <Link to="/shop" className="btn-primary mt-4">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: show a success message or notification
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="aspect-[3/4] bg-neutral-100 relative rounded overflow-hidden mb-4">
              <img
                src={selectedImg || FALLBACK_IMAGE}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500"
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
              <button
                onClick={handleWishlistClick}
                className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow"
              >
                {isInWishlist(product._id) ? (
                  <HeartSolidIcon className="h-7 w-7 text-red-500" />
                ) : (
                  <HeartIcon className="h-7 w-7 text-black" />
                )}
              </button>
            </div>
            <div className="flex gap-2">
              {(product.images && product.images.length
                ? product.images
                : [FALLBACK_IMAGE]
              ).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  aria-label="Select product image"
                >
                  <img
                    src={img}
                    alt={product.name}
                    className={`w-16 h-16 object-cover rounded border ${selectedImg === img ? "border-black opacity-100" : "border-transparent opacity-60"} transition-all`}
                    onError={(e) => {
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-xl font-medium text-black mb-2">
              ₹{product.price?.toFixed(2)}
            </p>
            <div className="mb-2">
              {product.category && (
                <span className="text-xs text-neutral-500 uppercase px-2 py-1 border border-neutral-300 rounded mr-2">
                  {product.category}
                </span>
              )}
              {product.new && (
                <span className="text-xs px-2 py-1 bg-yellow-100 rounded mr-2">
                  New
                </span>
              )}
              {product.bestSeller && (
                <span className="text-xs px-2 py-1 bg-blue-100 rounded">
                  Best Seller
                </span>
              )}
            </div>
            <div className="mb-4 text-neutral-700">{product.description}</div>
            {/* Notes */}
            {product.notes && (
              <div className="mb-6">
                <h3 className="font-medium mb-1">Notes</h3>
                <div className="flex gap-4 text-sm">
                  <span>
                    <strong>Top:</strong> {(product.notes.top || []).join(", ")}
                  </span>
                  <span>
                    <strong>Middle:</strong>{" "}
                    {(product.notes.middle || []).join(", ")}
                  </span>
                  <span>
                    <strong>Base:</strong>{" "}
                    {(product.notes.base || []).join(", ")}
                  </span>
                </div>
              </div>
            )}
            <div className="mb-4">
              <span
                className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {product.stock > 0
                  ? `   ${product.stock} left in stock`
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
              />
              <button
                className="btn-primary flex items-center gap-2"
                onClick={handleAddToCart}
                disabled={!product.stock || product.stock < 1}
              >
                <ShoppingBagIcon className="h-5 w-5" />
                {!product.stock || product.stock < 1
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
