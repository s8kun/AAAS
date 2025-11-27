import { Plus, Minus, ShoppingCart, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { useApp } from "@/context/AppContext";
import { BUNDLES_DATA } from "@/data/bundles";
import { PRODUCTS_DATA } from "@/data/products";
import { useState } from "react";

export default function OffersPage() {
  const { dispatch } = useApp();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQuantity = (id: string) => quantities[id] || 1;

  const handleAddToCart = (bundle: (typeof BUNDLES_DATA)[0]) => {
    const quantity = getQuantity(bundle.id);

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...bundle,
        id: bundle.id as any,
        name: bundle.name,
        price: bundle.bundlePrice,
        quantity,
        image: bundle.image,
        isBundle: true,
        bundleId: bundle.id,
        bundleProducts: bundle.products,
        size: "عرض خاص",
        categories: [],
        category: bundle.category,
        tags: ["عرض", "باقة"],
        inStock: true,
        featured: true,
        description: bundle.description,
        benefits: bundle.benefits,
        ingredients: [],
        howToUse: "",
        warnings: [],
        rating: 5,
        reviews: 0,
        soldCount: 0,
        slug: bundle.id,
        originalPrice: bundle.originalPrice,
        discountPercentage: bundle.discountPercentage,
        totalDiscountPercentage: bundle.discountPercentage,
        savings: bundle.savings,
      },
    });

    setQuantities((prev) => ({
      ...prev,
      [bundle.id]: 1,
    }));

    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now().toString(),
        type: "success",
        message: `تم إضافة ${bundle.name} إلى السلة (${quantity})`,
      },
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <div className="text-center mb-12 animate-scale-in">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Gift className="w-20 h-20 text-primary animate-gentle-float" />
              <Sparkles className="w-8 h-8 text-secondary absolute -top-2 -right-2 animate-pulse-soft" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            العروض والباقات الخاصة
          </h1>
          <p className="text-xl text-muted-foreground">
            وفّر المال مع باقاتنا المتميزة 🌿
          </p>
          <div className="mt-6 inline-block bg-primary/10 border-2 border-primary/30 rounded-full px-6 py-2">
            <p className="text-primary font-bold">
              ✨ عروض لفترة محدودة - احجز الآن!
            </p>
          </div>
        </div>

        {/* البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BUNDLES_DATA.map((bundle) => {
            const quantity = getQuantity(bundle.id);
            const totalPrice = bundle.bundlePrice * quantity;
            const bundleProducts = bundle.products
              .map((id) => PRODUCTS_DATA.find((p) => p.id === id))
              .filter(Boolean);

            return (
              <div
                key={bundle.id}
                className="card-natural overflow-hidden animate-scale-in"
              >
                {/* الهيدر */}
                <div className="gradient-hero p-6 text-primary-foreground relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      {bundle.image.startsWith("http") ? (
                        <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-large animate-gentle-float">
                          <img
                            src={bundle.image}
                            alt={bundle.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="text-7xl animate-gentle-float">
                          {bundle.image}
                        </div>
                      )}
                      <div className="text-left">
                        <Badge
                          variant="danger"
                          className="shadow-medium mb-2 animate-pulse-soft"
                        >
                          وفّر {bundle.savings} دينار
                        </Badge>
                        {bundle.featured && (
                          <Badge className="bg-secondary text-secondary-foreground">
                            ⭐ الأكثر مبيعاً
                          </Badge>
                        )}
                      </div>
                    </div>
                    <h3 className="font-bold text-3xl mb-2">{bundle.name}</h3>
                    <p className="text-sm opacity-90">{bundle.description}</p>
                  </div>
                </div>

                {/* المحتوى */}
                <div className="p-6 space-y-6">
                  {/* المنتجات في الباقة */}
                  <div className="bg-gradient-subtle rounded-lg p-4 border border-border">
                    <h4 className="font-bold text-sm mb-3 text-foreground flex items-center gap-2">
                      <span className="text-xl">📦</span>
                      يحتوي على {bundleProducts.length} منتجات طبيعية:
                    </h4>
                    <div className="space-y-2">
                      {bundleProducts.map((product) => (
                        <div
                          key={product!.id}
                          className="flex items-center gap-3 bg-background/50 rounded-lg p-2"
                        >
                          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center overflow-hidden rounded">
                            {product!.image.startsWith("http") ? (
                              <img
                                src={product!.image}
                                alt={product!.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-3xl">{product!.image}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-foreground">
                              {product!.name}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {product!.size}
                            </p>
                          </div>
                          <span className="text-xs text-primary font-bold">
                            {product!.originalPrice} ج
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* الفوائد */}
                  <div>
                    <h4 className="font-bold text-sm mb-3 text-foreground flex items-center gap-2">
                      <span className="text-xl">✨</span>
                      الفوائد الرئيسية:
                    </h4>
                    <div className="grid gap-2">
                      {bundle.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-2"
                        >
                          <span className="text-primary mt-0.5">●</span>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* الأسعار */}
                  <div className="border-t-2 border-border pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        السعر الأصلي:
                      </span>
                      <span className="text-lg line-through text-muted-foreground">
                        {bundle.originalPrice} دينار
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-destructive/10 rounded-lg p-2">
                      <span className="text-sm font-medium text-destructive">
                        خصم مميز:
                      </span>
                      <span className="text-xl font-bold text-destructive">
                        {bundle.discountPercentage}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-primary/10 rounded-lg p-3">
                      <span className="font-bold text-lg text-foreground">
                        سعر الباقة:
                      </span>
                      <span className="font-bold text-3xl text-primary">
                        {bundle.bundlePrice} دينار
                      </span>
                    </div>
                  </div>

                  {/* الكمية والإضافة */}
                  <div className="space-y-4 pt-2">
                    {/* التحكم في الكمية */}
                    <div className="flex items-center justify-center gap-4 bg-muted/30 rounded-lg p-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setQuantities((prev) => ({
                            ...prev,
                            [bundle.id]: Math.max(1, quantity - 1),
                          }))
                        }
                        disabled={quantity <= 1}
                      >
                        <Minus />
                      </Button>

                      <div className="text-center min-w-[80px]">
                        <span className="text-2xl font-bold block">
                          {quantity}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          الكمية
                        </span>
                      </div>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setQuantities((prev) => ({
                            ...prev,
                            [bundle.id]: quantity + 1,
                          }))
                        }
                      >
                        <Plus />
                      </Button>
                    </div>

                    {/* عرض المجموع */}
                    {quantity > 1 && (
                      <div className="bg-primary/10 rounded-lg p-3 text-center border-2 border-primary/30 animate-pulse-soft">
                        <span className="text-sm text-muted-foreground">
                          المجموع الكلي:{" "}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {totalPrice} دينار
                        </span>
                      </div>
                    )}

                    {/* زر الإضافة */}
                    <Button
                      className="w-full shadow-glow"
                      variant="hero"
                      size="lg"
                      onClick={() => handleAddToCart(bundle)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      إضافة الباقة للسلة
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      🎁 عرض خاص - توفير مضمون على هذه الباقة!
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* معلومات إضافية */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-natural p-6 text-center">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-bold text-lg mb-2">شحن مجاني</h3>
            <p className="text-sm text-muted-foreground">
              للطلبات فوق 120 دينار
            </p>
          </div>

          <div className="card-natural p-6 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-lg mb-2">ضمان الجودة</h3>
            <p className="text-sm text-muted-foreground">منتجات طبيعية 100%</p>
          </div>

          <div className="card-natural p-6 text-center">
            <div className="text-4xl mb-3">💚</div>
            <h3 className="font-bold text-lg mb-2">رضا العملاء</h3>
            <p className="text-sm text-muted-foreground">
              أكثر من 5000 عميل راضٍ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
