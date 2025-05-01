import { createContext, useContext, useState, useEffect } from "react";
import { client } from "./sanity";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Search state
  const [searchResults, setSearchResults] = useState([]);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setCartItems(savedCart);
      setWishlistItems(savedWishlist);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setError("Failed to load cart and wishlist data");
    }
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      setError("Failed to save cart and wishlist data");
    }
  }, [cartItems, wishlistItems]);

  // Wishlist Functions
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const addToWishlist = (product) => {
    try {
      if (!isInWishlist(product._id)) {
        setWishlistItems((prev) => [...prev, product]);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setError("Failed to add item to wishlist");
    }
  };

  const removeFromWishlist = (productId) => {
    try {
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      setError("Failed to remove item from wishlist");
    }
  };

  // Cart Functions
  const isInCart = (productId, selectedSize = null) => {
    return cartItems.some(
      (item) =>
        item._id === productId &&
        (selectedSize === null || item.selectedSize === selectedSize)
    );
  };

  const addToCart = (product, quantity = 1, selectedSize = null) => {
    try {
      setCartItems((prev) => {
        const existingItemIndex = prev.findIndex(
          (item) =>
            item._id === product._id &&
            (selectedSize === null || item.selectedSize === selectedSize)
        );

        if (existingItemIndex >= 0) {
          const updatedCart = [...prev];
          updatedCart[existingItemIndex].quantity += quantity;
          return updatedCart;
        } else {
          return [
            ...prev,
            {
              ...product,
              image:
                product.image ||
                (product.images && product.images[0]?.asset?.url) ||
                "",
              quantity,
              selectedSize,
            },
          ];
        }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Failed to add item to cart");
    }
  };

  const removeFromCart = (productId, selectedSize = null) => {
    try {
      setCartItems((prev) =>
        prev.filter(
          (item) =>
            !(
              item._id === productId &&
              (selectedSize === null || item.selectedSize === selectedSize)
            )
        )
      );
    } catch (error) {
      console.error("Error removing from cart:", error);
      setError("Failed to remove item from cart");
    }
  };

  const updateCartQuantity = (productId, quantity, selectedSize = null) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId, selectedSize);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) => {
          if (
            item._id === productId &&
            (selectedSize === null || item.selectedSize === selectedSize)
          ) {
            return { ...item, quantity };
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      setError("Failed to update cart quantity");
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError("Failed to clear cart");
    }
  };

  // Cart Stats
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Search function using Sanity
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const lowerQuery = query.toLowerCase();
      const groqQuery = `*[_type == "product" && name match $searchTerm]{
        _id,
        name,
        price,
        "image": images[0].asset->url
      }`;
      const results = await client.fetch(groqQuery, {
        searchTerm: "*" + lowerQuery + "*",
      });
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results from Sanity:", error);
      setError("Failed to fetch search results");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        isInCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        searchResults,
        handleSearch,
        error,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
