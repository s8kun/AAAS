# AAAS Accessories Store — وثائق شاملة

هذه الوثائق تشرح المشروع بالكامل: البنية، التشغيل، البيانات، الصفحات، التدفق، والتخصيص والنشر. كل المسارات والأسماء المذكورة مطابقة للكود الحالي.

---

## 1) نظرة عامة

**AAAS** واجهة متجر إكسسوارات عربية RTL مبنية بـ React + TypeScript + Vite + Tailwind.  
التطبيق يعمل كـ SPA بدون React Router، والتنقل داخلي عبر `AppContext`.

**أهم الخصائص**
- واجهة عربية RTL متجاوبة
- عرض منتجات مع فلاتر وبحث
- سلة، مفضلة، وعروض/باقات
- نافذة تفاصيل منتج + عرض سريع
- إشعارات
- إرسال الطلب عبر واتساب

---

## 2) التشغيل محلياً

**المتطلبات**
- Node.js 18+

**الأوامر**
```bash
npm install
npm run dev
```
ثم افتح الرابط الذي يطبعه Vite في الطرفية.

**بناء نسخة الإنتاج**
```bash
npm run build
npm run preview
```

---

## 3) البنية العامة للمشروع

```
.
├── index.html
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── data/
│   │   ├── config.ts
│   │   ├── products.ts
│   │   └── bundles.ts
│   ├── context/
│   │   └── AppContext.tsx
│   ├── hooks/
│   │   └── use-products.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── ProductDetailsModal.tsx
│   │   ├── CartPage.tsx
│   │   ├── WishlistPage.tsx
│   │   ├── OffersPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ContactPage.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Notification.tsx
│   │   └── product/
│   │       ├── ProductCard.tsx
│   │       └── SearchAndFilter.tsx
│   └── index.css
└── public/
```

---

## 4) طريقة التنقل داخل التطبيق (بدون Router)

الملف الأساسي: `src/App.tsx`

- توجد دالة `renderPage()` التي ترجع الصفحة حسب `state.currentPage`.
- التغيير يتم عبر:
  ```ts
  dispatch({ type: "SET_PAGE", payload: "products" });
  ```
- الصفحات النشطة الآن:
  - `home`
  - `products`
  - `product-details`
  - `cart`
  - `about`
  - `contact`
  - `wishlist`
- صفحة العروض **موجودة** في الكود لكنها **معلّقة** في التنقل:
  - في `App.tsx` و `Header.tsx` و `Footer.tsx` تم تعليق `offers`.

لإظهار صفحة العروض فعلياً، فكّ التعليق في:
- `src/App.tsx`
- `src/components/common/Header.tsx`
- `src/components/common/Footer.tsx`

---

## 5) إدارة الحالة العالمية (AppContext)

الملف: `src/context/AppContext.tsx`

**أهم أجزاء الحالة**
- `currentPage`: الصفحة الحالية
- `cart`: محتويات السلة
- `wishlist`: المفضلة
- `quantities`: كميات عناصر محددة
- `customerInfo`: بيانات العميل (اسم، هاتف، عنوان)
- `searchTerm`: نص البحث
- `selectedCategory`: الفئة المختارة
- `priceRange`: نطاق السعر
- `selectedProduct`: المنتج المفتوح في التفاصيل
- `notifications`: إشعارات UI

**التخزين المحلي**
يتم حفظ بيانات السلة والمفضلة والعميل في `localStorage` بمفاتيح:
- `kavoral_cart`
- `kavoral_wishlist`
- `kavoral_quantities`
- `kavoral_customer_info`

---

## 6) البيانات والإعدادات

### 6.1 الإعدادات العامة
الملف: `src/data/config.ts`

**SITE_CONFIG** يحتوي على:
- الاسم والشعار والوصف
- وسائل التواصل
- إعدادات الشحن
- بيانات الشركة والمطور
- العملة
- رسائل النظام

**أهم دوال مساعدة**
- `getWhatsAppLink`
- `getPhoneLink`
- `getEmailLink`
- `formatPrice`
- `calculateSavings`
- `calculateDiscountPercentage`

### 6.2 المنتجات
الملف: `src/data/products.ts`

