import React from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../utils/format';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  isInCart?: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  isInCart = false,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}) => {
  return (
    <div className="group relative bg-white border border-[#D3D4C0]/60 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#8B5E3C]/40 transition-all duration-300">
      {/* Top Media Container */}
      <div className="relative aspect-4/3 w-full bg-[#FAF9F6] p-4 flex items-center justify-center overflow-hidden">
        {/* Subtle Badge (Unboxed or minimal text) */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#0A2947] text-[#F3E4C9] rounded-xs shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 shadow-xs ${
            isWishlisted
              ? 'bg-[#8B5E3C] text-white'
              : 'bg-white/90 text-[#0A2947] hover:text-[#8B5E3C] hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image */}
        <div
          onClick={() => onQuickView(product)}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center rounded-sm transform transition-transform duration-700 ease-out group-hover:scale-103"
            loading="lazy"
          />
        </div>

        {/* Hover Quick View Overlay Action (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-xs hover:bg-[#0A2947] text-[#0A2947] hover:text-white text-xs font-semibold rounded-md shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex flex-col justify-between grow bg-white border-t border-[#D3D4C0]/40">
        <div>
          {/* Brand & Category Row */}
          <div className="flex items-center justify-between text-xs text-[#0A2947]/60 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#8B5E3C]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#0A2947]/70">
              <Star className="w-3 h-3 fill-[#8B5E3C] text-[#8B5E3C]" />
              <span className="tabular-nums font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-[#0A2947]/40">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-semibold text-[#0A2947] group-hover:text-[#8B5E3C] transition-colors leading-snug cursor-pointer line-clamp-2 mb-2"
          >
            {product.name}
          </h3>

          {/* Availability note */}
          <div className="text-[11px] text-[#0A2947]/70 mb-3 flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-600' : 'bg-rose-500'}`} />
            <span>{product.inStock ? `In Stock (${product.stockCount} units in Karachi)` : 'Temporarily Out of Stock'}</span>
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-3 border-t border-[#D3D4C0]/40 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-bold font-mono text-[#0A2947] tabular-nums tracking-tight">
              {formatPKR(product.price)}
            </div>
            {product.originalPrice && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="line-through text-[#0A2947]/50 font-mono tabular-nums">
                  {formatPKR(product.originalPrice)}
                </span>
                <span className="text-[11px] font-semibold text-[#8B5E3C]">
                  -{product.discountPercent}%
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`px-3 py-2 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 shadow-xs shrink-0 active:scale-95 ${
              isInCart
                ? 'bg-emerald-700 text-white'
                : 'bg-[#0A2947] hover:bg-[#8B5E3C] text-white'
            }`}
            title="Add to shopping bag"
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#F3E4C9]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
