import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../utils/sampleData";
import ProductCard from "../components/ProductCard";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Shop = ({ addToCart }) => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: categoryParam || "all",
    sort: "featured",
    minPrice: "",
    maxPrice: "",
    isNew: false,
    isBestSeller: false,
  });

  useEffect(() => {
    // Apply filters
    let filtered = [...products];

    // Filter by category
    if (filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(filters.maxPrice));
    }

    // Filter by new
    if (filters.isNew) {
      filtered = filtered.filter((p) => p.new);
    }

    // Filter by best seller
    if (filters.isBestSeller) {
      filtered = filtered.filter((p) => p.bestSeller);
    }

    // Apply sorting
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
      default: // featured
        filtered = filtered
          .filter((p) => p.featured)
          .concat(filtered.filter((p) => !p.featured));
    }

    setFilteredProducts(filtered);
  }, [filters]);

  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      sort: "featured",
      minPrice: "",
      maxPrice: "",
      isNew: false,
      isBestSeller: false,
    });
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

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="w-20 border border-neutral-300 p-2 mr-2"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="w-20 border border-neutral-300 p-2 ml-2"
                  />
                </div>
              </div>

              {/* Other Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Product Features</h3>
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
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="mb-2 sm:mb-0">{filteredProducts.length} products</p>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm">
                  Sort by:
                </label>
                <select
                  id="sort"
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="border border-neutral-300 p-2"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="bestselling">Best Selling</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl mb-4">No products found</p>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button onClick={clearFilters} className="btn-secondary">
                  Clear Filters
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
