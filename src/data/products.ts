import { BOTTLE_SIZES } from "./config";

// خصم عام على جميع المنتجات
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
  exteriorImage: string;
  interiorImages: string[];
  categories: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
  description: string;
  benefits: string[];
  ingredients?: string[];
  howToUse?: string;
  warnings?: string[];
  rating: number;
  reviews: number;
  soldCount: number;
}

// هذا النوع للبيانات الخام القادمة من الـ API
export type RawProduct = Omit<
  Product,
  "price" | "totalDiscountPercentage" | "savings"
>;

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

const toNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeRawProduct = (product: unknown): RawProduct | null => {
  if (!product || typeof product !== "object") {
    return null;
  }

  const item = product as Record<string, unknown>;

  return {
    ...(item as Omit<
      RawProduct,
      "originalPrice" | "discountPercentage" | "rating" | "reviews" | "soldCount"
    >),
    originalPrice: toNumber(item.originalPrice),
    discountPercentage: toNumber(item.discountPercentage),
    rating: toNumber(item.rating),
    reviews: toNumber(item.reviews),
    soldCount: toNumber(item.soldCount),
  };
};

const fetchProducts = async (): Promise<RawProduct[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: unknown = await response.json();
    const list = Array.isArray(payload)
      ? payload
      : Array.isArray((payload as { data?: unknown })?.data)
      ? (payload as { data: unknown[] }).data
      : [];

    const normalizedProducts = list
      .map(normalizeRawProduct)
      .filter((product): product is RawProduct => product !== null);

    return normalizedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const rawProducts: RawProduct[] = await fetchProducts();

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