import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Newsletter */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="block text-3xl font-serif font-bold mb-4">
              <span className="text-white">ESSMEY</span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-xs">
              Unveil your essence with our handcrafted perfumes, meticulously created to reflect your unique personality.
            </p>
            <h4 className="text-sm font-medium mb-3">SUBSCRIBE TO OUR NEWSLETTER</h4>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-neutral-900 text-white border border-neutral-700 focus:border-white outline-none flex-grow"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black font-medium hover:bg-neutral-200 transition"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium mb-4 uppercase">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-neutral-400 hover:text-white transition">Shop All</Link></li>
              <li><Link to="/shop?category=men" className="text-neutral-400 hover:text-white transition">Men</Link></li>
              <li><Link to="/shop?category=women" className="text-neutral-400 hover:text-white transition">Women</Link></li>
              <li><Link to="/shop?category=unisex" className="text-neutral-400 hover:text-white transition">Unisex</Link></li>
              <li><Link to="/about" className="text-neutral-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="text-neutral-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Help & Information */}
          <div>
            <h4 className="text-sm font-medium mb-4 uppercase">Help & Information</h4>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-neutral-400 hover:text-white transition">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-neutral-400 hover:text-white transition">FAQ</Link></li>
              <li><Link to="/terms" className="text-neutral-400 hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-neutral-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/track-order" className="text-neutral-400 hover:text-white transition">Track Order</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition">
              <FaInstagram className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition">
              <FaFacebook className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition">
              <FaPinterest className="h-5 w-5" />
            </a>
          </div>
          <div className="text-neutral-500 text-sm">
            &copy; {currentYear} ESSMEY. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
