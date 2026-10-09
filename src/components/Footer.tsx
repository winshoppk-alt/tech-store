import React, { useState } from 'react';
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink, X } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (categorySlug: string) => void;
  onOpenAllProducts: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAllProducts }) => {
  const [policyModal, setPolicyModal] = useState<string | null>(null);

  const policyContent: Record<string, { title: string; content: string }> = {
    shipping: {
      title: 'Shipping & Delivery Policy',
      content: 'All orders over PKR 25,000 qualify for free insured express delivery nationwide across Pakistan. Deliveries to major metropolitan hubs (Karachi, Lahore, Islamabad, Rawalpindi) typically arrive within 24 to 48 hours. Secondary regional centers take 48 to 72 hours. All parcels require signature and OTP verification upon delivery.',
    },
    returns: {
      title: '7-Day Return & Replacement Policy',
      content: 'We offer a straightforward 7-day inspection guarantee. If your device arrives with verified manufacturer defects, shipping damage, or hardware non-conformance, our logistics team will collect the parcel at our expense and issue an immediate replacement or full reimbursement.',
    },
    warranty: {
      title: 'Official 1-Year Local Hardware Warranty',
      content: 'All products purchased through Vanguard Tech are covered under authentic brand manufacturer warranties or Vanguard Tech 1-Year Direct Service Guarantee. We manage all brand service center claims on your behalf without third-party handling fees.',
    },
    privacy: {
      title: 'Privacy Policy & Data Security',
      content: 'We adhere to the highest international data protection protocols. Customer phone numbers and addresses are strictly used for logistics routing and order confirmation. We never share, sell, or monetize user data with third-party advertisers.',
    },
  };

  return (
    <>
      <footer className="bg-[#0A2947] text-[#D3D4C0] border-t border-[#0A2947]/80 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            {/* Column 1: Brand & Bio */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-sm bg-[#8B5E3C] text-white flex items-center justify-center font-bold text-base shadow-xs">
                  V
                </div>
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  VANGUARD<span className="text-[#8B5E3C]">.</span>TECH
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-[#D3D4C0]/85 leading-relaxed max-w-sm">
                Curating high-performance consumer hardware, flagship mobile silicon, audiophile acoustics, and executive workstation accessories for discerning technologists across Pakistan.
              </p>

              <div className="pt-2 text-xs space-y-2 text-[#D3D4C0]/90">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                  <span>Suite 702, Executive Tower, Clifton Block 5, Karachi</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                  <span>UAN: (021) 111-826-482 · Mon-Sat (10 AM - 8 PM PKT)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                  <span>concierge@vanguardtech.pk</span>
                </div>
              </div>
            </div>

            {/* Column 2: Collections */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3E4C9] mb-4">
                Shop Collections
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    onClick={() => onSelectCategory('laptops')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Laptops & Workstations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectCategory('smartphones')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Flagship Smartphones
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectCategory('audio')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Earbuds & Over-Ear Audio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectCategory('smartwatches')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Titanium Smartwatches
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectCategory('gaming')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Precision Gaming Gear
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectCategory('chargers')}
                    className="hover:text-white transition-colors text-left"
                  >
                    GaN IV Fast Chargers
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenAllProducts}
                    className="text-[#F3E4C9] font-medium hover:underline transition-colors flex items-center gap-1 mt-1"
                  >
                    <span>Browse All Inventory</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Policies */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3E4C9] mb-4">
                Customer Care
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    onClick={() => setPolicyModal('shipping')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Nationwide Shipping
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('returns')}
                    className="hover:text-white transition-colors text-left"
                  >
                    7-Day Inspection Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('warranty')}
                    className="hover:text-white transition-colors text-left"
                  >
                    1-Year Official Warranty
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('privacy')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Privacy & Compliance
                  </button>
                </li>
                <li>
                  <span className="text-[#D3D4C0]/60">Corporate Procurement B2B</span>
                </li>
                <li>
                  <span className="text-[#D3D4C0]/60">Order Status & Dispatch</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Trust & Guarantee */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3E4C9] mb-4">
                Security & Delivery
              </h4>
              <div className="space-y-3 text-xs text-[#D3D4C0]/90">
                <div className="p-3 bg-white/5 rounded-md border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#8B5E3C]" />
                    <span>Direct Box-Packed</span>
                  </div>
                  <p className="text-[11px] text-[#D3D4C0]/70">
                    No refurbished units. 100% factory-sealed original inventory.
                  </p>
                </div>
                <div className="text-[11px] text-[#D3D4C0]/70">
                  Payments supported via: Cash on Delivery, Raast Instant Pay, Visa, Mastercard, and Direct PayPak.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Payment Badges & Copyright */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#D3D4C0]/70">
            <div>
              © {new Date().getFullYear()} Vanguard Tech Pakistan. All rights reserved.
            </div>

            {/* Payment Method Badges */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="px-2.5 py-1 bg-white/10 rounded-sm text-[11px] font-mono text-white">
                Cash On Delivery
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded-sm text-[11px] font-mono text-white">
                Raast P2M
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded-sm text-[11px] font-mono text-white">
                Visa / 3D-Secure
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded-sm text-[11px] font-mono text-white">
                Mastercard
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded-sm text-[11px] font-mono text-white">
                PayPak
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      {policyModal && policyContent[policyModal] && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D3D4C0] rounded-xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in duration-150 text-[#0A2947]">
            <button
              onClick={() => setPolicyModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-slate-100 text-[#0A2947]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold font-display mb-3 text-[#0A2947]">
              {policyContent[policyModal].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#0A2947]/80 leading-relaxed">
              {policyContent[policyModal].content}
            </p>
            <button
              onClick={() => setPolicyModal(null)}
              className="mt-6 w-full py-2.5 bg-[#0A2947] text-white text-xs font-semibold rounded-md hover:bg-[#8B5E3C] transition-colors"
            >
              Close Notice
            </button>
          </div>
        </div>
      )}
    </>
  );
};