- يتم تحميل المنتجات من API عبر:
  ```ts
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api`)
  ```
- توجد نسبة خصم عامة:
  ```ts
  export const GLOBAL_DISCOUNT = 45;
  ```
- البيانات النهائية تُخزن في:
  ```ts
  export const PRODUCTS_DATA: Product[] = [];
  ```
- التحويل من بيانات خام إلى Product يتم عبر:
  - `normalizeRawProduct`
  - `mapToProducts`

**متغير بيئة مهم**
يجب تعريف:
```
VITE_BACKEND_URL
```
في ملف `.env` عند التشغيل الفعلي.

### 6.3 العروض والباقات
الملف: `src/data/bundles.ts`

- تعريف العروض ثابت في `rawBundles`
- السعر يحسب من مجموع أسعار المنتجات + خصم العروض:
  ```ts
  export const BUNDLE_DISCOUNT = 0;
  ```
- الحساب يتم داخل `buildBundlesData(products)`

---

## 7) الصفحات والمكونات الأساسية

### HomePage
الملف: `src/pages/HomePage.tsx`
- عرض Hero متحرك + أقسام مميزات وأرقام وإكسسوارات مميزة
- أعلى المنتجات مبيعاً يعتمد على `soldCount`
- يعتمد على `SITE_CONFIG` و `useProducts`

### ProductsPage
الملف: `src/pages/ProductsPage.tsx`
- يعتمد على `SearchAndFilter`
- فلترة بالبحث + الفئات + نطاق السعر
- يعتمد على `useApp` و `useProducts`

### ProductCard + Quick View
الملف: `src/components/product/ProductCard.tsx`
- بطاقة المنتج + إضافة للسلة + المفضلة
- نافذة عرض سريع باستخدام `Swiper`

### ProductDetailsModal
الملف: `src/pages/ProductDetailsModal.tsx`
- عرض تفصيلي داخل Modal
- سلايدر صور يدوي للـ `interiorImages`

### CartPage
الملف: `src/pages/CartPage.tsx`
- حساب إجمالي وسعر الشحن
- نموذج بيانات العميل
- إرسال الطلب عبر واتساب برسالة مفصلة
- **ملاحظة**: تحقق الهاتف يستخدم Regex لمصر رغم أن البيانات ليبية:
  ```ts
  const egyptianPhoneRegex = /^(01)[0-2,5]{1}[0-9]{8}$/;
  ```
  إذا أردت التحقق لليبيا، يلزم تعديل هذا الجزء.

### OffersPage
الملف: `src/pages/OffersPage.tsx`
- يعرض الباقات والعروض
- يضيفها للسلة كـ `isBundle: true`
- الصفحة حالياً غير مربوطة بالتنقل (معلّقة)

### WishlistPage
الملف: `src/pages/WishlistPage.tsx`
- حفظ وإدارة المفضلة

### AboutPage / ContactPage
- صفحات محتوى ثابت بالاعتماد على `SITE_CONFIG`

---

## 8) الـ UI والمظهر

**Tailwind + CSS**
- `src/index.css` يحتوي على المتغيرات والستايل العام
- الألوان يمكن تعديلها من `:root`

**الشعار والصور**
- الشعار: `src/assets/logo.png`

---

## 9) تغيير البيانات بسرعة (أهم النقاط)

### تعديل الاسم والتواصل
`src/data/config.ts`
```ts
SITE_CONFIG.name
SITE_CONFIG.contact.phone
SITE_CONFIG.contact.whatsapp
```

### تغيير الشحن والعملة
`src/data/config.ts`
```ts
SITE_CONFIG.shipping.freeShippingThreshold
SITE_CONFIG.shipping.standardShipping
SITE_CONFIG.currency
```

### تغيير الخصم العام
`src/data/products.ts`
```ts
export const GLOBAL_DISCOUNT = 45;
```

### إيقاف / تفعيل صفحة العروض
فك التعليق في:
- `src/App.tsx`
- `src/components/common/Header.tsx`
- `src/components/common/Footer.tsx`

---

## 10) النشر

المشروع Static ويمكن نشره على:
Netlify / Vercel / GitHub Pages

**خطوات**
1. بناء المشروع:
   ```bash
   npm run build
   ```
2. رفع مجلد `dist/`
3. إضافة متغير البيئة `VITE_BACKEND_URL` في لوحة النشر

---

## 11) نقاط فنية مهمة

- المشروع لا يستخدم React Router
- التنقل يعتمد على `AppContext`
- `products.ts` يتم تحميله من API بمجرد استيراده (دعوة `void loadProducts()` في نهاية الملف)
- `PRODUCTS_DATA` هو مصدر البيانات النهائي في الواجهة
- أي تغييرات على الداتا تحتاج تحديث API أو تعديل طريقة التحميل

---

## 12) استكشاف الأخطاء السريع

**لا تظهر المنتجات؟**
- تأكد من `VITE_BACKEND_URL`
- تحقق من Network tab أن `/api` يرجع بيانات

**الواتساب لا يفتح؟**
- تحقق من السماح بالنوافذ المنبثقة

**مشاكل RTL أو الخطوط؟**
- راجع `index.css`

---

## 13) ملفات مرجعية مهمة

هذه الملفات هي أهم المراجع لأي تعديل:
- `src/data/config.ts`
- `src/data/products.ts`
- `src/data/bundles.ts`
- `src/context/AppContext.tsx`
- `src/App.tsx`
- `src/pages/*`
- `src/components/common/*`
- `src/components/product/*`

---

إذا تريد نسخة مخصصة للتسليم للعميل (PDF أو DOCX) أو وثائق إضافية مثل API Spec أو نظام إدارة محتوى، قلّي المطلوب بالضبط.
