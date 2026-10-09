import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { CartItem } from '../types';
import { formatPKR } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 25000;
  const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : 1500;
  const discountAmount = appliedPromo === 'VANGUARD10' ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VANGUARD10') {
      setAppliedPromo('VANGUARD10');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try VANGUARD10 for 10% privilege discount.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Cart Header */}
        <div className="p-5 border-b border-[#D3D4C0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8B5E3C]" />
            <h2 className="text-base font-bold font-display text-[#0A2947]">
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-slate-100 text-[#0A2947]"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#F3E4C9]/40 border-b border-[#D3D4C0] text-xs">
          {subtotal >= freeShippingThreshold ? (
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You have unlocked <strong>Free Insured Express Delivery</strong>!</span>
            </div>
          ) : (
            <div>
              <p className="text-[#0A2947]/80">
                Add <strong>{formatPKR(freeShippingThreshold - subtotal)}</strong> more to unlock Free Nationwide Express Delivery.
              </p>
              <div className="w-full bg-[#D3D4C0] h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#8B5E3C] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D3D4C0]/40 flex items-center justify-center text-[#0A2947]/40">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0A2947]">Your bag is currently empty</h3>
                <p className="text-xs text-[#0A2947]/60 mt-1 max-w-xs">
                  Discover our curated laptops, smartphones, and audiophile acoustic equipment.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="px-6 py-2.5 bg-[#0A2947] hover:bg-[#8B5E3C] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedStorage || ''}`}
                className="bg-white p-3.5 rounded-lg border border-[#D3D4C0]/60 flex gap-3 shadow-2xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 object-cover rounded-xs shrink-0 bg-[#FAF9F6]"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-[#0A2947] line-clamp-1">
                        {item.product.name}
                      </h4>
                      {(item.selectedColor || item.selectedStorage) && (
                        <p className="text-[11px] text-[#0A2947]/60 mt-0.5">
                          {[item.selectedColor, item.selectedStorage].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-[#0A2947]/40 hover:text-rose-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D3D4C0]/30">
                    <span className="font-mono text-xs font-bold text-[#0A2947] tabular-nums">
                      {formatPKR(item.product.price * item.quantity)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#D3D4C0] rounded-md bg-[#FAF9F6]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#0A2947] hover:bg-slate-200"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#0A2947] hover:bg-slate-200"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#D3D4C0] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Privilege Code (try VANGUARD10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#FAF9F6] border border-[#D3D4C0] rounded-md text-xs uppercase placeholder:normal-case focus:outline-hidden focus:border-[#8B5E3C]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#D3D4C0]/60 hover:bg-[#0A2947] hover:text-white text-xs font-semibold rounded-md transition-colors text-[#0A2947]"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <p className="text-[11px] text-emerald-700 font-medium">
                  Code applied: 10% Privilege discount active!
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600">{promoError}</p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#0A2947]/80 pt-2 border-t border-[#D3D4C0]/40">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#0A2947] font-medium">{formatPKR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Discount (10%)</span>
                  <span className="font-mono tabular-nums font-semibold">-{formatPKR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Insured Delivery</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? <strong className="text-emerald-700 font-semibold">FREE</strong> : formatPKR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#0A2947] pt-2 border-t border-[#D3D4C0]/60">
                <span>Total Amount (PKR)</span>
                <span className="font-mono tabular-nums text-base text-[#8B5E3C]">{formatPKR(grandTotal)}</span>
              </div>
            </div>

            {/* Primary Checkout CTA */}
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-[#0A2947] hover:bg-[#8B5E3C] text-white text-xs sm:text-sm font-semibold rounded-md shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Proceed to Insured Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#0A2947]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B5E3C]" />
              <span>Encrypted Transaction · Cash on Delivery Supported</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
