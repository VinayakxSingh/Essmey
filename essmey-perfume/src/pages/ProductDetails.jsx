import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../utils/context";
import { products } from "../utils/sampleData";
import { useState, useEffect } from "react";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const getLocalReviews = (productId) => {
  const reviews = JSON.parse(localStorage.getItem("essmey_reviews") || "{}");
  return reviews[productId] || [];
};

const setLocalReviews = (productId, allReviews) => {
  const reviews = JSON.parse(localStorage.getItem("essmey_reviews") || "{}");
  reviews[productId] = allReviews;
  localStorage.setItem("essmey_reviews", JSON.stringify(reviews));
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));

  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToRecentlyViewed,
    recentlyViewed,
  } = useAppContext();

  // State for gallery
  const [selectedImg, setSelectedImg] = useState(
    product?.images?.[0] || product?.image
  );
  // Quantity for add to cart
  const [quantity, setQuantity] = useState(1);
  // Reviews state
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviews, setReviews] = useState(getLocalReviews(product?.id));
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      setSelectedImg(product.images?.[0] || product.image);
      setReviews(getLocalReviews(product.id));
      setQuantity(1);
    }
    // eslint-disable-next-line
  }, [product?.id]);

  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <Link to="/shop" className="btn-primary mt-4">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Related Products - same category, different ID
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Review handling
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    const newReview = {
      text: reviewText,
      rating: reviewRating,
      date: new Date().toISOString(),
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    setLocalReviews(product.id, updatedReviews);
    setReviewText("");
    setReviewRating(5);
  };

  // Render stars
  const renderStars = (count, filled) => {
    return Array.from({ length: count }, (_, i) => (
      <span
        key={i}
        className={i < filled ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Product Gallery & Details */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Image gallery */}
          <div>
            <div className="aspect-[3/4] bg-neutral-100 relative rounded overflow-hidden mb-4">
              <img
                src={selectedImg}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              {/* Wishlist button */}
              <button
                onClick={() =>
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow"
              >
                {isInWishlist(product.id) ? (
                  <HeartSolidIcon className="h-7 w-7 text-red-500" />
                ) : (
                  <HeartIcon className="h-7 w-7 text-black" />
                )}
              </button>
            </div>
            {/* Secondary images/thumbnails */}
            <div className="flex gap-2">
              {(product.images || [product.image]).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  aria-label="Select product image"
                >
                  <img
                    src={img}
                    alt={product.name}
                    className={`w-16 h-16 object-cover rounded border ${selectedImg === img ? "border-black opacity-100" : "border-transparent opacity-60"} transition-all`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <h1 className="text-3xl font-serif font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-xl font-medium text-black mb-2">
              ${product.price.toFixed(2)}
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
            <div className="mb-6">
              {product.notes && (
                <div>
                  <h3 className="font-medium mb-1">Notes</h3>
                  <div className="flex gap-4 text-sm">
                    <span>
                      <strong>Top:</strong> {product.notes.top.join(", ")}
                    </span>
                    <span>
                      <strong>Middle:</strong> {product.notes.middle.join(", ")}
                    </span>
                    <span>
                      <strong>Base:</strong> {product.notes.base.join(", ")}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Stock */}
            <div className="mb-4">
              <span
                className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>
            {/* Quantity selector & Add to Cart */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm">Quantity:</span>
              <input
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(1, Math.min(product.stock, Number(e.target.value)))
                  )
                }
                className="w-16 border border-neutral-300 rounded px-2 py-1"
              />
              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock < 1}
              >
                <ShoppingBagIcon className="h-5 w-5" />
                {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="max-w-2xl mx-auto mt-16 mb-24">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-serif font-semibold">
              Customer Reviews
            </h2>
            {reviews.length > 2 && (
              <button
                className="text-primary underline text-sm"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews ? "Hide reviews" : `Show all ${reviews.length}`}
              </button>
            )}
          </div>
          {reviews.length === 0 && (
            <div className="mb-4">No reviews yet. Be the first to review!</div>
          )}
          <div className="space-y-6 mb-8">
            {(showAllReviews ? reviews : reviews.slice(0, 2)).map(
              (rev, idx) => (
                <div key={idx} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400 mr-2">
                      {renderStars(5, rev.rating)}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {new Date(rev.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-neutral-700 italic">{rev.text}</p>
                </div>
              )
            )}
          </div>
          <form
            onSubmit={handleReviewSubmit}
            className="bg-neutral-50 rounded p-4 border"
          >
            <label htmlFor="review-rating" className="block mb-1">
              Your Rating
            </label>
            <select
              id="review-rating"
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="border p-2 mb-3"
              required
            >
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val}>
                  {val} Stars
                </option>
              ))}
            </select>
            <textarea
              className="w-full border rounded p-2 mb-3"
              placeholder="Leave a review (min 5 characters)"
              value={reviewText}
              minLength={5}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">
              Submit Review
            </button>
          </form>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-serif font-semibold mb-6">
              Related Products
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((prod) => (
                <Link
                  key={prod.id}
                  to={`/product/${prod.id}`}
                  className="product-card"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="aspect-[3/4] object-cover w-full rounded mb-2"
                  />
                  <div className="p-2">
                    <h3 className="font-medium text-lg">{prod.name}</h3>
                    <span className="block text-neutral-500 text-sm mb-1">
                      ${prod.price.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 1 && (
          <section className="mt-16">
            <h2 className="text-2xl font-serif font-semibold mb-6">
              Recently Viewed
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {recentlyViewed
                .filter((item) => item.id !== product.id)
                .map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="min-w-[180px] product-card bg-white border rounded overflow-hidden shadow hover:shadow-lg transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="aspect-[3/4] object-cover w-full"
                    />
                    <div className="p-2">
                      <h3 className="font-medium text-base mb-1">
                        {item.name}
                      </h3>
                      <span className="block text-neutral-500 text-sm mb-1">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
