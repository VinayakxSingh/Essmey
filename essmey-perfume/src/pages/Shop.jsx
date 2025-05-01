import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { client } from "../utils/sanity";
import ProductCard from "../components/ProductCard";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { products as sampleProducts } from "../utils/sampleData";
import { useToastContext } from "../utils/ToastContext";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { addToast } = useToastContext();

  // Sanity-fetched product list
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingSampleData, setUsingSampleData] = useState(false);

  const [filters, setFilters] = useState({
    category: categoryParam || "all",
    sort: "featured",
    minPrice: "",
    maxPrice: "",
    isNew: false,
    isBestSeller: false,
  });

  // Fetch products from sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingSampleData(false);

        const data = await client.fetch(
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

        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid products data received");
        }

        if (data.length === 0) {
          throw new Error("No products found");
        }

        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products from database");
        addToast("Failed to load products from database", "error");

        // Convert sample data to match Sanity format
        const formattedSampleData = sampleProducts.map((product) => ({
          _id: product.id.toString(),
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.stock,
          featured: product.featured,
          bestSeller: product.bestSeller,
          new: product.new,
          description: product.description,
          notes: product.notes,
          images: product.images,
        }));

        setAllProducts(formattedSampleData);
        setUsingSampleData(true);
        addToast("Using sample data for demonstration", "info");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [addToast]);

  // Filtering and sorting logic
  useEffect(() => {
    try {
      let filtered = [...allProducts];

      if (filters.category && filters.category !== "all") {
        filtered = filtered.filter((p) => p.category === filters.category);
      }
      if (filters.minPrice) {
        filtered = filtered.filter((p) => p.price >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        filtered = filtered.filter((p) => p.price <= Number(filters.maxPrice));
      }
      if (filters.isNew) {
        filtered = filtered.filter((p) => p.new);
      }
      if (filters.isBestSeller) {
        filtered = filtered.filter((p) => p.bestSeller);
      }

      // Sorting
      switch (filters.sort) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          filtered = filtered
            .filter((p) => p.new)
            .concat(filtered.filter((p) => !p.new));
          break;
        case "bestselling":
          filtered = filtered
            .filter((p) => p.bestSeller)
            .concat(filtered.filter((p) => !p.bestSeller));
          break;
        default:
          filtered = filtered
            .filter((p) => p.featured)
            .concat(filtered.filter((p) => !p.featured));
      }

      setFilteredProducts(filtered);
    } catch (error) {
      console.error("Error filtering products:", error);
      setError("Failed to filter products");
      addToast("Failed to filter products", "error");
    }
  }, [allProducts, filters, addToast]);

  // Update from URL params when component mounts
  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  const handleFilterChange = (e) => {
    try {
      const { name, value, type, checked } = e.target;
      setFilters((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    } catch (error) {
      console.error("Error updating filters:", error);
      addToast("Failed to update filters", "error");
    }
  };

  const clearFilters = () => {
    try {
      setFilters({
        category: "all",
        sort: "featured",
        minPrice: "",
        maxPrice: "",
        isNew: false,
        isBestSeller: false,
      });
    } catch (error) {
      console.error("Error clearing filters:", error);
      addToast("Failed to clear filters", "error");
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-cream py-16 mb-8">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Shop Collection
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Explore our handcrafted perfumes, each one meticulously created to
            unveil your essence.
          </p>
        </div>
      </section>
      <div className="container-custom">
        {usingSampleData && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-center">
            <p className="text-yellow-800">
              Using sample product data for demonstration purposes.
            </p>
          </div>
        )}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-neutral-600 hover:text-black flex items-center"
                >
                  Clear All
                  <XMarkIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={filters.category === "all"}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span>All Fragrances</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="women"
                      checked={filters.category === "women"}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span>Women</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="men"
                      checked={filters.category === "men"}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span>Men</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="unisex"
                      checked={filters.category === "unisex"}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span>Unisex</span>
                  </label>
                </div>
              </div>
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-600">Min</label>
                    <input
                      type="number"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-full border border-neutral-200 rounded px-3 py-2 text-sm"
                      placeholder="Min"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-600">Max</label>
                    <input
                      type="number"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-full border border-neutral-200 rounded px-3 py-2 text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
              {/* Additional Filters */}
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={filters.isNew}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <span>New Arrivals</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    checked={filters.isBestSeller}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <span>Best Sellers</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-neutral-600">
                Showing {filteredProducts.length} products
              </p>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="border border-neutral-200 rounded px-3 py-2 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="bestselling">Best Selling</option>
              </select>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[3/4] bg-neutral-100 rounded"></div>
                    <div className="mt-4">
                      <div className="h-4 bg-neutral-100 rounded w-3/4"></div>
                      <div className="h-4 bg-neutral-100 rounded w-1/2 mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-600">
                  No products found matching your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-amber hover:text-amber-dark"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
