import { useState } from "react";
import {
  X,
  ShoppingCart,
  Heart,
  Star,
  Package,
  Droplets,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { useApp } from "@/context/AppContext";
import { Product } from "@/data/products";
// Removed Swiper imports

interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  const { state, dispatch } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Manual image slider state
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Responsive check for desktop/laptop (not needed for arrows now)

  const isInWishlist = state.wishlist.some((item) => item.id === product.id);
  const isInCart = state.cart.some((item) => item.id === product.id);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity,
      },
    });
    onClose();
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-scale-in"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl shadow-large max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-foreground">تفاصيل المنتج</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-smooth"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* الصورة */}
            <div className="space-y-4">
              <div
                className="relative aspect-square bg-gradient-subtle rounded-xl overflow-hidden flex items-center justify-center"
                style={{ minHeight: 300, minWidth: 300 }}
              >
                {/* Manual slider for interiorImages */}
                {product.interiorImages && product.interiorImages.length > 0 ? (
                  <>
                    {typeof product.interiorImages[currentImageIdx] ===
                      "string" &&
                    product.interiorImages[currentImageIdx].startsWith(
                      "http"
                    ) ? (
                      <img
                        src={product.interiorImages[currentImageIdx]}
                        alt={`${product.name} ${currentImageIdx + 1}`}
                        className="w-full h-full object-cover"
                        style={{ maxHeight: 400, maxWidth: "100%" }}
                      />
                    ) : (
                      <div className="text-9xl">
                        {product.interiorImages[currentImageIdx] ?? "🖼️"}
                      </div>
                    )}

                    {/* Navigation arrows for all devices */}
                    {product.interiorImages.length > 1 && (
                      <>
                        <button
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-muted/70 rounded-full p-2 hover:bg-muted z-20"
                          onClick={() =>
                            setCurrentImageIdx((prev) =>
                              prev === product.interiorImages.length - 1
                                ? 0
                                : prev + 1
                            )
                          }
                          style={{ minWidth: 32 }}
                        >
                          <ArrowLeft />
                        </button>
                        <button
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-muted/70 rounded-full p-2 hover:bg-muted z-20"
                          onClick={() =>
                            setCurrentImageIdx((prev) =>
                              prev === 0
                                ? product.interiorImages.length - 1
                                : prev - 1
                            )
                          }
                          style={{ minWidth: 32 }}
                        >
                          <ArrowRight />
                        </button>
                      </>
                    )}
                    {/* Dots for mobile and desktop */}
                    {product.interiorImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {product.interiorImages.map((_, idx) => (
                          <button
                            key={idx}
                            className={`w-3 h-3 rounded-full ${
                              idx === currentImageIdx
                                ? "bg-primary"
                                : "bg-muted-foreground/30"
                            }`}
                            onClick={() => setCurrentImageIdx(idx)}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : product.exteriorImage &&
                  product.exteriorImage.startsWith("http") ? (
                  <img
                    src={product.exteriorImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: 400, maxWidth: "100%" }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-9xl">
                    {product.exteriorImage ?? "🖼️"}
                  </div>
                )}

                {/* الشارات */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.discountPercentage > 0 && (
                    <Badge variant="danger" className="shadow-medium">
                      خصم {product.totalDiscountPercentage}%
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge className="bg-secondary text-secondary-foreground">
                      ⭐ الأكثر مبيعاً
                    </Badge>
                  )}
                </div>
              </div>

              {/* التقييم والمبيعات */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} تقييم)
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  🛍️ {product.soldCount}+ مبيعات
                </div>
              </div>
            </div>

            {/* المعلومات */}
            <div className="space-y-6">
              {/* العنوان والسعر */}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                <div className="flex items-baseline gap-3 mb-4">
                  {product.discountPercentage > 0 ? (
                    <>
                      <span className="text-4xl font-bold text-primary">
                        {product.price} دينار
                      </span>
                      <span className="text-xl line-through text-muted-foreground">
                        {product.originalPrice} دينار
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-primary">
                      {product.price} دينار
                    </span>
                  )}
                </div>

                {product.savings > 0 && (
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-primary font-bold">
                      وفّر {product.savings} دينار!
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Package className="w-5 h-5 text-primary" />
                  <span>
                    الحجم:{" "}
                    <strong className="text-foreground">{product.size}</strong>
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* الفوائد */}
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-foreground">
                  <Droplets className="w-5 h-5 text-primary" />
                  الفوائد الرئيسية:
                </h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* المكونات */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-foreground">
                  المكونات:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* طريقة الاستخدام */}
              <div className="bg-muted/50 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-2 text-foreground">
                  طريقة الاستخدام:
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.howToUse}
                </p>
              </div>

              {/* التحذيرات */}
              {product.warnings.length > 0 && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-5 h-5" />
                    تحذيرات:
                  </h3>
                  <ul className="space-y-1">
                    {product.warnings.map((warning, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-destructive">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* الكمية والأزرار */}
              <div className="space-y-4 pt-4 border-t border-border">
                {/* الكمية */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    الكمية:
                  </span>
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-8 w-8"
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-bold">
                      {quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-8 w-8"
                    >
                      +
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    المجموع:{" "}
                    <strong className="text-primary text-lg">
                      {product.price * quantity} دينار
                    </strong>
                  </span>
                </div>

                {/* الأزرار */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1 shadow-glow"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isInCart}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {!product.inStock
                      ? "نفذت الكمية"
                      : isInCart
                      ? "في السلة"
                      : "أضف للسلة"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleToggleWishlist}
                    className={
                      isInWishlist ? "border-red-500 text-red-500" : ""
                    }
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist ? "fill-red-500" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
