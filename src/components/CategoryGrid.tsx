import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoryGridProps {
  onSelectCategory: (slug: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#D3D4C0]/50 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-2">
            <span>Curated Taxonomy</span>
            <span className="text-[#0A2947]/30">/</span>
            <span className="text-[#0A2947]/70">8 Specialized Categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0A2947] tracking-tight">
            Explore Our Collections
          </h2>
        </div>
        <p className="text-sm text-[#0A2947]/70 max-w-md">
          Precision-engineered hardware and bespoke tech essentials crafted to elevate every aspect of your digital workflow.
        </p>
      </div>

      {/* Grid of 8 Collections */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((category) => {
          return (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className="group cursor-pointer rounded-lg bg-white border border-[#D3D4C0]/70 overflow-hidden shadow-xs hover:shadow-md hover:border-[#8B5E3C]/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#FAF9F6] p-3 flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center rounded-sm transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs p-1.5 rounded-full text-[#0A2947] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5E3C]" />
                </div>
              </div>

              {/* Information Row */}
              <div className="p-4 bg-white flex flex-col justify-between grow border-t border-[#D3D4C0]/40">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#0A2947]/60 mb-1">
                    <span>{category.itemCount} Devices</span>
                    <span className="font-mono text-[#8B5E3C]">Series 2026</span>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-[#0A2947] group-hover:text-[#8B5E3C] transition-colors leading-snug">
                    {category.name}
                  </h3>
                </div>

                <div className="mt-3 flex items-center text-xs font-semibold text-[#8B5E3C] gap-1 group-hover:gap-1.5 transition-all">
                  <span>Explore Collection</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
