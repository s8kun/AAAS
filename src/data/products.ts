import { BOTTLE_SIZES } from "./config";

// خصم عام على جميع المنتجات (يمكن تعديله)
export const GLOBAL_DISCOUNT = 45;

export interface Product {
  id: number;
  name: string;
  slug: string;
  originalPrice: number;
  price: number;
  discountPercentage: number;
  totalDiscountPercentage: number;
  savings: number;
  size: string;
  // صورة خارجية للمعرض/الكارد (صورة رئيسية ظاهرة خارجياً)
  exteriorImage: string;
  // صور داخلية (مثلاً في صفحة المنتج أو في QuickView) — نطلب 3 صور
  interiorImages: string[]; // طول المصفوفة يفضل أن يكون 3
  categories: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
  description: string;
  benefits: string[];
  ingredients?: string[]; // ليست ضرورية لكل الإكسسوارات لكن احتفظت بالحقل
  howToUse?: string;
  warnings?: string[];
  rating: number;
  reviews: number;
  soldCount: number;
}

const calculatePriceAfterDiscount = (
  originalPrice: number,
  discount: number
) => {
  const totalDiscount = discount + GLOBAL_DISCOUNT;
  const finalPrice = originalPrice * (1 - totalDiscount / 100);
  const savings = originalPrice - finalPrice;
  return {
    price: Math.round(finalPrice),
    totalDiscountPercentage: totalDiscount,
    savings: Math.round(savings),
  };
};

