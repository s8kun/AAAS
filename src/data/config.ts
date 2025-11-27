// ============================================
// ملف الإعدادات الأساسية للموقع
// يمكنك تعديل جميع البيانات من هنا بسهولة
// ============================================

export const SITE_CONFIG = {
  // ══════════════════════════════════════════
  // معلومات الموقع الأساسية
  // ══════════════════════════════════════════
  name: "AAAS",
  tagline: "اكتشف أجمل الإكسسوارات العصرية والعملية لكل المناسبات",
  description:
    "متجر متخصص في بيع الزيوت الطبيعية والمنتجات العضوية للعناية بالشعر والبشرة",

  // ══════════════════════════════════════════
  // معلومات التواصل
  // ══════════════════════════════════════════
  contact: {
    phone: "0915554942",
    phoneDisplay: "+218915554942",
    email: "elferjani7@gmail.com",
    whatsapp: "218915554942",
    whatsappGroup: "",
    workingHours: "24 ساعة",
    workingDays: "السبت - الخميس",
  },

  // ══════════════════════════════════════════
  // روابط السوشيال ميديا
  // ══════════════════════════════════════════
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },

  // ══════════════════════════════════════════
  // إعدادات الشحن والأسعار
  // ══════════════════════════════════════════
  shipping: {
    freeShippingThreshold: 120, // الحد الأدنى للشحن المجاني بالدينار
    standardShipping: 15, // سعر الشحن العادي بالدينار
    estimatedDelivery: "2-3 أيام عمل",
  },

  // ══════════════════════════════════════════
  // معلومات الشركة
  // ══════════════════════════════════════════
  company: {
    foundedYear: 2019,
    experience: "6 سنوات خبرة",
    customersCount: "5000+",
    productsCount: "50+",
    satisfactionRate: "98%",
  },

  // ══════════════════════════════════════════
  // معلومات المطور
  // ══════════════════════════════════════════
  developer: {
    name: "Abdullah Elferjani",
    phone: "0917779372",
    whatsapp: "218917779372",
  },

  // ══════════════════════════════════════════
  // إعدادات العملة
  // ══════════════════════════════════════════
  currency: {
    code: "LYD",
    symbol: "دينار",
    symbolPosition: "after",
  },

  // ══════════════════════════════════════════
  // رسائل النظام
  // ══════════════════════════════════════════
  messages: {
    cartEmpty: "السلة فارغة",
    addedToCart: "تمت الإضافة إلى السلة بنجاح",
    removedFromCart: "تم الحذف من السلة",
    addedToWishlist: "تمت الإضافة إلى المفضلة",
    removedFromWishlist: "تم الحذف من المفضلة",
    fillAllFields: "يرجى ملء جميع الحقول",
    orderSuccess: "تم إرسال الطلب بنجاح",
  },
};

// ══════════════════════════════════════════
// أحجام الزجاجات المتوفرة
// ══════════════════════════════════════════
export const BOTTLE_SIZES = {
  small: "sm",
  medium: "md",
  large: "lg",
  extraLarge: "xl",
  standard: "standard",
};

// ══════════════════════════════════════════
// فئات المنتجات
// ══════════════════════════════════════════
export const CATEGORIES = [
  {
    id: "all",
    name: "جميع الفئات",
    icon: "🌐",
    description: "عرض جميع المنتجات",
  },
  {
    id: "accessories",
    name: "اكسسوارات",
    icon: "🧣",
    description: "قلادات، أساور، خواتم وإكسسوارات موضة متنوعة",
  },
  {
    id: "tattoos",
    name: "وشم",
    icon: "🖊️",
    description: "تصاميم وشم مؤقت وملحقات الرسم",
  },
  {
    id: "sunglasses",
    name: "نظارات شمسية",
    icon: "🕶️",
    description: "نظارات شمسية بحماية عالية وتصاميم متنوعة",
  },
  {
    id: "jewelry",
    name: "مجوهرات",
    icon: "💍",
    description: "مجوهرات فضية وذهب وتصاميم فاخرة",
  },
  {
    id: "watches",
    name: "ساعات",
    icon: "⌚",
    description: "ساعات كلاسيكية وذكية لجميع الأذواق",
  },
  {
    id: "new",
    name: "وصل حديثًا",
    icon: "🆕",
    description: "أحدث المنتجات والإصدارات",
  },
  // {
  //   id: "sale",
  //   name: "عروض وخصومات",
  //   icon: "🔥",
  //   description: "عروض خاصة وخصومات لفترة محدودة",
  // },
];

// ══════════════════════════════════════════
// روابط سريعة للتواصل
// ══════════════════════════════════════════
export const getWhatsAppLink = (message?: string) => {
  const baseUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
};

export const getPhoneLink = () => {
  return `tel:${SITE_CONFIG.contact.phone}`;
};

export const getEmailLink = (subject?: string) => {
  const baseUrl = `mailto:${SITE_CONFIG.contact.email}`;
  return subject
    ? `${baseUrl}?subject=${encodeURIComponent(subject)}`
    : baseUrl;
};

// ══════════════════════════════════════════
// دالة لتنسيق السعر
// ══════════════════════════════════════════
export const formatPrice = (price: number): string => {
  const formatted = price.toFixed(2);
  return SITE_CONFIG.currency.symbolPosition === "before"
    ? `${SITE_CONFIG.currency.symbol} ${formatted}`
    : `${formatted} ${SITE_CONFIG.currency.symbol}`;
};

// ══════════════════════════════════════════
// دالة لحساب التوفير
// ══════════════════════════════════════════
export const calculateSavings = (
  originalPrice: number,
  currentPrice: number
): number => {
  return Math.round(originalPrice - currentPrice);
};

// ══════════════════════════════════════════
// دالة لحساب نسبة الخصم
// ══════════════════════════════════════════
export const calculateDiscountPercentage = (
  originalPrice: number,
  currentPrice: number
): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// ══════════════════════════════════════════
// الوصول السريع للبيانات الأكثر استخداماً
// ══════════════════════════════════════════
export const QUICK_ACCESS = {
  phone: SITE_CONFIG.contact.phone,
  whatsapp: SITE_CONFIG.contact.whatsapp,
  email: SITE_CONFIG.contact.email,
  freeShipping: SITE_CONFIG.shipping.freeShippingThreshold,
  shippingCost: SITE_CONFIG.shipping.standardShipping,
};
