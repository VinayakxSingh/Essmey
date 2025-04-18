import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { products, testimonials } from "../utils/sampleData";
import { StarIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setFeaturedProducts(
      products.filter((product) => product.featured).slice(0, 4)
    );
    setBestSellers(
      products.filter((product) => product.bestSeller).slice(0, 4)
    );

    const intervalId = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section
        className="relative h-[90vh] bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: "url('/images/essmeybg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container-custom relative z-10 flex flex-col justify-center h-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              ESSMEY
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 italic">
              Unveil your essence
            </p>
            <p className="text-lg mb-8 max-w-lg">
              Handcrafted perfumes that tell a unique story. Each fragrance is
              meticulously created to reflect your individual personality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary">
                Explore Collection
              </Link>
              <Link
                to="/about"
                className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-black"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-light-cream">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-medium mb-12 text-center">
            DISCOVER YOUR SIGNATURE SCENT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/shop?category=women"
              className="group relative overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/images/forher.png"
                  alt="Women's Perfumes"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30 flex items-center justify-center">
                <div className="px-6 py-4 bg-black bg-opacity-50 text-white text-center">
                  <h3 className="text-2xl font-serif">For Her</h3>
                </div>
              </div>
            </Link>

            <Link
              to="/shop?category=men"
              className="group relative overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/images/forhim.png"
                  alt="Men's Perfumes"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30 flex items-center justify-center">
                <div className="px-6 py-4 bg-black bg-opacity-50 text-white text-center">
                  <h3 className="text-2xl font-serif">For Him</h3>
                </div>
              </div>
            </Link>

            <Link
              to="/shop?category=unisex"
              className="group relative overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcmZ1bWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                  alt="Unisex Perfumes"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30 flex items-center justify-center">
                <div className="px-6 py-4 bg-black bg-opacity-50 text-white text-center">
                  <h3 className="text-2xl font-serif">Unisex</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-medium mb-2 text-center">
            FEATURED FRAGRANCES
          </h2>
          <p className="text-center text-neutral-600 mb-12">
            Discover our most coveted scents, handcrafted with passion
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-6">
                THE ART OF HANDCRAFTED PERFUMERY
              </h2>
              <p className="mb-4">
                At Essmey, we believe that every individual has a unique essence
                waiting to be unveiled. Born out of a college student's passion
                for fragrances, Essmey stands as a testament to dedication,
                creativity, and the art of perfumery.
              </p>
              <p className="mb-6">
                Each bottle is handcrafted with love, ensuring that our
                customers experience a scent that's as unique as they are. We
                meticulously select ingredients, blend formulations, and test
                each batch to create perfumes that tell a story.
              </p>
              <Link
                to="/about"
                className="btn-secondary border-white text-white hover:bg-white hover:text-black"
              >
                Learn More
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="/images/essmeybg.jpg"
                alt="Perfume Making"
                className="w-full h-full object-cover"
                style={{ maxHeight: "500px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-medium mb-2 text-center">
            BEST SELLERS
          </h2>
          <p className="text-center text-neutral-600 mb-12">
            Our most loved fragrances that keep our customers coming back
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-medium mb-2 text-center">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-center text-neutral-600 mb-12">
            Discover why our customers love Essmey fragrances
          </p>

          <div className="relative max-w-3xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 text-center ${index === activeTestimonial ? "opacity-100" : "opacity-0 absolute inset-0"}`}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <blockquote className="text-xl italic mb-6">
                  {testimonial.text}
                </blockquote>
                <p className="font-medium">
                  {testimonial.name}, {testimonial.location}
                </p>
              </div>
            ))}

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 w-2 rounded-full ${index === activeTestimonial ? "bg-black" : "bg-gray-300"}`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-light-cream">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-medium mb-4">
              JOIN OUR COMMUNITY
            </h2>
            <p className="mb-8">
              Subscribe to our newsletter for exclusive offers, new fragrance
              releases, and expert perfume tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-white border border-neutral-300 focus:border-black outline-none flex-grow"
              />
              <button type="submit" className="btn-primary">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
