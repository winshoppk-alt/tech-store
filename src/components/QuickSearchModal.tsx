import React, { useState, useMemo, useEffect, useRef } from 'react';
import { X, Search, ArrowRight, Tag, Star } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../utils/format';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        Object.values(p.specs).some((v) => v.toLowerCase().includes(q))
    );
  }, [products, query]);

  const quickQueries = ['MacBook', 'Titanium Phone', 'Noise Cancelling', 'OLED Laptop', 'GaN Charger', 'Smartwatch'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 overflow-y-auto">
      <div className="bg-white border border-[#D3D4C0] rounded-xl max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 overflow-hidden text-left">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#D3D4C0] flex items-center gap-3 bg-[#FAF9F6]">
          <Search className="w-5 h-5 text-[#8B5E3C] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search laptops, smartphones, earbuds, chargers..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#0A2947] placeholder-[#0A2947]/40 focus:outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-[#0A2947]/40 hover:text-[#0A2947]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold bg-white border border-[#D3D4C0] hover:bg-slate-100 rounded-md text-[#0A2947]"
          >
            Esc
          </button>
        </div>

        {/* Quick query chips */}
        <div className="px-5 py-3 bg-white border-b border-[#D3D4C0]/40 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#0A2947]/50 flex items-center gap-1 shrink-0">
            <Tag className="w-3 h-3 text-[#8B5E3C]" /> Popular:
          </span>
          {quickQueries.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-[#FAF9F6] hover:bg-[#F3E4C9]/50 border border-[#D3D4C0]/60 rounded-full text-[11px] font-medium text-[#0A2947] shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#0A2947]/60">
              Type device model, silicon architecture, or acoustic specifications to search inventory.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="font-semibold text-sm text-[#0A2947]">No matching devices found</p>
              <p className="text-xs text-[#0A2947]/60 max-w-sm mx-auto">
                No active inventory matched "{query}". Try searching for brands like Apple, Zenith, Sony, or generic terms like Laptop or Charger.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8B5E3C] px-1">
                Found {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'}
              </p>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="p-3 bg-[#FAF9F6] hover:bg-white border border-[#D3D4C0]/60 hover:border-[#8B5E3C] rounded-lg cursor-pointer transition-all flex items-center gap-4 group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-xs shrink-0 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-[#0A2947]/60">
                      <span className="font-semibold text-[#8B5E3C]">{product.brand}</span>
                      <span>·</span>
                      <span>{product.category}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-[#0A2947]">
                        <Star className="w-2.5 h-2.5 fill-[#8B5E3C] text-[#8B5E3C]" />
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#0A2947] group-hover:text-[#8B5E3C] transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-mono font-bold text-[#0A2947] tabular-nums mt-0.5">
                      {formatPKR(product.price)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0A2947]/40 group-hover:text-[#8B5E3C] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
