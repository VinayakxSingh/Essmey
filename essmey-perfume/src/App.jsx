import { useEffect } from "react";
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
import Shipping from "./pages/Shipping";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import TransOrder from "./pages/TransOrder";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchModal from "./components/SearchModal";
import { AppProvider } from "./utils/context";
import { AuthProvider } from "./utils/AuthContext";
import { ToastProvider } from "./utils/ToastContext";
import ScrollToTop from "./components/ScrollToTop";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ForgotPassword from "./pages/ForgotPassword";
import ThankYou from "./pages/ThankYou";
import { initToast } from "./utils/analytics";
import { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";
import OrderDetails from "./pages/OrderDetails";

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            // console.log("ServiceWorker registration successful");
          })
          .catch((err) => {
            // console.log("ServiceWorker registration failed: ", err);
          });
      });
    } else if ("serviceWorker" in navigator) {
      // Unregister service worker in development to avoid caching issues
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  }, []);

  return (
    <Router>
      <ChakraProvider>
        <ToastProvider>
          <AuthProvider>
            <AppProvider>
              <ScrollToTop />
              <Toaster position="top-right" toastOptions={{
                style: {
                  background: 'white',
                  color: 'black',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }
              }} />
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
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/account/*" element={<Account />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/track-order" element={<TransOrder />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    <Route path="/order/:orderId" element={<OrderDetails />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </AppProvider>
          </AuthProvider>
        </ToastProvider>
      </ChakraProvider>
    </Router>
  );
}

export default App;
