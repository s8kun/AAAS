import { Plus, Minus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { SITE_CONFIG } from "@/data/config";
import { PRODUCTS_DATA } from "@/data/products";
import { useMemo, useState } from "react";

// دالة للتحقق من رقم الهاتف الليبياي
const validateEgyptianPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\s+/g, "");
  const egyptianPhoneRegex = /^(01)[0-2,5]{1}[0-9]{8}$/;
  return egyptianPhoneRegex.test(cleanPhone);
};

// دالة للتحقق من الاسم
const validateName = (name: string): boolean => {
  return name.trim().length >= 3;
};

// دالة للتحقق من العنوان
const validateAddress = (address: string): boolean => {
  return address.trim().length >= 10;
};

export default function CartPage() {
  const { state, dispatch } = useApp();
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    address?: string;
  }>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<
    number | string | null
  >(null);

  // حساب المجاميع بشكل دقيق
  const calculations = useMemo(() => {
    const subtotal = state.cart.reduce((sum, item) => {
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 1;
      return sum + itemPrice * itemQuantity;
    }, 0);

    const shipping =
      subtotal >= SITE_CONFIG.shipping.freeShippingThreshold
        ? 0
        : SITE_CONFIG.shipping.standardShipping;

    const total = subtotal + shipping;

    const freeShippingRemaining = Math.max(
      0,
      SITE_CONFIG.shipping.freeShippingThreshold - subtotal
    );

    return { subtotal, shipping, total, freeShippingRemaining };
  }, [state.cart]);

  const handleUpdateQuantity = (id: number | string, newQuantity: number) => {
    if (newQuantity < 1) return;

    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { id, quantity: newQuantity },
    });
  };

  const confirmRemove = (id: number | string, name: string) => {
    setShowDeleteConfirm(id);
  };

  const handleRemove = (id: number | string, name: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now().toString(),
        type: "info",
        message: `تم حذف ${name} من السلة`,
      },
    });
    setShowDeleteConfirm(null);
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!validateName(state.customerInfo.name)) {
      newErrors.name = "الاسم يجب أن يكون 3 أحرف على الأقل";
    }

    if (!validateEgyptianPhone(state.customerInfo.phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح (مثال: 01012345678)";
    }

    if (!validateAddress(state.customerInfo.address)) {
      newErrors.address = "العنوان يجب أن يكون 10 أحرف على الأقل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = () => {
    if (!validateForm()) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: Date.now().toString(),
          type: "warning",
          message: "يرجى تصحيح الأخطاء في النموذج",
        },
      });
      return;
    }

    let message = `🛒 *طلب جديد من ${SITE_CONFIG.name}*\n\n`;
    message += `📝 *بيانات العميل:*\n`;
    message += `الاسم: ${state.customerInfo.name}\n`;
    message += `التليفون: ${state.customerInfo.phone}\n`;
    message += `العنوان: ${state.customerInfo.address}\n\n`;
    message += `🛍️ *تفاصيل الطلب:*\n\n`;

    state.cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;

      if (item.isBundle && item.bundleProducts) {
        message += `   📦 عرض خاص يحتوي على:\n`;
        item.bundleProducts.forEach((productId) => {
          const product = PRODUCTS_DATA.find((p) => p.id === productId);
          if (product) {
            message += `      • ${product.name}\n`;
          }
        });
      } else {
        message += `   الحجم: ${item.size}\n`;
      }

      message += `   الكمية: ${item.quantity}\n`;
      message += `   السعر: ${item.price} دينار\n`;
      message += `   المجموع: ${item.price * item.quantity} دينار\n\n`;
    });

    message += `💰 *ملخص الطلب:*\n`;
    message += `المجموع الفرعي: ${calculations.subtotal.toFixed(2)} دينار\n`;
    message += `الشحن: ${
      calculations.shipping === 0
        ? "مجاني ✅"
        : calculations.shipping + " دينار"
    }\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `*الإجمالي النهائي: ${calculations.total.toFixed(2)} دينار*\n\n`;
    message += `🌿 شكراً لاختيارك ${SITE_CONFIG.name}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodedMessage}`;

    // فتح الواتساب في تاب جديد
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    // التحقق من فتح النافذة
    if (whatsappWindow) {
      // تفريغ السلة بعد التأكد من فتح الواتساب
      setTimeout(() => {
        dispatch({ type: "CLEAR_CART" });
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: Date.now().toString(),
            type: "success",
            message: "تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً",
          },
        });
      }, 1000);
    } else {
      // في حالة منع النافذة المنبثقة
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: Date.now().toString(),
          type: "error",
          message:
            "لم نتمكن من فتح واتساب. يرجى السماح بالنوافذ المنبثقة أو نسخ الرابط",
        },
      });

      // نسخ الرابط للحافظة كبديل
      navigator.clipboard.writeText(whatsappUrl).then(() => {
        alert("تم نسخ رابط الواتساب! الصقه في المتصفح للمتابعة");
      });
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center animate-scale-in">
          <ShoppingBag className="w-20 h-20 text-primary/30 mx-auto mb-6 animate-gentle-float" />
          <h2 className="text-3xl font-bold text-foreground mb-3">
            السلة فارغة
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            ابدأ التسوق الآن واستكشف منتجاتنا الطبيعية!
          </p>
          <Button
            size="lg"
            onClick={() => dispatch({ type: "SET_PAGE", payload: "products" })}
            className="shadow-glow"
          >
            <ShoppingBag className="w-5 h-5" />
            تصفح المنتجات
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            سلة التسوق
          </h1>
          <p className="text-muted-foreground">
            لديك {state.cart.length} منتج في السلة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* قائمة المنتجات */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => {
              const itemId = item.isBundle ? item.bundleId : item.id;
              const itemTotal = item.price * item.quantity;
              const isDeleting = showDeleteConfirm === itemId;

              return (
                <div
                  key={itemId}
                  className="card-natural p-4 animate-slide-in relative"
                >
                  {isDeleting && (
                    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 animate-scale-in">
                      <div className="text-center p-6">
                        <p className="text-lg font-bold text-foreground mb-4">
                          هل أنت متأكد من الحذف؟
                        </p>
                        <div className="flex gap-3 justify-center">
                          <Button
                            variant="destructive"
                            onClick={() => handleRemove(itemId!, item.name)}
                          >
                            نعم، احذف
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowDeleteConfirm(null)}
                          >
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {/* صورة المنتج */}
                    <div className="gradient-subtle rounded-lg p-4 flex-shrink-0 w-24 h-24 flex items-center justify-center overflow-hidden">
                      {item.exteriorImage &&
                      typeof item.exteriorImage === "string" &&
                      item.exteriorImage.startsWith("http") ? (
                        <img
                          src={item.exteriorImage}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="text-5xl">
                          {item.exteriorImage ?? "📦"}
                        </div>
                      )}
                    </div>

                    {/* تفاصيل المنتج */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-foreground mb-1">
                        {item.name}
                      </h3>

                      {item.isBundle && item.bundleProducts && (
                        <p className="text-xs text-muted-foreground mb-2">
                          📦 عرض خاص يحتوي على {item.bundleProducts.length}{" "}
                          منتجات
                        </p>
                      )}

                      <p className="text-sm text-muted-foreground mb-2">
                        {item.size}
                      </p>

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-primary font-bold text-lg">
                          {item.price} دينار
                        </span>
                        <span className="text-xs text-muted-foreground">
                          للقطعة
                        </span>
                      </div>

                      {/* التحكم في الكمية */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              handleUpdateQuantity(itemId!, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-bold">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              handleUpdateQuantity(itemId!, item.quantity + 1)
                            }
                            className="h-8 w-8"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex-1 text-left">
                          <p className="text-sm text-muted-foreground">
                            المجموع
                          </p>
                          <p className="text-xl font-bold text-primary">
                            {itemTotal} دينار
                          </p>
                        </div>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => confirmRemove(itemId!, item.name)}
                          className="hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ملخص الطلب */}
          <div className="space-y-6">
            {/* معلومات العميل */}
            <div className="card-natural p-6">
              <h3 className="font-bold text-lg mb-4 text-foreground flex items-center gap-2">
                <span className="text-2xl">📝</span>
                معلومات التوصيل
              </h3>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="الاسم الكامل"
                    value={state.customerInfo.name}
                    onChange={(e) => {
                      dispatch({
                        type: "UPDATE_CUSTOMER_INFO",
                        payload: { name: e.target.value },
                      });
                      if (errors.name)
                        setErrors({ ...errors, name: undefined });
                    }}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="رقم التليفون (0912345678)"
                    value={state.customerInfo.phone}
                    onChange={(e) => {
                      dispatch({
                        type: "UPDATE_CUSTOMER_INFO",
                        payload: { phone: e.target.value },
                      });
                      if (errors.phone)
                        setErrors({ ...errors, phone: undefined });
                    }}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="العنوان الكامل (المدينة - الشارع - معالم)"
                    value={state.customerInfo.address}
                    onChange={(e) => {
                      dispatch({
                        type: "UPDATE_CUSTOMER_INFO",
                        payload: { address: e.target.value },
                      });
                      if (errors.address)
                        setErrors({ ...errors, address: undefined });
                    }}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ملخص السعر */}
            <div className="card-natural p-6 shadow-large sticky top-24">
              <h3 className="font-bold text-xl mb-6 text-foreground flex items-center gap-2">
                <span className="text-2xl">💰</span>
                ملخص الطلب
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">المجموع الفرعي:</span>
                  <span className="font-bold text-lg text-foreground">
                    {calculations.subtotal.toFixed(2)} دينار
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">الشحن:</span>
                  <span
                    className={`font-bold text-lg ${
                      calculations.shipping === 0
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {calculations.shipping === 0
                      ? "مجاني ✅"
                      : `${calculations.shipping} دينار`}
                  </span>
                </div>

                {calculations.freeShippingRemaining > 0 && (
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 animate-pulse-soft">
                    <p className="text-xs text-primary font-medium text-center">
                      🎉 أضف {calculations.freeShippingRemaining.toFixed(2)}{" "}
                      دينار للحصول على شحن مجاني!
                    </p>
                  </div>
                )}

                <div className="border-t-2 border-primary/30 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg text-foreground">
                      الإجمالي النهائي:
                    </span>
                    <span className="font-bold text-3xl text-primary">
                      {calculations.total.toFixed(2)} دينار
                    </span>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    شامل جميع الضرائب والرسوم
                  </p>
                </div>
              </div>

              <Button
                className="w-full mt-6 shadow-glow"
                variant="hero"
                size="lg"
                onClick={handleSubmitOrder}
              >
                <MessageCircle className="w-5 h-5" />
                إتمام الطلب عبر واتساب
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                بالضغط على الزر، ستتم إعادة توجيهك إلى واتساب لإتمام الطلب
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
