import { PRODUCTS_DATA } from "./products";

// خصم إضافي على العروض فقط (بعد حساب أسعار المنتجات)
export const BUNDLE_DISCOUNT = 0;

export interface Bundle {
  id: string;
  name: string;
  description: string;
  image: string;
  products: number[];
  originalPrice: number;
  bundlePrice: number;
  discountPercentage: number;
  savings: number;
  category: string;
  featured: boolean;
  benefits: string[];
}

const calculateBundlePrice = (productIds: number[]) => {
  // حساب السعر الأصلي للعرض = مجموع الأسعار الأصلية للمنتجات
  const originalPrice = productIds.reduce((sum, id) => {
    const product = PRODUCTS_DATA.find((p) => p.id === id);
    return sum + (product?.originalPrice || 0);
  }, 0);

  // تطبيق خصم العروض على السعر الأصلي
  const bundlePrice = Math.round(originalPrice * (1 - BUNDLE_DISCOUNT / 100));
  const savings = originalPrice - bundlePrice;

  return {
    originalPrice,
    bundlePrice,
    discountPercentage: BUNDLE_DISCOUNT,
    savings,
  };
};

const rawBundles = [
  {
    id: "hair-care-bundle",
    name: "باقة العناية بالشعر الكاملة",
    description: "مجموعة متكاملة من 3 زيوت طبيعية للعناية الشاملة بالشعر",
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=400&fit=crop",
    products: [1, 5, 6], // جوز الهند، الخروع، الزيتون
    category: "hair-care",
    featured: true,
    benefits: [
      "تقوية وتغذية شاملة للشعر",
      "يوقف التساقط ويحفز النمو",
      "يعطي لمعاناً طبيعياً مميز",
      `وفّر مع هذه الباقة المميزة!`,
    ],
  },
  {
    id: "premium-oils-bundle",
    name: "باقة الزيوت الممتازة",
    description: "أفضل 3 زيوت فاخرة للعناية المتكاملة",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop",
    products: [3, 4, 2], // الجوجوبا، الأرغان، اللوز
    category: "premium",
    featured: true,
    benefits: [
      "زيوت فاخرة بجودة عالية",
      "عناية متكاملة للشعر والبشرة",
      "مثالية للهدايا الفاخرة",
      `خصم حصري على هذه الباقة`,
    ],
  },
  {
    id: "skin-care-bundle",
    name: "باقة العناية بالبشرة الطبيعية",
    description: "أفضل مزيج للبشرة المشرقة والصحية",
    image:
      "https://images.unsplash.com/photo-1556228852-80024026dfce?w=600&h=400&fit=crop",
    products: [2, 3, 1], // اللوز، الجوجوبا، جوز الهند
    category: "skin-care",
    featured: true,
    benefits: [
      "ترطيب عميق ومتوازن",
      "مكافحة الشيخوخة المبكرة",
      "مناسب لجميع أنواع البشرة",
      `توفير مضمون مع هذه الباقة`,
    ],
  },
  {
    id: "hair-growth-bundle",
    name: "باقة تحفيز نمو الشعر",
    description: "حل متكامل لتكثيف وتحفيز نمو الشعر",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop",
    products: [5, 4, 1], // الخروع، الأرغان، جوز الهند
    category: "hair-growth",
    featured: false,
    benefits: [
      "تحفيز قوي لنمو الشعر",
      "تكثيف ملحوظ في 4-6 أسابيع",
      "يوقف التساقط بشكل فعال",
      `سعر مخفض خصيصاً لك`,
    ],
  },
];

// حساب الأسعار لكل عرض بناءً على أسعار المنتجات
export const BUNDLES_DATA: Bundle[] = rawBundles.map((bundle) => {
  const pricing = calculateBundlePrice(bundle.products);
  return {
    ...bundle,
    ...pricing,
  };
});
