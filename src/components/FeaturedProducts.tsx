import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  wishlistIds: Set<string>;
  cartIds: Set<string>;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  wishlistIds,
  cartIds,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onViewAll,
}) => {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D3D4C0]/40">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#D3D4C0]/50 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curator's Selection</span>
            <span className="text-[#0A2947]/30">/</span>
            <span className="text-[#0A2947]/70">Verified Local Stock</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0A2947] tracking-tight">
            Trending Right Now
          </h2>
        </div>

        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8B5E3C] hover:text-[#0A2947] transition-colors group"
        >
          <span>View All Products</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
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

      {/* Bottom CTA Banner */}
      <div className="mt-12 text-center">
        <button
          onClick={onViewAll}
          className="px-8 py-3.5 bg-[#0A2947] hover:bg-[#8B5E3C] text-white text-xs sm:text-sm font-semibold rounded-md shadow-md transition-all active:scale-98"
        >
          Explore All {products.length}+ Premium Devices & Hardware
        </button>
      </div>
    </section>
  );
};
