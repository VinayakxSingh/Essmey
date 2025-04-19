import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useAppContext } from "../utils/context";

const Navbar = () => {
  const { cartCount, isAuthenticated } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
    if (!showSearchModal) {
      window.dispatchEvent(
        new CustomEvent("toggleSearchModal", { detail: { open: true } })
      );
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-serif font-bold">
          <span className={isScrolled ? "text-amber" : "text-amber"}>
            ESSMEY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link hover:text-amber transition-colors">
            Home
          </Link>
          <Link
            to="/shop"
            className="nav-link hover:text-amber transition-colors"
          >
            Shop
          </Link>
          <div className="relative group">
            <button className="nav-link flex items-center hover:text-amber transition-colors">
              Collections
              <svg
                className="ml-1 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-amber/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-1">
                <Link
                  to="/shop?category=men"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber/10 hover:text-amber"
                >
                  Men
                </Link>
                <Link
                  to="/shop?category=women"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber/10 hover:text-amber"
                >
                  Women
                </Link>
                <Link
                  to="/shop?category=unisex"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber/10 hover:text-amber"
                >
                  Unisex
                </Link>
              </div>
            </div>
          </div>
          <Link
            to="/about"
            className="nav-link hover:text-amber transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="nav-link hover:text-amber transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button
            className="p-1 rounded-full hover:bg-amber/10 transition-colors"
            onClick={toggleSearchModal}
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-black hover:text-amber transition-colors" />
          </button>

          <Link
            to="/wishlist"
            className="p-1 rounded-full hover:bg-amber/10 transition-colors"
          >
            <HeartIcon className="h-5 w-5 text-black hover:text-amber transition-colors" />
          </Link>

          <Link
            to={isAuthenticated ? "/account" : "/login"}
            className="p-1 rounded-full hover:bg-amber/10 transition-colors"
          >
            <UserIcon className="h-5 w-5 text-black hover:text-amber transition-colors" />
          </Link>

          <Link
            to="/cart"
            className="relative p-1 rounded-full hover:bg-amber/10 transition-colors"
          >
            <ShoppingBagIcon className="h-5 w-5 text-black hover:text-amber transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs bg-amber text-white rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-1 rounded-full hover:bg-amber/10 transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black hover:text-amber transition-colors" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black hover:text-amber transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md">
          <nav className="container-custom py-4 flex flex-col space-y-3">
            <Link
              to="/"
              className="nav-link py-2 hover:text-amber transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="nav-link py-2 hover:text-amber transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <details className="group">
              <summary className="nav-link py-2 list-none flex justify-between cursor-pointer hover:text-amber transition-colors">
                Collections
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <div className="mt-2 ml-4 space-y-2">
                <Link
                  to="/shop?category=men"
                  className="block nav-link py-2 hover:text-amber transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Men
                </Link>
                <Link
                  to="/shop?category=women"
                  className="block nav-link py-2 hover:text-amber transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Women
                </Link>
                <Link
                  to="/shop?category=unisex"
                  className="block nav-link py-2 hover:text-amber transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Unisex
                </Link>
              </div>
            </details>
            <Link
              to="/about"
              className="nav-link py-2 hover:text-amber transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="nav-link py-2 hover:text-amber transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/wishlist"
              className="nav-link py-2 hover:text-amber transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link
              to={isAuthenticated ? "/account" : "/login"}
              className="nav-link py-2 hover:text-amber transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {isAuthenticated ? "My Account" : "Login / Register"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
