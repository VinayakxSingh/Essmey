import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { client } from "../utils/sanity";
import { StarIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products from Sanity just once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        setError(null);

        const products = await client.fetch(
          `*[_type == "product"]{
            _id,
            name,
            category,
            price,
            stock,
            featured,
            bestSeller,
            new,
            description,
            notes,
            "images": images[].asset->url
          }`
        );

        if (!products || !Array.isArray(products)) {
          throw new Error("Invalid products data received");
        }

        // Filter and set featured products
        const featured = products.filter((p) => p.featured).slice(0, 4);
        setFeaturedProducts(featured);

        // Filter and set best sellers
        const bestSelling = products.filter((p) => p.bestSeller).slice(0, 4);
        setBestSellers(bestSelling);

        // If no products are found, use sample data
        if (products.length === 0) {
          const { products: sampleProducts } = await import(
            "../utils/sampleData"
          );
          setFeaturedProducts(
            sampleProducts.filter((p) => p.featured).slice(0, 4)
          );
          setBestSellers(
            sampleProducts.filter((p) => p.bestSeller).slice(0, 4)
          );
          console.log("Using sample data for demonstration");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");

        // Fallback to sample data
        const { products: sampleProducts } = await import(
          "../utils/sampleData"
        );
        setFeaturedProducts(
          sampleProducts.filter((p) => p.featured).slice(0, 4)
        );
        setBestSellers(sampleProducts.filter((p) => p.bestSeller).slice(0, 4));
        console.log("Using sample data for demonstration");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoadingTestimonials(true);
        setError(null);

        const data = await client.fetch(
          `*[_type == "testimonial"] | order(_createdAt desc)[0...6] {
            _id,
            name,
            location,
            rating,
            text
          }`
        );

        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid testimonials data received");
        }

        setTestimonials(data);

        // If no testimonials are found, use sample data
        if (data.length === 0) {
          const { testimonials: sampleTestimonials } = await import(
            "../utils/sampleData"
          );
          setTestimonials(sampleTestimonials);
          console.log("Using sample testimonials for demonstration");
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError("Failed to load testimonials");

        // Fallback to sample data
        const { testimonials: sampleTestimonials } = await import(
          "../utils/sampleData"
        );
        setTestimonials(sampleTestimonials);
        console.log("Using sample testimonials for demonstration");
      } finally {
        setLoadingTestimonials(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Rotating testimonials if there are at least 2
  useEffect(() => {
    if (testimonials.length > 1) {
      const intervalId = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [testimonials]);

  const handleImageError = (e) => {
    console.error("Error loading image:", e);
    e.target.src = "/images/placeholder.jpg";
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/essmeybg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container-custom relative z-10 flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
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
                className="essmey-hero-about-btn border-2 border-white text-white bg-black hover:bg-white hover:text-black transition duration-300"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-light-cream">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-medium mb-12 text-center">
            DISCOVER YOUR SIGNATURE SCENT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* For Her */}
            <Link
              to="/shop?category=women"
              className="group relative overflow-hidden"
            >
              <div className="h-[340px] md:h-[370px] overflow-hidden bg-neutral-100 flex items-center justify-center">
                <img
                  src="/images/forher.png"
                  alt="Women's Perfumes"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30 flex items-center justify-center">
                <div className="px-6 py-4 bg-black bg-opacity-50 text-white text-center">
                  <h3 className="text-2xl font-serif">For Her</h3>
                </div>
              </div>
            </Link>
            {/* For Him */}
            <Link
              to="/shop?category=men"
              className="group relative overflow-hidden"
            >
              <div className="h-[340px] md:h-[370px] overflow-hidden bg-neutral-100 flex items-center justify-center">
                <img
                  src="/images/forhim.png"
                  alt="Men's Perfumes"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30 flex items-center justify-center">
                <div className="px-6 py-4 bg-black bg-opacity-50 text-white text-center">
                  <h3 className="text-2xl font-serif">For Him</h3>
                </div>
              </div>
            </Link>
            {/* Unisex */}
            <Link
              to="/shop?category=unisex"
              className="group relative overflow-hidden"
            >
              <div className="h-[340px] md:h-[370px] overflow-hidden bg-neutral-100 flex items-center justify-center">
                <img
                  src="/images/unisex.png"
                  alt="Unisex Perfumes"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={handleImageError}
                  loading="lazy"
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

          {error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : loadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[3/4] bg-neutral-100 rounded"></div>
                  <div className="mt-4">
                    <div className="h-4 bg-neutral-100 rounded w-3/4"></div>
                    <div className="h-4 bg-neutral-100 rounded w-1/2 mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

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
                className="inline-block border border-white text-white px-6 py-2 rounded transition duration-300 ease-in-out hover:bg-white hover:text-black"
              >
                Learn More
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="/images/essmeybg.jpg"
                alt="Perfume Making"
                className="w-full h-full object-cover"
                onError={handleImageError}
                loading="lazy"
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
            Our most popular fragrances, loved by customers worldwide
          </p>

          {error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : loadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[3/4] bg-neutral-100 rounded"></div>
                  <div className="mt-4">
                    <div className="h-4 bg-neutral-100 rounded w-3/4"></div>
                    <div className="h-4 bg-neutral-100 rounded w-1/2 mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-medium mb-2 text-center">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-center text-neutral-600 mb-12">
            Discover why our customers love Essmey
          </p>

          {error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : loadingTestimonials ? (
            <div className="max-w-3xl mx-auto text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-neutral-100 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-neutral-100 rounded w-1/2 mx-auto mt-4"></div>
                <div className="h-4 bg-neutral-100 rounded w-1/4 mx-auto mt-4"></div>
              </div>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === activeTestimonial ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 ${
                      index === activeTestimonial ? "block" : "hidden"
                    }`}
                  >
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating
                                ? "text-yellow-400"
                                : "text-neutral-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-lg italic mb-6">{testimonial.text}</p>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-neutral-600">{testimonial.location}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeTestimonial
                        ? "bg-black"
                        : "bg-neutral-300"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-neutral-500 py-8">
              No testimonials available
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
