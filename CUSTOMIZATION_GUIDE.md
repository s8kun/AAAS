# 📝 دليل التخصيص السريع - Kavoral Store

## 🎯 كيفية تعديل البيانات والأسعار بسهولة

### 1️⃣ تعديل معلومات الموقع

**الملف:** `src/data/config.ts`

```typescript
export const SITE_CONFIG = {
  name: "Kavoral", // اسم الموقع
  tagline: "رائدة في مجال...", // الشعار
  phone: "01016993805", // رقم التليفون
  email: "kavoral.eg@gmail.com", // البريد الإلكتروني
  whatsapp: "2001016993805", // واتساب (بكود الدولة)

  // تعديل روابط السوشيال ميديا
  social: {
    facebook: "رابط الفيسبوك",
    instagram: "رابط الانستجرام",
    tiktok: "رابط التيك توك",
  },

  // تعديل إعدادات الشحن
  shipping: {
    freeShippingThreshold: 300, // شحن مجاني فوق 300 جنيه
    standardShipping: 25, // سعر الشحن العادي
  },
};
```

---

### 2️⃣ إضافة أو تعديل منتج

**الملف:** `src/data/products.ts`

#### خصم عام على كل المنتجات:

```typescript
export const GLOBAL_DISCOUNT = 0; // ضع 10 لخصم 10% على الكل
```

#### إضافة منتج جديد:

```typescript
{
  id: 7,                           // رقم فريد
  name: 'زيت اللافندر',            // اسم المنتج
  slug: 'lavender-oil',            // للرابط
  originalPrice: 200,              // السعر الأصلي
  discountPercentage: 15,          // خصم خاص بالمنتج (15%)
  // السعر النهائي = 200 * (1 - 0.15) = 170 جنيه

  size: '100 مل',
  image: '🌸',                      // إيموجي
  categories: ['relaxation'],      // الفئات
  category: 'relaxation',          // الفئة الرئيسية
  tags: ['استرخاء', 'نوم'],       // للبحث
  inStock: true,                   // متوفر؟
  featured: true,                  // يظهر في الصفحة الرئيسية؟

  description: 'وصف المنتج...',
  benefits: [
    'الفائدة الأولى',
    'الفائدة الثانية'
  ],
  ingredients: ['المكونات...'],
  howToUse: 'طريقة الاستخدام...',
  warnings: ['تحذير 1', 'تحذير 2'],

  rating: 4.5,
  reviews: 100,
  soldCount: 200
}
```

#### إضافة منتج جديد:

```typescript
{
  id: null,
  name: "",
  slug: "",
  originalPrice: null,
  discountPercentage: null,
  size: "",
  exteriorImage: "",
  interiorImages: [],
  categories: [],
  category: "",
  tags: [],
  inStock: false,
  featured: false,
  description: "",
  benefits: [],
  ingredients: [],
  howToUse: "",
  warnings: [],
  rating: null,
  reviews: null,
  soldCount: null,
}

```

#### تعديل سعر منتج موجود:

```typescript
{
  id: 1,
  name: 'زيت جوز الهند',
  originalPrice: 180,              // عدّل السعر الأصلي هنا
  discountPercentage: 25,          // عدّل نسبة الخصم هنا
  // السعر النهائي يُحسب تلقائياً
  // ...
}
```

---

### 3️⃣ إضافة أو تعديل عرض/باقة

**الملف:** `src/data/bundles.ts`

#### خصم عام على كل العروض:

```typescript
export const GLOBAL_BUNDLE_DISCOUNT = 0; // خصم إضافي على الكل
```

#### إضافة عرض جديد:

```typescript
{
  id: 'special-offer',             // معرّف فريد
  name: 'باقة العيد الخاصة',       // اسم العرض
  description: 'وصف العرض...',
  image: '🎁',
  products: [1, 2, 3],             // IDs المنتجات المشمولة
  originalPrice: 600,              // مجموع الأسعار الأصلية
  discountPercentage: 20,          // خصم خاص بالباقة (20%)
  // السعر النهائي = 600 * (1 - 0.20) = 480 جنيه

  category: 'special',
  featured: true,                  // يظهر في صفحة العروض؟
  benefits: [
    'وفر 120 جنيه',
    'منتجات متكاملة'
  ]
}
```

---

### 4️⃣ إضافة فئة جديدة

**الملف:** `src/data/config.ts`

```typescript
export const CATEGORIES = [
  { id: "all", name: "جميع الفئات", icon: "🌿" },
  { id: "new-category", name: "الفئة الجديدة", icon: "🎯" }, // أضف هنا
  // ... باقي الفئات
];
```

ثم استخدمها في المنتج:

```typescript
{
  id: 1,
  categories: ['hair', 'new-category'],  // يظهر في الفئة الجديدة
  // ...
}
```

---

### 5️⃣ تعديل الألوان والتصميم

**الملف:** `src/index.css`

```css
:root {
  /* الألوان الأساسية */
  --primary: 142 72% 29%; /* اللون الرئيسي (أخضر) */
  --primary-foreground: 0 0% 98%;

  /* ألوان الخلفية */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;

  /* ألوان البطاقات */
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;

  /* عدّل أي لون تريد هنا */
}

/* الوضع الليلي */
.dark {
  --primary: 142 72% 40%;
  /* ... */
}
```

---

### 6️⃣ تعديل حجم الخط والتباعد

**الملف:** `tailwind.config.ts`

```typescript
theme: {
  extend: {
    fontSize: {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',         // عدّل الحجم الأساسي
      'lg': '1.125rem',
      // ...
    },
    spacing: {
      '18': '4.5rem',         // أضف تباعد جديد
    }
  }
}
```

---

## 🔥 سيناريوهات شائعة

### تخفيض 20% على كل المنتجات:

```typescript
// في src/data/products.ts
export const GLOBAL_DISCOUNT = 20;
```

### تخفيض 30% على كل العروض:

```typescript
// في src/data/bundles.ts
export const GLOBAL_BUNDLE_DISCOUNT = 30;
```

### تغيير حد الشحن المجاني لـ 500 جنيه:

```typescript
// في src/data/config.ts
shipping: {
  freeShippingThreshold: 500,
  standardShipping: 25
}
```

### إخفاء منتج من الموقع مؤقتاً:

```typescript
{
  id: 1,
  inStock: false,  // سيظهر "نفذ من المخزون"
  // أو احذف السطر التالي لإخفائه تماماً
  featured: false,
}
```

---

## ✅ قائمة التحقق بعد التعديل

- [ ] راجع الأسعار - تأكد من صحة الحسابات
- [ ] اختبر السلة - أضف منتجات وتأكد من المجموع
- [ ] اختبر localStorage - اعمل refresh وتأكد من بقاء البيانات
- [ ] اختبر WhatsApp - أرسل طلب تجريبي
- [ ] اختبر الموبايل - تأكد من التصميم المتجاوب
- [ ] راجع الروابط - تأكد من صحة روابط السوشيال ميديا

---

## 🆘 المساعدة

إذا واجهت مشكلة، راجع:

1. **Console الـ Browser** (F12) - لرؤية الأخطاء
2. **localStorage** - تأكد من حفظ البيانات
3. **Network Tab** - تأكد من تحميل الملفات

---

**تم إعداده بواسطة:** فريق التطوير  
**آخر تحديث:** 2025-10-01
