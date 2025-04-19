import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Wishlist Functions (use _id for Sanity)
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const addToWishlist = (product) => {
    if (!isInWishlist(product._id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter((item) => item._id !== productId));
  };

  // Cart Functions -- add your own here as needed
  const addToCart = (product) => {
    // Real logic for cart here if needed
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
