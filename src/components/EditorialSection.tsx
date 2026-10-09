import React, { useState } from 'react';
import { ArrowRight, Cpu, Check, Layers } from 'lucide-react';
import { lifestyleBannerImg, heroLaptopImg, heroAudioImg } from '../data/products';

interface EditorialSectionProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onSelectCategory }) => {
  const [activeGuideTab, setActiveGuideTab] = useState<'laptop' | 'phone' | 'audio'>('laptop');

  const guides = {
    laptop: {
      title: 'Workstation vs. Ultraportable Comparison',
      recommendation: 'Zenith Studio Pro 16 (Heavy Render/Code) vs. Vanguard UltraBook 14 (Mobile Exec)',
      criteria: [
        { label: 'Thermal Headroom', specA: 'Dual Vapor Chamber (105W TGP)', specB: 'Passive Airflow Fan (28W TDP)' },
        { label: 'Display Technology', specA: '3.2K 120Hz Calman OLED', specB: '2.8K 90Hz Anti-glare Touch' },
        { label: 'Battery Runtime', specA: '99.9Wh (8-10 Hours heavy load)', specB: '72Wh (14+ Hours light travel)' },
        { label: 'Chassis Weight', specA: '1.82 kg CNC Aluminium', specB: '1.18 kg Carbon Fiber Weave' },
      ],
      targetCategory: 'laptops',
    },
    phone: {
      title: 'Flagship Optics & Silicon Guide',
      recommendation: 'Aura 16 Pro Titanium (1-inch Sony Sensor) vs. Galaxy S25 Ultra (200MP Quad Tele)',
      criteria: [
        { label: 'Sensor Size', specA: '1-inch Sony LYT-900 (Large Light Well)', specB: '1/1.3-inch 200MP ISOCELL' },
        { label: 'Telephoto Zoom', specA: '5x Periscope Sensor-Shift OIS', specB: '5x Periscope + 3x Portrait Lens' },
        { label: 'Frame Material', specA: 'Grade-5 Contoured Titanium', specB: 'Grade-5 Flat Armor Titanium' },
        { label: 'Fast Charge Tech', specA: '100W SuperVOOC (25 min full)', specB: '45W Fast Charge (55 min full)' },
      ],
      targetCategory: 'smartphones',
    },
    audio: {
      title: 'Audiophile Transducer Selection',
      recommendation: 'Bowers & Wilkins Px8 (Over-Ear Planar) vs. B&O Beoplay EX (TWS Compact)',
      criteria: [
        { label: 'Acoustic Driver', specA: '40mm Angled Carbon Cone Units', specB: '9.2mm Neodymium Electro-Dynamic' },
        { label: 'Noise Cancellation', specA: '6-Mic Hybrid Adaptive Room ANC', specB: '4-Mic Ergonomic In-Ear Feedforward' },
        { label: 'Wireless Bitrate', specA: 'aptX Adaptive 24-bit/96kHz', specB: 'aptX Adaptive + AAC HD' },
        { label: 'Battery Capacity', specA: '30 Hours continuous playback', specB: '28 Hours total with charging case' },
      ],
      targetCategory: 'audio',
    },
  };

