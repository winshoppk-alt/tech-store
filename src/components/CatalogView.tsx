import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Search, Check, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { formatPKR } from '../utils/format';

interface CatalogViewProps {
  products: Product[];
  initialCategory: string | null;
  wishlistIds: Set<string>;
  cartIds: Set<string>;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectCategory: (categorySlug: string) => void;
  onBackToHome: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  initialCategory,
  wishlistIds,
  cartIds,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onSelectCategory,
  onBackToHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(900000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync if initialCategory changes from parent nav
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const allBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'deals') {
            if (!p.isSpecialOffer && (!p.discountPercent || p.discountPercent <= 0)) return false;
          } else if (p.categorySlug !== selectedCategory) {
            return false;
          }
        }
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
        if (p.price > priceMax) return false;
        if (inStockOnly && !p.inStock) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedBrand, priceMax, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceMax(900000);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0) +
    (priceMax < 900000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const getCategoryTitle = () => {
    if (selectedCategory === 'all') return 'All Technology & Hardware';
    if (selectedCategory === 'deals') return 'Special Offers & Clearance';
    const found = CATEGORIES.find((c) => c.slug === selectedCategory);
    return found ? found.name : selectedCategory;
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between pb-6 border-b border-[#D3D4C0]/50 mb-8">
        <div className="flex items-center gap-2 text-xs text-[#0A2947]/70">
          <button onClick={onBackToHome} className="hover:text-[#8B5E3C] transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="font-semibold text-[#0A2947]">Collections</span>
          <span>/</span>
          <span className="font-semibold text-[#8B5E3C]">{getCategoryTitle()}</span>
        </div>

        <button
          onClick={onBackToHome}
          className="text-xs font-semibold text-[#8B5E3C] hover:text-[#0A2947] transition-colors"
        >
          ← Return to Showcase
        </button>
      </div>

      {/* Catalog Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#0A2947] tracking-tight">
            {getCategoryTitle()}
          </h1>
          <p className="text-xs sm:text-sm text-[#0A2947]/70 mt-1">
            Displaying {filteredProducts.length} verified devices across Pakistan fulfillment network.
          </p>
        </div>

        {/* Search within catalog */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#8B5E3C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter model, specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#D3D4C0] rounded-md text-xs text-[#0A2947] placeholder-[#0A2947]/50 focus:outline-hidden focus:border-[#8B5E3C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden p-2 bg-white border border-[#D3D4C0] rounded-md text-[#0A2947] flex items-center gap-1.5 text-xs font-medium"
          >
            <Filter className="w-4 h-4 text-[#8B5E3C]" />
            <span>Filters ({activeFiltersCount})</span>
          </button>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-6 p-3 bg-[#FAF9F6] border border-[#D3D4C0]/60 rounded-lg text-xs">
          <span className="text-[#0A2947]/60 font-medium">Active Filters:</span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#D3D4C0] rounded-md hover:border-[#8B5E3C] text-[#0A2947]"
            >
              <span>Category: {selectedCategory}</span>
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}
          {selectedBrand !== 'all' && (
            <button
              onClick={() => setSelectedBrand('all')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#D3D4C0] rounded-md hover:border-[#8B5E3C] text-[#0A2947]"
            >
              <span>Brand: {selectedBrand}</span>
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}
          {priceMax < 900000 && (
            <button
              onClick={() => setPriceMax(900000)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#D3D4C0] rounded-md hover:border-[#8B5E3C] text-[#0A2947]"
            >
              <span>Max: {formatPKR(priceMax)}</span>
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}
          {inStockOnly && (
            <button
              onClick={() => setInStockOnly(false)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#D3D4C0] rounded-md hover:border-[#8B5E3C] text-[#0A2947]"
            >
              <span>In Stock Only</span>
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#D3D4C0] rounded-md hover:border-[#8B5E3C] text-[#0A2947]"
            >
              <span>Search: "{searchQuery}"</span>
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}
          <button
            onClick={resetFilters}
            className="ml-auto inline-flex items-center gap-1 text-[#8B5E3C] hover:text-[#0A2947] font-semibold text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Layout Grid: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 p-5 bg-white border border-[#D3D4C0]/70 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D3D4C0]/50">
            <h3 className="font-bold text-sm text-[#0A2947] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#8B5E3C]" />
              <span>Catalog Filters</span>
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-[#8B5E3C] hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A2947]/70 mb-2.5">
              Categories
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md flex justify-between items-center transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#0A2947] text-white font-semibold'
                    : 'text-[#0A2947]/80 hover:bg-[#FAF9F6]'
                }`}
              >
                <span>All Categories</span>
                <span className="tabular-nums text-[11px] opacity-75">{products.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md flex justify-between items-center transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-[#0A2947] text-white font-semibold'
                      : 'text-[#0A2947]/80 hover:bg-[#FAF9F6]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="tabular-nums text-[11px] opacity-75">
                    {products.filter((p) => p.categorySlug === cat.slug).length}
                  </span>
                </button>
              ))}
              <button
                onClick={() => setSelectedCategory('deals')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md flex justify-between items-center transition-colors ${
                  selectedCategory === 'deals'
                    ? 'bg-[#0A2947] text-white font-semibold'
                    : 'text-[#8B5E3C] font-semibold hover:bg-[#FAF9F6]'
                }`}
              >
                <span>Special Offers / Deals</span>
                <span className="tabular-nums text-[11px]">
                  {products.filter((p) => p.isSpecialOffer || (p.discountPercent && p.discountPercent > 0)).length}
                </span>
              </button>
            </div>
          </div>

          {/* Brands Filter */}
          <div className="pt-4 border-t border-[#D3D4C0]/40">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A2947]/70 mb-2.5">
              Hardware Brand
            </h4>
            <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md flex justify-between items-center transition-colors ${
                  selectedBrand === 'all'
                    ? 'bg-[#0A2947] text-white font-semibold'
                    : 'text-[#0A2947]/80 hover:bg-[#FAF9F6]'
                }`}
              >
                <span>All Brands</span>
              </button>
              {allBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md flex justify-between items-center transition-colors ${
                    selectedBrand === brand
                      ? 'bg-[#0A2947] text-white font-semibold'
                      : 'text-[#0A2947]/80 hover:bg-[#FAF9F6]'
                  }`}
                >
                  <span>{brand}</span>
                  <span className="tabular-nums text-[11px] opacity-75">
                    {products.filter((p) => p.brand === brand).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-[#D3D4C0]/40 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#0A2947]">
              <span>Max Price</span>
              <span className="font-mono text-[#8B5E3C] tabular-nums">{formatPKR(priceMax)}</span>
            </div>
            <input
              type="range"
              min={25000}
              max={900000}
              step={15000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#8B5E3C]"
            />
            <div className="flex justify-between text-[10px] text-[#0A2947]/50 font-mono">
              <span>₨ 25,000</span>
              <span>₨ 900,000</span>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="pt-4 border-t border-[#D3D4C0]/40">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#0A2947]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded-xs text-[#0A2947] focus:ring-[#8B5E3C] accent-[#0A2947]"
              />
              <span className="font-medium">In Stock Only (Ready to Dispatch)</span>
            </label>
          </div>
        </aside>

        {/* Right Section: Sorting Bar + Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Sorting Header */}
          <div className="flex items-center justify-between bg-white p-3.5 rounded-lg border border-[#D3D4C0]/60 text-xs">
            <span className="text-[#0A2947]/70 font-medium">
              Showing <strong className="text-[#0A2947]">{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8B5E3C]" />
              <label className="text-[#0A2947]/70">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF9F6] border border-[#D3D4C0] rounded-md px-2.5 py-1 text-xs text-[#0A2947] focus:outline-hidden focus:border-[#8B5E3C] font-medium"
              >
                <option value="featured">Featured / Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#D3D4C0] rounded-xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF9F6] flex items-center justify-center mx-auto text-[#0A2947]/40">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-[#0A2947]">No matching devices found</h3>
              <p className="text-xs text-[#0A2947]/60 max-w-sm mx-auto">
                No items match your active filters. Try expanding your price boundary or selecting a different category.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#0A2947] text-white text-xs font-semibold rounded-md hover:bg-[#8B5E3C] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.has(product.id)}
                  isInCart={cartIds.has(product.id)}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-[#FAF9F6] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D3D4C0]">
                <h3 className="font-bold text-base text-[#0A2947] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#8B5E3C]" />
                  <span>Filter Products</span>
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-md text-[#0A2947]"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Body */}
              <div className="mt-5 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-[#0A2947] mb-2">Category</h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 bg-white border border-[#D3D4C0] rounded-md text-xs text-[#0A2947]"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                    <option value="deals">Special Deals</option>
                  </select>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-[#0A2947] mb-2">Hardware Brand</h4>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 bg-white border border-[#D3D4C0] rounded-md text-xs text-[#0A2947]"
                  >
                    <option value="all">All Brands</option>
                    {allBrands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#0A2947] mb-1">
                    <span>Max Price</span>
                    <span className="font-mono text-[#8B5E3C]">{formatPKR(priceMax)}</span>
                  </div>
                  <input
                    type="range"
                    min={25000}
                    max={900000}
                    step={15000}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[#8B5E3C]"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs font-medium text-[#0A2947]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#0A2947]"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D3D4C0] space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#0A2947] text-white text-xs font-semibold rounded-md"
              >
                Show {filteredProducts.length} Results
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2 bg-white border border-[#D3D4C0] text-[#0A2947] text-xs font-medium rounded-md"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
