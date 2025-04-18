import { createContext, useContext, useState, useEffect } from 'react';
import { products } from './sampleData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Cart State
  const [cartItems, setCartItems] = useState([]);

  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState([]);

  // User State
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Recently Viewed Products
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('essmey_cart');
    const storedWishlist = localStorage.getItem('essmey_wishlist');
    const storedUser = localStorage.getItem('essmey_user');
    const storedRecentlyViewed = localStorage.getItem('essmey_recently_viewed');

    if (storedCart) setCartItems(JSON.parse(storedCart));
    if (storedWishlist) setWishlistItems(JSON.parse(storedWishlist));
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
    if (storedRecentlyViewed) setRecentlyViewed(JSON.parse(storedRecentlyViewed));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('essmey_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('essmey_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Save recently viewed to localStorage
  useEffect(() => {
    localStorage.setItem('essmey_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Cart Functions
  const addToCart = (product, quantity = 1, selectedSize = null) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && (selectedSize ? item.selectedSize === selectedSize : true)
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        (item.id === product.id && (selectedSize ? item.selectedSize === selectedSize : true))
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        ...product,
        quantity,
        selectedSize: selectedSize || null
      }]);
    }
  };

  const removeFromCart = (itemId, selectedSize = null) => {
    setCartItems(cartItems.filter(
      item => !(item.id === itemId && (selectedSize ? item.selectedSize === selectedSize : true))
    ));
  };

  const updateCartQuantity = (itemId, newQuantity, selectedSize = null) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item =>
      (item.id === itemId && (selectedSize ? item.selectedSize === selectedSize : true))
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart totals
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Wishlist Functions
  const addToWishlist = (product) => {
    if (!wishlistItems.some(item => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // User Authentication Functions
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('essmey_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('essmey_user');
  };

  const register = (userData) => {
    // In a real app, this would involve an API call
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('essmey_user', JSON.stringify(userData));
  };

  // Search Function
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filteredResults = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  // Recently Viewed Function
  const addToRecentlyViewed = (product) => {
    // Remove product if it already exists to avoid duplicates
    const filtered = recentlyViewed.filter(item => item.id !== product.id);

    // Add to the beginning of the array and limit to 4 items
    const updated = [product, ...filtered].slice(0, 4);

    setRecentlyViewed(updated);
  };

  return (
    <AppContext.Provider
      value={{
        // Cart state and functions
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,

        // Wishlist state and functions
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,

        // User state and functions
        user,
        isAuthenticated,
        login,
        logout,
        register,

        // Search state and functions
        searchQuery,
        searchResults,
        handleSearch,

        // Recently viewed
        recentlyViewed,
        addToRecentlyViewed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
