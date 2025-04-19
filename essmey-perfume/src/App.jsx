import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import SearchResults from "./pages/SearchResults";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchModal from "./components/SearchModal";
import { AppProvider } from "./utils/context";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <SearchModal />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/account/*" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
