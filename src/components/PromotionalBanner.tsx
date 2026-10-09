import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';
import { lifestyleBannerImg } from '../data/products';

interface PromotionalBannerProps {
  onShopAll: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onShopAll }) => {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden bg-[#0A2947] text-white shadow-xl border border-[#D3D4C0]/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 z-10 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#F3E4C9]">
              <Award className="w-4 h-4 text-[#8B5E3C]" />
              <span>Architectural Technology Standard</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight leading-[1.15] text-white">
              Better Technology.<br />
              <span className="text-[#F3E4C9]">Smarter Choices.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#D3D4C0] max-w-lg leading-relaxed">
              Find the devices and accessories that fit your everyday needs. Every laptop, smartphone, and acoustic transducer in our catalog undergoes rigorous thermal, acoustic, and build-quality auditing.
            </p>

            {/* 3 Pillar highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs text-[#D3D4C0]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F3E4C9] shrink-0" />
                <span>100% Genuine Box-Packed</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#F3E4C9] shrink-0" />
                <span>24-Hour Dispatch Priority</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onShopAll}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white text-xs sm:text-sm font-semibold rounded-md shadow-md transition-all active:scale-98"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Imagery Column */}
          <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[380px] overflow-hidden">
            <img
              src={lifestyleBannerImg}
              alt="Curated tech workspace setup"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#0A2947] via-[#0A2947]/30 to-transparent pointer-events-none hidden lg:block" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0A2947] via-[#0A2947]/40 to-transparent pointer-events-none lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
};
