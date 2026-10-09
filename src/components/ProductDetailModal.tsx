import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, Star, ArrowRight, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../utils/format';

interface ProductDetailModalProps {
  product: Product;
  allProducts: Product[];
  isWishlisted: boolean;
  isInCart: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string, storage?: string) => void;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  allProducts,
  isWishlisted,
  isInCart,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onSelectProduct,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.variants?.colors?.[0] || '');
  const [selectedStorage, setSelectedStorage] = useState(product.variants?.storage?.[0] || '');
  const [addedNotice, setAddedNotice] = useState(false);

  const relatedProducts = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor, selectedStorage);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#D3D4C0] rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-slate-100 text-[#0A2947] shadow-sm transition-colors"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Visual Showcase */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-4/3 w-full bg-[#FAF9F6] rounded-lg overflow-hidden border border-[#D3D4C0]/60 p-4 flex items-center justify-center">
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-[#0A2947] text-[#F3E4C9] rounded-xs shadow-xs">
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center rounded-sm"
                />
              </div>

              {/* Trust Badges under Media */}
              <div className="grid grid-cols-2 gap-3 text-xs text-[#0A2947]/80 bg-[#FAF9F6] p-3.5 rounded-lg border border-[#D3D4C0]/50">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                  <span>1-Year Official Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                  <span>Free Express Insured Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-5 text-left">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold uppercase tracking-wider text-[#8B5E3C]">
                    {product.brand} · {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#0A2947]/70 font-medium">
                    <Star className="w-3.5 h-3.5 fill-[#8B5E3C] text-[#8B5E3C]" />
                    <span className="font-semibold tabular-nums">{product.rating.toFixed(1)}</span>
                    <span>({product.reviewCount} customer reviews)</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0A2947] tracking-tight leading-snug">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0A2947] tabular-nums">
                    {formatPKR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-[#0A2947]/50 font-mono tabular-nums">
                      {formatPKR(product.originalPrice)}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="text-xs font-semibold text-[#8B5E3C] bg-[#F3E4C9]/40 px-2 py-0.5 rounded-xs">
                      Save {product.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mt-2 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="font-medium text-emerald-800">
                    Ready to Dispatch ({product.stockCount} sealed units at Karachi Central Hub)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-[#0A2947]/80 leading-relaxed border-t border-b border-[#D3D4C0]/50 py-3">
                {product.description}
              </p>

              {/* Variant Selectors: Colors */}
              {product.variants?.colors && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#0A2947]">
                    Finish: <span className="font-normal text-[#8B5E3C]">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                          selectedColor === color
                            ? 'border-[#0A2947] bg-[#0A2947] text-white shadow-2xs'
                            : 'border-[#D3D4C0] hover:border-[#8B5E3C] text-[#0A2947] bg-white'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selectors: Storage / Config */}
              {product.variants?.storage && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#0A2947]">
                    Hardware Tier: <span className="font-normal text-[#8B5E3C]">{selectedStorage}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.storage.map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setSelectedStorage(tier)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                          selectedStorage === tier
                            ? 'border-[#0A2947] bg-[#0A2947] text-white shadow-2xs'
                            : 'border-[#D3D4C0] hover:border-[#8B5E3C] text-[#0A2947] bg-white'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-[#D3D4C0] rounded-md bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm text-[#0A2947] hover:bg-slate-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-bold tabular-nums text-[#0A2947]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="px-3 py-2 text-sm text-[#0A2947] hover:bg-slate-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-5 bg-[#0A2947] hover:bg-[#8B5E3C] text-white text-xs sm:text-sm font-semibold rounded-md shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#F3E4C9]" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-md border transition-all shadow-xs ${
                    isWishlisted
                      ? 'border-[#8B5E3C] bg-[#8B5E3C] text-white'
                      : 'border-[#D3D4C0] bg-white text-[#0A2947] hover:border-[#8B5E3C]'
                  }`}
                  aria-label={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Specifications Table Section */}
          <div className="mt-10 pt-8 border-t border-[#D3D4C0]/60">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B5E3C] mb-4">
              Hardware Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1.5 border-b border-[#D3D4C0]/30">
                  <span className="text-[#0A2947]/60">{key}</span>
                  <span className="font-medium text-[#0A2947] text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products Carousel / Grid */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[#D3D4C0]/60">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B5E3C] mb-4">
                Complementary Devices in {product.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="p-3 bg-[#FAF9F6] border border-[#D3D4C0]/60 rounded-lg hover:border-[#8B5E3C] cursor-pointer transition-all flex items-center gap-3"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-xs shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-[#0A2947] truncate">{rel.name}</p>
                      <p className="text-xs font-mono text-[#8B5E3C] tabular-nums mt-0.5">
                        {formatPKR(rel.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
