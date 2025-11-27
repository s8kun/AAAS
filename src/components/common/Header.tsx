import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/data/config";
import logo from "@/assets/logo.png";

export function Header() {
  const { state, dispatch } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = state.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const wishlistCount = state.wishlist.length;

  const navigationLinks = [
    { id: "home", label: "الرئيسية" },
    { id: "products", label: "المنتجات" },
    // { id: 'offers', label: 'العروض' },
    { id: "about", label: "من نحن" },
    { id: "contact", label: "تواصل معنا" },
  ];

  const handleNavigate = (page: string) => {
    dispatch({ type: "SET_PAGE", payload: page });
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 hover-lift group"
          >
            <img src={logo} alt={SITE_CONFIG.name} className="w-12 h-12" />
            <div className="text-right">
              <h1 className="text-2xl font-bold text-primary">
                {SITE_CONFIG.name}
              </h1>
              <p className="text-xs text-muted-foreground hidden md:block">
                {SITE_CONFIG.tagline}
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navigationLinks.map((link) => (
              <Button
                key={link.id}
                variant={state.currentPage === link.id ? "default" : "ghost"}
                onClick={() => handleNavigate(link.id)}
              >
                {link.label}
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNavigate("wishlist")}
              className="relative"
            >
              <Heart
                className={
                  wishlistCount > 0 ? "fill-destructive text-destructive" : ""
                }
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNavigate("cart")}
              className="relative"
            >
              <ShoppingCart />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-2 animate-slide-in">
            {navigationLinks.map((link) => (
              <Button
                key={link.id}
                variant={state.currentPage === link.id ? "default" : "ghost"}
                onClick={() => handleNavigate(link.id)}
                className="w-full justify-center"
              >
                {link.label}
              </Button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
