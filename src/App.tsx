import { useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { Notification } from "./components/common/Notification";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import OffersPage from "./pages/OffersPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import WishlistPage from "./pages/WishlistPage";
import { ProductDetailsModal } from "./pages/ProductDetailsModal";

function AppContent() {
  const { state, dispatch } = useApp(); // أضف dispatch هنا

  useEffect(() => {
    document.title = `AAAS - ${getCurrentPageTitle(state.currentPage)}`;
  }, [state.currentPage]);

  const getCurrentPageTitle = (page: string) => {
    const titles: Record<string, string> = {
      home: "رائدة في مجال الاكسسوارات العصرية",
      products: "جميع المنتجات",
      "product-details": "تفاصيل المنتج",
      cart: "سلة التسوق",
      // offers: "العروض والخصومات",
      about: "من نحن",
      contact: "تواصل معنا",
      wishlist: "قائمة المفضلة",
    };
    return titles[page] || "متجر الكتروني";
  };

  const renderPage = () => {
    switch (state.currentPage) {
      case "home":
        return <HomePage />;
      case "products":
        return <ProductsPage />;
      case "product-details":
        return state.selectedProduct ? (
          <ProductDetailsModal
            product={state.selectedProduct}
            isOpen={true}
            onClose={() => {
              dispatch({ type: "SET_SELECTED_PRODUCT", payload: null });
              dispatch({ type: "SET_PAGE", payload: "products" });
            }}
          />
        ) : (
          <ProductsPage />
        );
      case "cart":
        return <CartPage />;
      // case "offers":
      //   return <OffersPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "wishlist":
        return <WishlistPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Notification />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
