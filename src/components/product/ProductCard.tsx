import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Eye, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { useApp } from "@/context/AppContext";
import { Product } from "@/data/products";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useApp();
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // الصورة الخارجية تُعرض في الكارد
  const exterior = product.exteriorImage ?? null;
  // للـ QuickView / Modal نستخدم interiorImages (Swiper)
  const interiorImages = product.interiorImages ?? [];

  // إعادة تعيين حالة التحميل عند تغيير الصورة الخارجية
  useEffect(() => {
    if (!exterior) {
      setImageLoaded(true);
      return;
    }
    if (!exterior.startsWith("http")) {
      setImageLoaded(true);
    } else {
      setImageLoaded(false);
    }
  }, [exterior]);

  const isInWishlist = state.wishlist.some((item) => item.id === product.id);
  const isInCart = state.cart.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity,
      },
    });

    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now().toString(),
        type: "success",
        message: `تم إضافة ${product.name} إلى السلة (${quantity})`,
      },
    });

    setQuantity(1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: Date.now().toString(),
          type: "info",
          message: "تم الإزالة من المفضلة",
        },
      });
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: Date.now().toString(),
          type: "success",
          message: "تم الإضافة إلى المفضلة",
        },
      });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(true);
  };

  return (
    <>
      <div
        className="group relative bg-card rounded-xl shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden border border-border hover-lift cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        {/* الشارات */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.discountPercentage > 0 && (
            <Badge
              variant="danger"
              className="shadow-medium animate-pulse-soft"
            >
              خصم {product.totalDiscountPercentage}%
            </Badge>
          )}
          {product.featured && (
            <Badge
              variant="default"
              className="bg-secondary text-secondary-foreground"
            >
              ⭐ الأكثر مبيعاً
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="outline" className="bg-muted">
              نفذت الكمية
            </Badge>
          )}
        </div>

        {/* المفضلة */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-medium hover:scale-110 transition-smooth"
          aria-label={isInWishlist ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        >
          <Heart
            className={`w-5 h-5 ${
              isInWishlist
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            }`}
          />
        </button>

        {/* صورة المنتج (الخارجية) */}
        <div className="relative h-64 bg-gradient-subtle flex items-center justify-center overflow-hidden">
          {exterior &&
          typeof exterior === "string" &&
          exterior.startsWith("http") ? (
            <img
              src={exterior}
              alt={product.name}
              className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${
                !imageLoaded ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          ) : (
            <div
              className={`text-8xl transform group-hover:scale-110 transition-transform duration-500 ${
                !imageLoaded ? "opacity-0" : "opacity-100"
              }`}
            >
              {exterior ?? "🖼️"}
            </div>
          )}

          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-subtle">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* أزرار سريعة */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full md:group-hover:translate-y-0 transition-transform duration-120 flex gap-2 justify-center md:opacity-0 md:group-hover:opacity-100 opacity-100">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleQuickView}
              className="flex-1 max-w-[150px] shadow-medium backdrop-blur-sm"
            >
              <Eye className="w-4 h-4" />
              <span className="mr-1">عرض سريع</span>
            </Button>
            {product.inStock && (
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`flex-1 max-w-[150px] shadow-medium backdrop-blur-sm ${
                  isInCart ? "bg-muted" : ""
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="mr-1">{isInCart ? "في السلة" : "أضف"}</span>
              </Button>
            )}
          </div>
        </div>

        {/* التفاصيل (كما كانت) */}
        <div className="p-5">
          {/* التقييم */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-muted-foreground/30"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews} تقييم)
            </span>
          </div>

          {/* الاسم */}
          <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* الحجم */}
          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
            <span className="font-medium text-foreground">الحجم:</span>
            {product.size}
          </p>

          {/* السعر */}
          <div className="flex items-baseline gap-2 mb-4">
            {product.discountPercentage > 0 ? (
              <>
                <span className="text-2xl font-bold text-primary">
                  {product.price} دينار
                </span>
                <span className="text-sm line-through text-muted-foreground">
                  {product.originalPrice} دينار
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary">
                {product.price} دينار
              </span>
            )}
          </div>

          {/* عرض التوفير */}
          {product.savings > 0 && (
            <div className="bg-primary/10 rounded-lg p-2 mb-4 text-center border border-primary/20">
              <p className="text-sm font-bold text-primary">
                🎉 وفّر {product.savings} دينار!
              </p>
            </div>
          )}

          {/* الكمية */}
          <div className="flex items-center justify-center gap-2 bg-muted/30 rounded-lg p-2 mb-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(Math.max(1, quantity - 1));
              }}
              disabled={quantity <= 1}
              className="h-8 w-8"
            >
              <Minus className="w-4 h-4" />
            </Button>

            <div className="text-center min-w-[60px]">
              <span className="text-lg font-bold block">{quantity}</span>
              <span className="text-xs text-muted-foreground">الكمية</span>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(quantity + 1);
              }}
              className="h-8 w-8"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* عرض المجموع */}
          {quantity > 1 && (
            <div className="bg-primary/10 rounded-lg p-2 mb-4 text-center border-2 border-primary/30">
              <span className="text-sm text-muted-foreground">المجموع: </span>
              <span className="text-xl font-bold text-primary">
                {product.price * quantity} دينار
              </span>
            </div>
          )}

          {/* الأزرار الرئيسية */}
          <div className="flex gap-2">
            <Button
              className="flex-1 shadow-soft"
              onClick={handleAddToCart}
              disabled={!product.inStock || isInCart}
            >
              <ShoppingCart className="w-4 h-4" />
              {!product.inStock
                ? "نفذت الكمية"
                : isInCart
                ? "في السلة"
                : "أضف للسلة"}
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleQuickView}
              className="shadow-soft"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>

          {/* معلومات إضافية */}
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>🛍️ تم البيع: {product.soldCount}+</span>
            <span>📦 متوفر</span>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showDetails && (
        <QuickViewModal
          product={product}
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}

// Quick View Modal - يستعمل Swiper لعرض interiorImages
function QuickViewModal({
  product,
  isOpen,
  onClose,
}: {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { dispatch } = useApp();
  const [quantity, setQuantity] = useState(1);

  const interiorImages = product.interiorImages ?? [];

  if (!isOpen) return null;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now().toString(),
        type: "success",
        message: `تم إضافة ${product.name} إلى السلة`,
      },
    });
    onClose();
  };

  const handleViewDetails = () => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
    dispatch({ type: "SET_PAGE", payload: "product-details" });
    window.scrollTo({ top: 0, behavior: "smooth" });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-scale-in"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl shadow-large max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-foreground">
              {product.name}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* الصورة - Swiper يعرض interiorImages */}
            <div className="aspect-square bg-gradient-subtle rounded-xl overflow-hidden flex items-center justify-center">
              {interiorImages && interiorImages.length > 0 ? (
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper w-full h-full"
                >
                  {interiorImages.map((src, idx) => (
                    <SwiperSlide
                      key={idx}
                      className="flex items-center justify-center"
                    >
                      {typeof src === "string" && src.startsWith("http") ? (
                        <img
                          src={src}
                          alt={`${product.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-9xl">{src ?? "🖼️"}</div>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="text-9xl">{product.exteriorImage ?? "🖼️"}</div>
              )}
            </div>

            {/* التفاصيل (كما كانت) */}
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {product.price} دينار
                  </span>
                  {product.originalPrice !== product.price && (
                    <span className="text-lg line-through text-muted-foreground">
                      {product.originalPrice} دينار
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  الحجم: {product.size}
                </p>
              </div>

              {/* الكمية */}
              <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="flex-1 text-center">
                  <span className="text-xl font-bold">{quantity}</span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {quantity > 1 && (
                <div className="bg-primary/10 rounded-lg p-3 text-center border border-primary/20">
                  <span className="text-sm text-muted-foreground">
                    المجموع:{" "}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {product.price * quantity} دينار
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4" />
                  أضف للسلة
                </Button>
                <Button variant="outline" onClick={handleViewDetails}>
                  التفاصيل الكاملة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