const rawProducts = [
  // 1 - نظارة شمسية كلاسيك
  {
    id: 1,
    name: "نظارة شمسية كلاسيك فلتر UV",
    slug: "classic-uv-sunglasses",
    originalPrice: 90,
    discountPercentage: 10,
    size: "One Size",
    exteriorImage:
      "https://images.unsplash.com/photo-1520975698510-0f5b3f6f7d1b?w=800&h=800&fit=crop",
    interiorImages: [
      "https://images.unsplash.com/photo-1520975698510-0f5b3f6f7d1b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=1200&h=800&fit=crop",
    ],
    categories: ["accessories", "sunglasses"],
    category: "sunglasses",
    tags: ["نظارات", "UV400", "كلاسيك"],
    inStock: true,
    featured: true,
    description:
      "نظارة شمسية بإطار خفيف وعدسات UV400 تحمي العين من الأشعة الضارة مع تصميم كلاسيكي يناسب كل الإطلالات.",
    benefits: [
      "حماية كاملة من الأشعة فوق البنفسجية (UV400)",
      "إطار خفيف ومتين",
      "عدسات مضادة لانعكاسات",
    ],
    ingredients: ["Frame: Plastic", "Lens: Polycarbonate"],
    howToUse: "نظف العدسات بقطعة قماش ناعمة واحفظها داخل العلبة المرفقة.",
    warnings: ["لا تستخدم كبديل لنظارات طبية مصدّقة"],
    rating: 4.7,
    reviews: 320,
    soldCount: 1200,
  },

  // 2 - طقم أوشام مؤقتة فنية (حزمة 10)
  {
    id: 2,
    name: "طقم أوشام مؤقتة - تصاميم فنية (10 قطع)",
    slug: "temporary-tattoos-art-pack",
    originalPrice: 25,
    discountPercentage: 5,
    size: "Multi",
    exteriorImage:
      "https://images.unsplash.com/photo-1549887534-8e2f4a8b0f8f?w=800&h=800&fit=crop",
    interiorImages: [
      "https://images.unsplash.com/photo-1582719478250-6b6d1a4a1a4f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1535968888961-1c8f0a1b4f2b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1520975916179-6b1f1b7b4d3a?w=1200&h=800&fit=crop",
    ],
    categories: ["accessories", "tattoos"],
    category: "tattoos",
    tags: ["أوشام", "مؤقتة", "ماء"],
    inStock: true,
    featured: false,
    description:
      "حزمة أوشام مؤقتة بتصاميم فنية متنوعة ومقاومة للماء تدوم لعدة أيام وتُزال بسهولة بدون ألم.",
    benefits: [
      "تثبيت سهل باستخدام الماء",
      "آمنة للبشرة (مكونات مُختبرة)",
      "تصاميم عصرية متنوعة",
    ],
    ingredients: ["مواد ملصق و حبر صديق للبشرة"],
    howToUse:
      "ضع القطعة على الجلد، بلّل الخلف بالماء، ارفع الورق بعد 30 ثانية.",
    warnings: [
      "اختبر على منطقة صغيرة أولاً",
      "تجنّب المنطقة الحسّاسة والعينين",
    ],
    rating: 4.5,
    reviews: 88,
    soldCount: 430,
  },
  {
    id: 3,
    name: "أوراق لعب ذهبية مقاومة للماء - تصميم فاخر",
    slug: "gold-waterproof-playing-cards",
    originalPrice: 35, // السعر قبل الخصم
    discountPercentage: 0, // حسب المعروض
    price: 15, // السعر بعد الخصم
    size: "Standard",
    exteriorImage:
      "https://ae-pic-a1.aliexpress-media.com/kf/H5d3aaffa0c3a4118bb124aca0f80dcfeJ.jpg_220x220q75.jpg_.avif",
    interiorImages: [
      "https://ae-pic-a1.aliexpress-media.com/kf/H7cb12e1ae122458284e76a98f4fdb290w.jpg_220x220q75.jpg_.avif",
      "https://ae-pic-a1.aliexpress-media.com/kf/He17bf25dd5af40379a4849296beb8395W.jpg_220x220q75.jpg_.avif",
      "https://ae-pic-a1.aliexpress-media.com/kf/Hae03635d8dfe427cbe6fa95f3d12ff61p.jpg_220x220q75.jpg_.avif",
    ],
    categories: ["games", "cards"],
    category: "new",
    tags: ["أوراق لعب", "مقاوم للماء", "ذهبي", "هدايا"],
    inStock: true,
    featured: false,
    description:
      "أوراق لعب فاخرة مطلية بطبقة ذهبية مقاومة للماء بملمس ناعم تدوم طويلاً. مناسبة للهدايا، والجلسات، ومحبي الألعاب بتصميم عالي الجودة.",
    benefits: [
      "مقاومة للماء بالكامل",
      "جودة عالية وملمس فاخر",
      "تصميم ذهبي فريد",
      "مناسبة للهدايا والاستخدام اليومي",
    ],
    ingredients: [
      "مادة بلاستيكية عالية الجودة",
      "طبقة طلاء ذهبية مقاومة للماء",
    ],
    howToUse:
      "استخدم الأوراق بشكل طبيعي، ويمكن غسلها ومسحها بسهولة بالماء دون أن تتأثر.",
    warnings: ["تجنب ثني الأوراق بقوة", "لا تعرضها لمصادر حرارة عالية"],
    rating: 4.8,
    reviews: 45,
    soldCount: 3888,
  },
  // 3 - سوار جلد مزدوج
  {
    id: 4,
    name: "سوار جلد مزدوج - رجالي/نسائي",
    slug: "double-leather-bracelet",
    originalPrice: 45,
    discountPercentage: 15,
    size: "Adjustable",
    exteriorImage:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    interiorImages: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541534401786-5b5b1a9c1b2a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556228720-0cae3f0f3f92?w=1200&h=800&fit=crop",
    ],
    categories: ["accessories", "bracelets"],
    category: "bracelets",
    tags: ["جلد", "قابل للتعديل", "كاجوال"],
    inStock: true,
    featured: true,
    description:
      "سوار جلد طبيعي بتصميم مزدوج أنيق مناسب للإطلالات اليومية والرسمية، مع إمكانية تعديل الطول.",
    benefits: [
      "جلد طبيعي عالي الجودة",
      "قابل للتعديل",
      "قفل معدني مقاوم للصدأ",
    ],
    ingredients: ["جلد طبيعي", "أكسسوارات ستانلس ستيل"],
    howToUse:
      "مسح بقطعة مبللة وتنظيف بسيط، تجنب الماء لفترات طويلة للمحافظة على الجلد.",
    warnings: ["لا يناسب البشرة الحساسة جداً"],
    rating: 4.6,
    reviews: 210,
    soldCount: 760,
  },

  // 4 - سلسلة رقبة بسيط ذهبية
  {
    id: 5,
    name: "سلسلة رقبة ذهبية رفيعة - ستانلس ستيل مطلي",
    slug: "gold-fine-necklace",
    originalPrice: 65,
    discountPercentage: 20,
    size: "45 cm",
    exteriorImage:
      "https://images.unsplash.com/photo-1529257414775-196f1f6c9a4f?w=800&h=800&fit=crop",
    interiorImages: [
      "https://images.unsplash.com/photo-1529257414775-196f1f6c9a4f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1520975698510-0f5b3f6f7d1b?w=1200&h=800&fit=crop",
    ],
    categories: ["accessories", "necklaces", "jewelry"],
    category: "necklaces",
    tags: ["سلسلة", "ذهبي", "مطلي"],
    inStock: true,
    featured: false,
    description:
      "سلسلة رفيعة مصنوعة من ستانلس ستيل مطلي بالذهب، تصميم أنيق يناسب كل الأذواق ولا يغير لونه بسهولة.",
    benefits: ["مطلي بالذهب", "مضاد للحساسية", "مناسب للارتداء اليومي"],
    ingredients: ["Stainless Steel (Gold Plated)"],
    howToUse: "تخزين في علبة مغلقة لتجنب تعرّضها للرطوبة.",
    warnings: ["تجنب المواد الكيماوية القوية"],
    rating: 4.4,
    reviews: 145,
    soldCount: 520,
  },

  // 5 - خاتم ستانلس ستيل بسيط
  {
    id: 6,
    name: "خاتم ستانلس ستيل - تصميم بسيط",
    slug: "simple-stainless-ring",
    originalPrice: 35,
    discountPercentage: 0,
    size: "Sizes 7-12",
    exteriorImage:
      "https://images.unsplash.com/photo-1513708928670-0f5c1d6d9b3b?w=800&h=800&fit=crop",
    interiorImages: [
      "https://images.unsplash.com/photo-1513708928670-0f5c1d6d9b3b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=800&fit=crop",
    ],
    categories: ["accessories", "rings", "jewelry"],
    category: "rings",
    tags: ["خاتم", "ستانلس ستيل", "مقاوم"],
    inStock: true,
    featured: false,
    description:
      "خاتم بتصميم أنيق وبسيط من الستانلس ستيل، مقاوم للخدش والتغير ولونه ثابت لفترات طويلة.",
    benefits: ["مقاوم للخدش", "مناسب للارتداء اليومي", "مضاد للصدأ"],
    ingredients: ["Stainless Steel"],
    howToUse: "نظّفه بقطعة قماش جافة، احفظه بعيداً عن الماء والمواد الكيماوية.",
    warnings: ["اختر المقاس المناسب قبل الشراء"],
    rating: 4.3,
    reviews: 76,
    soldCount: 310,
  },

  // 6 - نظارة شمسية رياضية
  {
    id: 7,
    name: "نظارة شمسية رياضية مع عدسات مستقطبة",
    slug: "sport-polarized-sunglasses",
    originalPrice: 120,
    discountPercentage: 25,
    size: "One Size",
    exteriorImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop",
    interiorImages: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop",
    ],
    categories: ["accessories", "sunglasses", "sport"],
    category: "sunglasses",
    tags: ["مستقطبة", "رياضي", "UV400"],
    inStock: true,
    featured: true,
    description:
      "نظارة مستقطبة للرياضة بتصميم انسيابي، تقلل الوهج وتعطي رؤية واضحة أثناء الأنشطة الخارجية.",
    benefits: ["عدسات مستقطبة", "إطار مرن وخفيف", "حماية UV"],
    ingredients: ["Frame: TR90", "Lens: Polarized Polycarbonate"],
    howToUse: "تخزّن في علبة مع قطعة تنظيف الميكروفايبر.",
    warnings: ["ليست للاستخدام أثناء القيادة الليلية"],
    rating: 4.8,
    reviews: 410,
    soldCount: 980,
  },

  // 7 - عقد بخيط جلدي مع قلادة حجر
  {
    id: 8,
    name: "عقد بخيط جلدي وقلادة حجر طبيعي",
    slug: "leather-stone-necklace",
    originalPrice: 55,
    discountPercentage: 10,
    size: "One Size",
    exteriorImage:
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&h=800&fit=crop",
    interiorImages: [
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15b5d1b8a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541534401786-5b5b1a9c1b2a?w=1200&h=800&fit=crop",
    ],
    categories: ["accessories", "necklaces", "jewelry"],
    category: "necklaces",
    tags: ["حجر طبيعي", "جلد", "مناسب للهدية"],
    inStock: true,
    featured: false,
    description:
      "عقد أنيق بخيط جلدي مع قلادة حجر طبيعي، قطعة يدوية تضيف لمسة بوهيمية لأي طلة.",
    benefits: ["حجر طبيعي فريد", "تصنيع يدوي", "هدية مثالية"],
    ingredients: ["حبل جلد", "حجر طبيعي"],
    howToUse: "يفضل تجنّب البلل للحفاظ على الخيط والخرز.",
    warnings: ["كل حجر قد يختلف في اللون والشكل قليلاً"],
    rating: 4.5,
    reviews: 67,
    soldCount: 220,
  },

  // 8 - طقم أساور نحاسية مطلية
  {
    id: 9,
    name: "طقم أساور نحاسية مطلية (3 قطع)",
    slug: "copper-bangle-set",
    originalPrice: 48,
    discountPercentage: 8,
    size: "Adjustable",
    exteriorImage:
      "https://images.unsplash.com/photo-1520975916179-6b1f1b7b4d3a?w=800&h=800&fit=crop",
    interiorImages: [
      "https://images.unsplash.com/photo-1520975916179-6b1f1b7b4d3a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546195643-70f4d1b6d5a0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1503342452485-86f3e3c1a4f2?w=1200&h=800&fit=crop",
    ],
    categories: ["accessories", "bracelets", "jewelry"],
    category: "bracelets",
    tags: ["نحاسي", "طقم", "مطلي"],
    inStock: true,
    featured: false,
    description:
      "طقم مكون من 3 أساور نحاسية مطلية بتصميم متداخل أنيق، مناسب للارتداء اليومي والمناسبات.",
    benefits: ["مظهر راقٍ", "قابل للتنسيق مع قطع أخرى", "مناسب كهدايا"],
    ingredients: ["Copper (Plated Finish)"],
    howToUse: "تنظيف بلطف بعيداً عن المواد الكيميائية",
    warnings: ["تغيير خفيف في اللون ممكن عند الاحتكاك القوي"],
    rating: 4.2,
    reviews: 54,
    soldCount: 190,
  },

  // 9 - نظارة طبية بدون وصفة بإطار شفاف
  {
    id: 10,
    name: "نظارة بإطار شفاف - للاستخدام اليومي",
    slug: "clear-frame-glasses",
    originalPrice: 70,
    discountPercentage: 12,
    size: "One Size",
    exteriorImage:
      "https://images.unsplash.com/photo-1511203466129-824e631920d4?w=800&h=800&fit=crop",
    interiorImages: [
      "https://images.unsplash.com/photo-1511203466129-824e631920d4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=1200&h=800&fit=crop",
    ],
    categories: ["accessories", "glasses"],
    category: "glasses",
    tags: ["إطار شفاف", "أنيق", "يومي"],
    inStock: true,
    featured: false,
    description:
      "نظارة بإطار شفاف عصري مناسبة للاستخدام اليومي والعمل، قابلة لتركيب عدسات طبية حسب الحاجة.",
    benefits: ["إطار شفاف عصري", "قابل لتركيب عدسات prescription", "خفة الوزن"],
    ingredients: ["Frame: TR90", "Hinges: Metal"],
    howToUse: "يمكن تركيب عدسات طبية في أي محل بصريات مختص.",
    warnings: ["ليست للنظارات الشمسية ما لم تُركب بعدسات مناسبة"],
    rating: 4.4,
    reviews: 98,
    soldCount: 340,
  },

  // 10 - بروش معدني أنيق
  {
    id: 11,
    name: "بروش معدني بتشطيب أنتيك",
    slug: "antique-metal-brooch",
    originalPrice: 30,
    discountPercentage: 0,
    size: "4cm",
    exteriorImage:
      "https://images.unsplash.com/photo-1520975698510-0f5b3f6f7d1b?w=800&h=800&fit=crop",
    interiorImages: [
      "https://images.unsplash.com/photo-1520975698510-0f5b3f6f7d1b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541534401786-5b5b1a9c1b2a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15b5d1b8a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15b5d1b8a?w=1200&h=800&fit=crop",
    ],
    categories: ["accessories", "brooches", "jewelry"],
    category: "brooches",
    tags: ["بروش", "أنتيك", "معدني"],
    inStock: true,
    featured: false,
    description:
      "بروش معدني بتشطيب أنتيك يضيف طابعاً كلاسيكياً للملابس أو الحقائب، قطعة صغيرة ذات جودة عالية.",
    benefits: ["تشطيب أنتيك جميل", "قابل للتثبيت على عدة أسطح", "هدية مناسبة"],
    ingredients: ["Alloy Metal (Antique Finish)"],
    howToUse: "ثبت البروش على القماش بلطف وابتعد عن الأقمشة الرقيقة جداً.",
    warnings: ["قد يترك أثر عند الاحتكاك القوي"],
    rating: 4.1,
    reviews: 40,
    soldCount: 120,
  },
];

// حساب السعر النهائي لكل منتج
export const PRODUCTS_DATA: Product[] = rawProducts.map((product) => {
  const priceData = calculatePriceAfterDiscount(
    product.originalPrice,
    product.discountPercentage
  );
  return {
    ...product,
    ...priceData,
  };
});
