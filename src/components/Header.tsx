import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (categorySlug: string) => void;
  onOpenAllProducts: () => void;
  activeCategory: string | null;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  onOpenAllProducts,
  activeCategory,
  onGoHome,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', action: onGoHome, isHome: true },
    { label: 'Laptops', slug: 'laptops' },
    { label: 'Smartphones', slug: 'smartphones' },
    { label: 'Accessories', slug: 'phone-accessories' },
    { label: 'Audio', slug: 'audio' },
    { label: 'Smartwatches', slug: 'smartwatches' },
    { label: 'Gaming', slug: 'gaming' },
    { label: 'Deals', slug: 'deals' },
  ];

  const handleNavClick = (item: { label: string; slug?: string; isHome?: boolean }) => {
    if (item.isHome) {
      onGoHome();
    } else if (item.slug === 'deals') {
      onSelectCategory('deals');
    } else if (item.slug) {
      onSelectCategory(item.slug);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Layer 1: Announcement Bar */}
      <div className="bg-[#0A2947] text-[#F3E4C9] text-xs font-medium tracking-wide py-2 px-4 transition-all border-b border-[#0A2947]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#8B5E3C] font-semibold">VANGUARD INSURED</span>
            <span className="hidden sm:inline text-white/40">/</span>
            <span className="truncate">Free Express Insured Delivery Across Pakistan on Orders Over PKR 25,000</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-xs text-[#D3D4C0]">
            <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F3E4C9]" />
              Official 1-Year Local Warranty
            </span>
            <span className="text-white/30">|</span>
            <span className="text-[#F3E4C9] font-medium">UAN: (021) 111-826-482</span>
          </div>
        </div>
      </div>

      {/* Layer 2: Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md shadow-xs border-b border-[#D3D4C0]/50'
            : 'bg-[#FAF9F6] border-b border-[#D3D4C0]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Brand Logo Zone */}
          <div className="flex items-center gap-3">
            <button
              onClick={onGoHome}
              className="text-left group flex items-center gap-2.5 focus:outline-hidden"
              aria-label="Vanguard Tech Home"
            >
              <div className="w-8 h-8 rounded-sm bg-[#0A2947] flex items-center justify-center text-[#F3E4C9] font-bold tracking-tighter text-base shadow-xs group-hover:bg-[#8B5E3C] transition-colors">
                V
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0A2947] font-display uppercase block leading-none">
                  Vanguard<span className="text-[#8B5E3C]">.</span>Tech
                </span>
                <span className="text-[10px] tracking-widest text-[#0A2947]/60 uppercase font-medium">
                  Curated Consumer Electronics
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-medium tracking-normal text-[#0A2947]">
            {navItems.map((item) => {
              const isActive =
                (item.isHome && activeCategory === null) ||
                (item.slug && activeCategory === item.slug);

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`whitespace-nowrap transition-colors relative py-1 focus:outline-hidden ${
                    isActive
                      ? 'text-[#0A2947] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#8B5E3C]'
                      : 'text-[#0A2947]/75 hover:text-[#0A2947]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Zone: Search, Wishlist, Cart, Account */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#0A2947]/80 hover:text-[#0A2947] hover:bg-[#D3D4C0]/30 rounded-md transition-colors"
              aria-label="Search tech catalog"
            >
              <Search className="w-4 h-4 text-[#0A2947]" />
              <span className="hidden md:inline text-xs text-[#0A2947]/70">Search devices...</span>
            </button>

            {/* Account Trigger */}
            <button
              onClick={() => setAccountModalOpen(true)}
              className="p-2 text-[#0A2947]/80 hover:text-[#0A2947] hover:bg-[#D3D4C0]/30 rounded-md transition-colors relative"
              aria-label="Account details"
              title="Customer Account"
            >
              <User className="w-4 h-4 text-[#0A2947]" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#0A2947]/80 hover:text-[#0A2947] hover:bg-[#D3D4C0]/30 rounded-md transition-colors relative"
              aria-label="View wishlist"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4 text-[#0A2947]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B5E3C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 py-2 bg-[#0A2947] hover:bg-[#0A2947]/90 text-white rounded-md text-xs font-medium transition-colors shadow-xs"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#F3E4C9]" />
              <span className="hidden sm:inline font-semibold">Bag</span>
              <span className="bg-[#8B5E3C] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0A2947] hover:bg-[#D3D4C0]/30 rounded-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-[#FAF9F6] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D3D4C0]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#0A2947] text-[#F3E4C9] font-bold flex items-center justify-center text-sm rounded-xs">
                    V
                  </div>
                  <span className="font-bold text-base tracking-tight font-display text-[#0A2947]">
                    VANGUARD TECH
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-md hover:bg-[#D3D4C0]/30 text-[#0A2947]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Bar */}
              <div className="mt-5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-white border border-[#D3D4C0] rounded-md text-xs text-[#0A2947]/70 text-left hover:border-[#8B5E3C] transition-colors"
                >
                  <Search className="w-4 h-4 text-[#8B5E3C]" />
                  <span>Search laptops, phones, audio...</span>
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="mt-6 flex flex-col space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center justify-between px-3 py-3 text-sm font-medium text-[#0A2947] hover:bg-[#F3E4C9]/40 rounded-md transition-colors text-left"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#8B5E3C]/60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Footer Trust */}
            <div className="pt-6 border-t border-[#D3D4C0] space-y-3">
              <div className="bg-[#0A2947] text-white p-3.5 rounded-lg text-xs space-y-1">
                <p className="font-semibold text-[#F3E4C9]">Official Warranty Guarantee</p>
                <p className="text-white/80 text-[11px]">
                  All devices backed by official brand warranty and insured nationwide transit.
                </p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAllProducts();
                }}
                className="w-full py-2.5 bg-[#8B5E3C] text-white text-xs font-semibold rounded-md hover:bg-[#8B5E3C]/90 transition-colors"
              >
                Browse Full Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Info Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D3D4C0] rounded-xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in duration-150">
            <button
              onClick={() => setAccountModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-slate-100 text-[#0A2947]"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-[#D3D4C0]/60">
              <div className="w-10 h-10 rounded-full bg-[#0A2947] text-[#F3E4C9] font-bold flex items-center justify-center text-sm">
                VP
              </div>
              <div>
                <h3 className="font-semibold text-base text-[#0A2947]">Vanguard Privileged Member</h3>
                <p className="text-xs text-[#0A2947]/70">Member ID: VN-PK-8921</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-[#FAF9F6] rounded-lg border border-[#D3D4C0]/60 flex justify-between items-center">
                <span className="text-[#0A2947]/80">Concierge Support</span>
                <span className="font-semibold text-[#8B5E3C]">Active · 24/7 Priority</span>
              </div>
              <div className="p-3 bg-[#FAF9F6] rounded-lg border border-[#D3D4C0]/60 flex justify-between items-center">
                <span className="text-[#0A2947]/80">Reward Points</span>
                <span className="font-semibold text-[#0A2947] tabular-nums">4,850 pts (₨ 4,850 value)</span>
              </div>
              <div className="p-3 bg-[#FAF9F6] rounded-lg border border-[#D3D4C0]/60 flex justify-between items-center">
                <span className="text-[#0A2947]/80">Primary Shipping Hub</span>
                <span className="font-medium text-[#0A2947]">Karachi, Pakistan</span>
              </div>
            </div>

            <button
              onClick={() => setAccountModalOpen(false)}
              className="mt-5 w-full py-2.5 bg-[#0A2947] text-white text-xs font-semibold rounded-md hover:bg-[#0A2947]/90 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};
