import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../utils/format';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onMoveToCart: (product: Product) => void;
  onRemoveFromWishlist: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onMoveToCart,
  onRemoveFromWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="p-5 border-b border-[#D3D4C0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#8B5E3C] fill-[#8B5E3C]" />
            <h2 className="text-base font-bold font-display text-[#0A2947]">
              Saved Wishlist ({products.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-slate-100 text-[#0A2947]"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D3D4C0]/40 flex items-center justify-center text-[#0A2947]/40">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0A2947]">Your wishlist is currently empty</h3>
                <p className="text-xs text-[#0A2947]/60 mt-1 max-w-xs">
                  Save your favorite tech products to revisit anytime or move directly to your shopping bag.
                </p>
              </div>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-3.5 rounded-lg border border-[#D3D4C0]/60 flex gap-3 shadow-2xs"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 object-cover rounded-xs shrink-0 bg-[#FAF9F6]"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#8B5E3C]">
                        {product.brand}
                      </span>
                      <h4 className="text-xs font-semibold text-[#0A2947] line-clamp-1">
                        {product.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-1 text-[#0A2947]/40 hover:text-rose-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D3D4C0]/30">
                    <span className="font-mono text-xs font-bold text-[#0A2947] tabular-nums">
                      {formatPKR(product.price)}
                    </span>

                    <button
                      onClick={() => onMoveToCart(product)}
                      className="px-3 py-1 bg-[#0A2947] hover:bg-[#8B5E3C] text-white text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#F3E4C9]" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-white border-t border-[#D3D4C0]">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#FAF9F6] hover:bg-slate-200 text-[#0A2947] border border-[#D3D4C0] text-xs font-semibold rounded-md transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
