import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Flame, Sparkles, Tag } from 'lucide-react';

interface CollectionTabsProps {
  products: Product[];
  wishlistIds: Set<string>;
  cartIds: Set<string>;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

type TabType = 'best-sellers' | 'new-arrivals' | 'special-offers';

export const CollectionTabs: React.FC<CollectionTabsProps> = ({
  products,
  wishlistIds,
  cartIds,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('best-sellers');

  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const specialOffers = products.filter((p) => p.isSpecialOffer || (p.discountPercent && p.discountPercent > 0));

  let displayedProducts: Product[] = [];
  if (activeTab === 'best-sellers') displayedProducts = bestSellers;
  else if (activeTab === 'new-arrivals') displayedProducts = newArrivals;
  else displayedProducts = specialOffers;

  const tabs = [
    { id: 'best-sellers', label: 'Best Sellers', icon: Flame, count: bestSellers.length },
    { id: 'new-arrivals', label: 'New Arrivals', icon: Sparkles, count: newArrivals.length },
    { id: 'special-offers', label: 'Special Offers', icon: Tag, count: specialOffers.length },
  ];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D3D4C0]/40">
      {/* Header and Segmented Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-[#D3D4C0]/50 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-2">
            <span>Dynamic Discovery</span>
            <span className="text-[#0A2947]/30">/</span>
            <span className="text-[#0A2947]/70">Curated Tiers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0A2947] tracking-tight">
            Curated Collections
          </h2>
        </div>

        {/* Functional Tab Buttons (Interactive segmented control) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#D3D4C0]/30 rounded-lg self-start md:self-auto border border-[#D3D4C0]/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0A2947] text-white shadow-xs'
                    : 'text-[#0A2947]/70 hover:text-[#0A2947] hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F3E4C9]' : 'text-[#8B5E3C]'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                  isActive ? 'bg-[#8B5E3C] text-white' : 'bg-black/5 text-[#0A2947]/60'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
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
    </section>
  );
};
