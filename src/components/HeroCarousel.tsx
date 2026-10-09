import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroLaptopImg, heroPhoneImg, heroAudioImg, heroGamingImg } from '../data/products';

interface Slide {
  id: string;
  categorySlug: string;
  badge: string;
  headline: string;
  supportingText: string;
  ctaText: string;
  image: string;
  theme: 'dark' | 'light' | 'warm';
  bgColor: string;
  textColor: string;
  accentColor: string;
}

interface HeroCarouselProps {
  onSelectCategory: (categorySlug: string) => void;
  onOpenProduct?: (productId: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onSelectCategory }) => {
  const slides: Slide[] = [
    {
      id: 'slide-laptops',
      categorySlug: 'laptops',
      badge: 'Flagship Computing',
      headline: 'Power Meets Precision',
      supportingText: 'Discover laptops designed for work, creativity, and everything in between.',
      ctaText: 'Explore Laptops',
      image: heroLaptopImg,
      theme: 'dark',
      bgColor: 'bg-[#0A2947]',
      textColor: 'text-white',
      accentColor: 'text-[#F3E4C9]',
    },
    {
      id: 'slide-smartphones',
      categorySlug: 'smartphones',
      badge: 'Titanium Engineering',
      headline: 'Your Next Upgrade Starts Here',
      supportingText: 'Explore smartphones that bring performance and design together.',
      ctaText: 'Shop Smartphones',
      image: heroPhoneImg,
      theme: 'warm',
      bgColor: 'bg-[#F3E4C9]/35',
      textColor: 'text-[#0A2947]',
      accentColor: 'text-[#8B5E3C]',
    },
    {
      id: 'slide-accessories',
      categorySlug: 'audio',
      badge: 'Audiophile & Essentials',
      headline: 'Small Details. Better Experiences.',
      supportingText: 'Everyday tech essentials, thoughtfully selected.',
      ctaText: 'Explore Accessories',
      image: heroAudioImg,
      theme: 'light',
      bgColor: 'bg-[#FAF9F6]',
      textColor: 'text-[#0A2947]',
      accentColor: 'text-[#8B5E3C]',
    },
    {
      id: 'slide-gaming',
      categorySlug: 'gaming',
      badge: 'Smart Wearables & Audio',
      headline: 'Upgrade Your Everyday',
      supportingText: 'Discover technology built around the way you live, work, and play.',
      ctaText: 'Discover More',
      image: heroGamingImg,
      theme: 'dark',
      bgColor: 'bg-[#0A2947]',
      textColor: 'text-white',
      accentColor: 'text-[#F3E4C9]',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay with 5.5s interval, paused on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      aria-label="Hero Promotion Carousel"
      className="relative w-full overflow-hidden bg-[#0A2947] border-b border-[#D3D4C0]/40 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="relative min-h-[500px] sm:min-h-[540px] md:min-h-[580px] lg:min-h-[620px] flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const isDark = slide.theme === 'dark';

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                slide.bgColor
              } ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Editorial Headline & Copy */}
                  <div className="lg:col-span-5 z-20 space-y-4 sm:space-y-6 text-left">
                    {/* Unboxed Metadata Tag */}
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                      <span className={slide.accentColor}>{slide.badge}</span>
                      <span className={isDark ? 'text-white/40' : 'text-[#0A2947]/40'}>·</span>
                      <span className={isDark ? 'text-white/70' : 'text-[#0A2947]/70'}>
                        Curated 2026 Edition
                      </span>
                    </div>

                    {/* Headline */}
                    <h1
                      className={`text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold font-display tracking-tight leading-[1.12] ${
                        slide.textColor
                      }`}
                    >
                      {slide.headline}
                    </h1>

                    {/* Supporting Text */}
                    <p
                      className={`text-sm sm:text-base md:text-lg max-w-lg leading-relaxed ${
                        isDark ? 'text-[#D3D4C0]' : 'text-[#0A2947]/80'
                      }`}
                    >
                      {slide.supportingText}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-2 flex items-center gap-4">
                      <button
                        onClick={() => onSelectCategory(slide.categorySlug)}
                        className={`inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-md transition-all shadow-md active:scale-98 ${
                          isDark
                            ? 'bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white'
                            : 'bg-[#0A2947] hover:bg-[#0A2947]/90 text-white'
                        }`}
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectCategory('all')}
                        className={`text-xs font-medium tracking-wide underline underline-offset-4 transition-colors ${
                          isDark
                            ? 'text-[#F3E4C9] hover:text-white'
                            : 'text-[#0A2947] hover:text-[#8B5E3C]'
                        }`}
                      >
                        View Full Specs
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Hero Product Visual Presentation */}
                  <div className="lg:col-span-7 flex justify-center items-center relative">
                    <div className="relative w-full max-w-2xl aspect-16/10 rounded-lg overflow-hidden shadow-2xl border border-black/10 group">
                      <img
                        src={slide.image}
                        alt={slide.headline}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-102"
                      />
                      {/* Subtle scrim for contrast */}
                      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/20 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Navigation Controls */}
      <div className="absolute inset-y-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-3 sm:px-6">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="pointer-events-auto p-2 sm:p-3 rounded-full bg-black/25 hover:bg-black/45 text-white backdrop-blur-xs transition-all shadow-md hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="pointer-events-auto p-2 sm:p-3 rounded-full bg-black/25 hover:bg-black/45 text-white backdrop-blur-xs transition-all shadow-md hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Slide Pagination & Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-2">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-8 sm:w-10 h-2 bg-[#8B5E3C]'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          );
        })}
      </div>

      {/* Slide Indicator Text */}
      <div className="hidden md:block absolute bottom-5 right-8 z-30 text-[11px] font-mono tracking-widest text-white/70 tabular-nums">
        0{currentIndex + 1} / 0{slides.length}
      </div>
    </section>
  );
};
