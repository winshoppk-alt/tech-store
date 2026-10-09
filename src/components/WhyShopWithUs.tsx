import React from 'react';
import { ShieldCheck, CircleDollarSign, Lock, Truck, Headphones, RotateCcw } from 'lucide-react';

export const WhyShopWithUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Authentic Products',
      description: 'Direct procurement from official international brands with verified serial numbers and tamper-evident factory seals.',
    },
    {
      icon: CircleDollarSign,
      title: 'Competitive Prices',
      description: 'Transparent national pricing with zero hidden surcharges or surprise customs fees upon doorstep arrival.',
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'Cash on Delivery (COD) across Pakistan, encrypted 3D-Secure debit/credit card processing, and direct Raast transfers.',
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      description: 'Fast, insured logistics via premier courier networks with SMS tracking from our central Karachi fulfillment hub.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Experienced tech specialists available 6 days a week via phone, WhatsApp, and email to guide your device choice.',
    },
    {
      icon: RotateCcw,
      title: 'Clear Warranty & Returns',
      description: '7-day replacement guarantee on manufacturing defects plus 1-year official hardware service assistance.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D3D4C0]/40">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-2">
          Trust & Excellence
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0A2947] tracking-tight">
          Why Shop With Vanguard Tech
        </h2>
        <p className="mt-2 text-sm text-[#0A2947]/70">
          We treat technology acquisition with the care, transparency, and warranty rigor it deserves.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-lg bg-white border border-[#D3D4C0]/60 hover:border-[#8B5E3C]/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-md bg-[#0A2947] flex items-center justify-center text-[#F3E4C9] mb-4 shadow-2xs">
                  <Icon className="w-5 h-5 text-[#F3E4C9]" />
                </div>
                <h3 className="font-semibold text-base text-[#0A2947] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#0A2947]/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
