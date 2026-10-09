import React, { useState } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProducts } from './components/FeaturedProducts';
import { PromotionalBanner } from './components/PromotionalBanner';
import { CollectionTabs } from './components/CollectionTabs';
import { WhyShopWithUs } from './components/WhyShopWithUs';
import { EditorialSection } from './components/EditorialSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { CatalogView } from './components/CatalogView';
import { Toast } from './components/Toast';

export default function App() {
  // Current view: 'home' | 'catalog'
  const [currentView, setCurrentView] = useState<'home' | 'catalog'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // E-Commerce state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  
  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'cart' | 'wishlist' | 'info'>('cart');

  const showToast = (message: string, type: 'cart' | 'wishlist' | 'info' = 'cart') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, color?: string, storage?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedStorage === storage
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedStorage: storage }];
      }
    });

    showToast(`Added ${product.name} to shopping bag.`, 'cart');
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist.`, 'wishlist');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist.`, 'wishlist');
        return [...prev, product];
      }
    });
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, 1);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Navigation handlers
  const handleSelectCategory = (categorySlug: string) => {
    if (categorySlug === 'all') {
      setSelectedCategory('all');
      setCurrentView('catalog');
    } else {
      setSelectedCategory(categorySlug);
      setCurrentView('catalog');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedCategory(null);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAllProducts = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick lookups
  const wishlistIds = new Set(wishlist.map((p) => p.id));
  const cartIds = new Set(cart.map((item) => item.product.id));
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#0A2947]">
      {/* Global Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleSelectCategory}
        onOpenAllProducts={handleOpenAllProducts}
        activeCategory={selectedCategory}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area */}
      <main className="grow">
        {currentView === 'home' ? (
          <>
            {/* Section 5: Premium Rotating Hero Banner Slider */}
            <HeroCarousel
              onSelectCategory={handleSelectCategory}
              onOpenProduct={(id) => {
                const prod = PRODUCTS.find((p) => p.id === id);
                if (prod) setQuickViewProduct(prod);
              }}
            />

            {/* Section 6: Explore Our Collections */}
            <CategoryGrid onSelectCategory={handleSelectCategory} />

            {/* Section 7: Trending Right Now (Featured Products) */}
            <FeaturedProducts
              products={PRODUCTS}
              wishlistIds={wishlistIds}
              cartIds={cartIds}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(p) => setQuickViewProduct(p)}
              onViewAll={handleOpenAllProducts}
            />

            {/* Section 8: Wide Promotional Feature Banner */}
            <PromotionalBanner onShopAll={handleOpenAllProducts} />

            {/* Section 9: Best Sellers, New Arrivals & Special Offers */}
            <CollectionTabs
              products={PRODUCTS}
              wishlistIds={wishlistIds}
              cartIds={cartIds}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(p) => setQuickViewProduct(p)}
            />

            {/* Section 10: Why Shop With Us Trust Pillars */}
            <WhyShopWithUs />

            {/* Section 11: Editorial & Interactive Buying Guide */}
            <EditorialSection onSelectCategory={handleSelectCategory} />

            {/* Section 12: Newsletter Subscription */}
            <Newsletter />
          </>
        ) : (
          /* Section 13: Full Product Listing & Catalog Shopping Experience */
          <CatalogView
            products={PRODUCTS}
            initialCategory={selectedCategory}
            wishlistIds={wishlistIds}
            cartIds={cartIds}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectCategory={handleSelectCategory}
            onBackToHome={handleGoHome}
          />
        )}
      </main>

      {/* Section 12: Comprehensive Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenAllProducts={handleOpenAllProducts}
      />

      {/* Product Detail Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          allProducts={PRODUCTS}
          isWishlisted={wishlistIds.has(quickViewProduct.id)}
          isInCart={cartIds.has(quickViewProduct.id)}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={(p) => setQuickViewProduct(p)}
        />
      )}

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onContinueShopping={() => setIsCartOpen(false)}
      />

      {/* Saved Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />

      {/* Instant Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(product) => setQuickViewProduct(product)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} type={toastType} />
    </div>
  );
}
