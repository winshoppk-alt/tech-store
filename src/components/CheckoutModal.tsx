import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Truck, Package, CreditCard, Banknote, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatPKR } from '../utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Karachi',
    address: '',
    postalCode: '',
    paymentMethod: 'cod', // 'cod' | 'raast' | 'card'
    specialInstructions: '',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 25000 ? 0 : 1500;
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const randomId = `VN-PK-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(randomId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onOrderSuccess();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#D3D4C0] rounded-xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0A2947]"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {orderConfirmed ? (
          /* Confirmation Receipt State */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3E4C9]/50 rounded-full text-xs font-semibold text-[#8B5E3C] mb-2">
                <span>Direct Hub Dispatch Scheduled</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-[#0A2947]">
                Order Confirmed & Sealed
              </h2>
              <p className="text-xs text-[#0A2947]/70 mt-1">
                Receipt Reference: <strong className="font-mono text-[#0A2947]">{confirmedOrderId}</strong>
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-4 bg-[#FAF9F6] border border-[#D3D4C0] rounded-lg text-left text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-[#D3D4C0]/50 font-semibold text-[#0A2947]">
                <span>Shipping Recipient</span>
                <span>{formData.fullName} ({formData.phone})</span>
              </div>
              <div className="flex justify-between text-[#0A2947]/80">
                <span>Destination Hub</span>
                <span>{formData.city}, Pakistan</span>
              </div>
              <div className="flex justify-between text-[#0A2947]/80">
                <span>Payment Settlement</span>
                <span className="uppercase font-semibold">
                  {formData.paymentMethod === 'cod' ? 'Cash on Delivery (Pay upon arrival)' : formData.paymentMethod.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#D3D4C0]/50 font-bold text-sm text-[#0A2947]">
                <span>Total Payable at Doorstep</span>
                <span className="font-mono text-[#8B5E3C]">{formatPKR(total)}</span>
              </div>
            </div>

            {/* Logistics Status Steps */}
            <div className="grid grid-cols-3 gap-2 text-[11px] text-[#0A2947]/80 pt-2">
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-center">
                <Package className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                <span className="font-semibold block text-emerald-800">1. Verification</span>
                <span className="text-[10px] text-emerald-700">Serial Confirmed</span>
              </div>
              <div className="p-2 bg-[#FAF9F6] border border-[#D3D4C0] rounded text-center">
                <Truck className="w-4 h-4 mx-auto mb-1 text-[#8B5E3C]" />
                <span className="font-semibold block text-[#0A2947]">2. Air Logistics</span>
                <span className="text-[10px] text-[#0A2947]/60">24-48 Hours</span>
              </div>
              <div className="p-2 bg-[#FAF9F6] border border-[#D3D4C0] rounded text-center">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#0A2947]" />
                <span className="font-semibold block text-[#0A2947]">3. Handover</span>
                <span className="text-[10px] text-[#0A2947]/60">Doorstep Inspection</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#0A2947] hover:bg-[#8B5E3C] text-white text-xs sm:text-sm font-semibold rounded-md shadow-md transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 sm:p-8 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Insured Direct Order</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0A2947] mb-6">
              Finalize Delivery & Payment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0A2947] mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mansoor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#D3D4C0] rounded-md text-xs text-[#0A2947] focus:outline-hidden focus:border-[#8B5E3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A2947] mb-1">
                    Mobile Phone (For Courier OTP) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#D3D4C0] rounded-md text-xs text-[#0A2947] focus:outline-hidden focus:border-[#8B5E3C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0A2947] mb-1">
                    Destination City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#D3D4C0] rounded-md text-xs text-[#0A2947] focus:outline-hidden focus:border-[#8B5E3C]"
                  >
                    <option value="Karachi">Karachi (Same/Next Day)</option>
                    <option value="Lahore">Lahore (24-48 Hours)</option>
                    <option value="Islamabad">Islamabad (24-48 Hours)</option>
                    <option value="Rawalpindi">Rawalpindi (24-48 Hours)</option>
                    <option value="Faisalabad">Faisalabad (48 Hours)</option>
                    <option value="Peshawar">Peshawar (48 Hours)</option>
                    <option value="Quetta">Quetta (48-72 Hours)</option>
                    <option value="Multan">Multan (48 Hours)</option>
                    <option value="Other">Other Nationwide Hub</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A2947] mb-1">
                    Email Address (For Warranty Certificate) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@domain.pk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#D3D4C0] rounded-md text-xs text-[#0A2947] focus:outline-hidden focus:border-[#8B5E3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A2947] mb-1">
                  Street Address & House/Office Unit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House 42-B, Khayaban-e-Mujahid, DHA Phase 5"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#D3D4C0] rounded-md text-xs text-[#0A2947] focus:outline-hidden focus:border-[#8B5E3C]"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#0A2947] mb-2">
                  Preferred Payment Protocol *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`p-3 rounded-lg border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#0A2947] bg-[#F3E4C9]/30 shadow-2xs'
                        : 'border-[#D3D4C0] bg-white hover:border-[#8B5E3C]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="accent-[#0A2947]"
                      />
                      <Banknote className="w-4 h-4 text-[#8B5E3C]" />
                      <span className="text-xs font-semibold text-[#0A2947]">Cash on Delivery</span>
                    </div>
                    <span className="text-[10px] text-[#0A2947]/70 mt-1 pl-5">
                      Pay cash upon doorstep inspection
                    </span>
                  </label>

                  <label
                    className={`p-3 rounded-lg border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.paymentMethod === 'raast'
                        ? 'border-[#0A2947] bg-[#F3E4C9]/30 shadow-2xs'
                        : 'border-[#D3D4C0] bg-white hover:border-[#8B5E3C]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="raast"
                        checked={formData.paymentMethod === 'raast'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'raast' })}
                        className="accent-[#0A2947]"
                      />
                      <span className="w-4 h-4 rounded-full bg-[#0A2947] text-white flex items-center justify-center text-[10px] font-bold">R</span>
                      <span className="text-xs font-semibold text-[#0A2947]">Raast Instant</span>
                    </div>
                    <span className="text-[10px] text-[#0A2947]/70 mt-1 pl-5">
                      State Bank instant zero-fee QR/IBAN
                    </span>
                  </label>

                  <label
                    className={`p-3 rounded-lg border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#0A2947] bg-[#F3E4C9]/30 shadow-2xs'
                        : 'border-[#D3D4C0] bg-white hover:border-[#8B5E3C]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className="accent-[#0A2947]"
                      />
                      <CreditCard className="w-4 h-4 text-[#8B5E3C]" />
                      <span className="text-xs font-semibold text-[#0A2947]">Card / PayPak</span>
                    </div>
                    <span className="text-[10px] text-[#0A2947]/70 mt-1 pl-5">
                      3D-Secure encrypted Visa/Mastercard
                    </span>
                  </label>
                </div>
              </div>

              {/* Order Amount Recap */}
              <div className="p-3.5 bg-[#FAF9F6] border border-[#D3D4C0] rounded-lg text-xs space-y-1.5">
                <div className="flex justify-between text-[#0A2947]/70">
                  <span>Cart Items ({items.length})</span>
                  <span className="font-mono tabular-nums">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#0A2947]/70">
                  <span>Nationwide Courier Insurance</span>
                  <span className="font-semibold text-emerald-700">INCLUDED (FREE)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D3D4C0]/50 font-bold text-sm text-[#0A2947]">
                  <span>Total Amount</span>
                  <span className="font-mono text-base text-[#8B5E3C] tabular-nums">{formatPKR(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#0A2947] hover:bg-[#8B5E3C] disabled:bg-slate-400 text-white text-xs sm:text-sm font-semibold rounded-md shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Order Allotment...</span>
                ) : (
                  <>
                    <span>Confirm & Dispatch Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