  const editorialStories = [
    {
      id: 'work',
      category: 'laptops',
      title: 'Work & Productivity',
      subtitle: 'The Executive Studio',
      description: 'Zero latency multitasking, calibrated color accuracy, and all-day thermal stability built for software architects and creative directors.',
      image: lifestyleBannerImg,
      tag: '01. Focus & Flow',
    },
    {
      id: 'gaming',
      category: 'gaming',
      title: 'Entertainment & Gaming',
      subtitle: 'Acoustic Immersion',
      description: 'Pinpoint spatial audio tracking and ultra-low latency peripherals designed to react at the speed of reflex.',
      image: heroLaptopImg,
      tag: '02. Reflex & Realm',
    },
    {
      id: 'essentials',
      category: 'phone-accessories',
      title: 'Everyday Essentials',
      subtitle: 'Tactile Precision',
      description: 'Solid American Walnut MagSafe docks, Kevlar braided high-power cables, and precision GaN fast charging stations.',
      image: heroAudioImg,
      tag: '03. Daily Rituals',
    },
  ];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D3D4C0]/40">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#D3D4C0]/50 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-2">
            <span>Living With Design</span>
            <span className="text-[#0A2947]/30">/</span>
            <span className="text-[#0A2947]/70">Curated Context</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0A2947] tracking-tight">
            Technology That Fits Your Life
          </h2>
        </div>
        <p className="text-sm text-[#0A2947]/70 max-w-md">
          Hardware engineered not to demand attention, but to seamlessly elevate the spaces and rituals of your everyday life.
        </p>
      </div>

      {/* 3 Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {editorialStories.map((story) => (
          <div
            key={story.id}
            onClick={() => onSelectCategory(story.category)}
            className="group cursor-pointer rounded-xl overflow-hidden bg-white border border-[#D3D4C0]/60 hover:border-[#8B5E3C]/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF9F6]">
              <img
                src={story.image}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-104"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-[#0A2947]/90 backdrop-blur-xs text-[#F3E4C9] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-xs">
                {story.tag}
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between grow">
              <div>
                <p className="text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider mb-1">
                  {story.subtitle}
                </p>
                <h3 className="text-lg font-bold text-[#0A2947] group-hover:text-[#8B5E3C] transition-colors mb-2">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#0A2947]/75 leading-relaxed">
                  {story.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#D3D4C0]/40 flex items-center justify-between text-xs font-semibold text-[#8B5E3C] group-hover:text-[#0A2947] transition-colors">
                <span>View Recommended Setup</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Buying Guide & Spec Comparison Widget */}
      <div className="bg-[#FAF9F6] border border-[#D3D4C0] rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#D3D4C0]/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>Interactive Tech Decision Guide</span>
            </div>
            <h3 className="text-xl font-bold font-display text-[#0A2947]">
              Compare Specifications & Choose With Confidence
            </h3>
            <p className="text-xs text-[#0A2947]/70 mt-1">
              Real architectural benchmarks to help you invest in hardware tailored to your workload.
            </p>
          </div>

          {/* Segmented Selector for Guide */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-[#D3D4C0] self-start lg:self-auto">
            <button
              onClick={() => setActiveGuideTab('laptop')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeGuideTab === 'laptop'
                  ? 'bg-[#0A2947] text-white'
                  : 'text-[#0A2947]/70 hover:text-[#0A2947]'
              }`}
            >
              Laptops & Chips
            </button>
            <button
              onClick={() => setActiveGuideTab('phone')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeGuideTab === 'phone'
                  ? 'bg-[#0A2947] text-white'
                  : 'text-[#0A2947]/70 hover:text-[#0A2947]'
              }`}
            >
              Flagship Cameras
            </button>
            <button
              onClick={() => setActiveGuideTab('audio')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeGuideTab === 'audio'
                  ? 'bg-[#0A2947] text-white'
                  : 'text-[#0A2947]/70 hover:text-[#0A2947]'
              }`}
            >
              Audio Drivers
            </button>
          </div>
        </div>

        {/* Selected Guide Table */}
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[#0A2947] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8B5E3C]" />
              <span>{guides[activeGuideTab].title}</span>
            </h4>
            <span className="text-xs text-[#8B5E3C] font-medium hidden sm:inline">
              {guides[activeGuideTab].recommendation}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#D3D4C0] text-[#0A2947]/60 uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 font-semibold">Specification Metric</th>
                  <th className="py-2.5 font-semibold text-[#0A2947]">Primary Flagship Tier</th>
                  <th className="py-2.5 font-semibold text-[#8B5E3C]">Specialized Mobile Tier</th>
                  <th className="py-2.5 font-semibold text-right">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D3D4C0]/40">
                {guides[activeGuideTab].criteria.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/60 transition-colors">
                    <td className="py-3 font-medium text-[#0A2947]">{item.label}</td>
                    <td className="py-3 text-[#0A2947]/80">{item.specA}</td>
                    <td className="py-3 text-[#0A2947]/80">{item.specB}</td>
                    <td className="py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => onSelectCategory(guides[activeGuideTab].targetCategory)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A2947] hover:bg-[#8B5E3C] text-white text-xs font-semibold rounded-md transition-all shadow-xs"
            >
              <span>Explore {guides[activeGuideTab].targetCategory.toUpperCase()} Lineup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
