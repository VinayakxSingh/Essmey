import { createContext, useContext, useState, useEffect } from "react";
import { sanityClient } from "./sanity";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    }
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [cartItems, wishlistItems]);

  // Wishlist Functions
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const addToWishlist = (product) => {
    if (!isInWishlist(product._id)) {
      setWishlistItems((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
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
            quantity,
            selectedSize,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId, selectedSize = null) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === productId &&
            (selectedSize === null || item.selectedSize === selectedSize)
          )
      )
    );
  };

  const updateCartQuantity = (productId, quantity, selectedSize = null) => {
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
  };

  const clearCart = () => {
    setCartItems([]);
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
      const lowerQuery = query.toLowerCase();
      const groqQuery = `*[_type == "product" && name match $searchTerm]{
        _id,
        name,
        price,
        "image": images[0].asset->url
      }`;
      const results = await sanityClient.fetch(groqQuery, {
        searchTerm: "*" + lowerQuery + "*",
      });
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results from Sanity:", error);
      setSearchResults([]);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
