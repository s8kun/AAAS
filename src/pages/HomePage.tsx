import {
  Sparkles,
  Gift,
  Leaf,
  ShieldCheck,
  Award,
  Truck,
  Star,
  TrendingUp,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { useApp } from "@/context/AppContext";
import { PRODUCTS_DATA } from "@/data/products";
import { SITE_CONFIG } from "@/data/config";
import logo from "@/assets/logo.png";

export default function HomePage() {
  const { dispatch } = useApp();
  const featuredProducts = PRODUCTS_DATA.filter((p) => p.featured).slice(0, 6);
  const bestSellers = PRODUCTS_DATA.sort(
    (a, b) => b.soldCount - a.soldCount
  ).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden gradient-hero">
        {/* خلفية متحركة */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48 animate-gentle-float"></div>
          <div
            className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-40 translate-y-40 animate-gentle-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full animate-gentle-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={logo}
                alt={SITE_CONFIG.name}
                className="size-40 animate-gentle-float"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-scale-in">
            مرحباً بك في {SITE_CONFIG.name}
          </h1>
          <p className="text-xl md:text-3xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-scale-in leading-relaxed">
            {SITE_CONFIG.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in">
            <Button
              variant="hero"
              size="lg"
              onClick={() =>
                dispatch({ type: "SET_PAGE", payload: "products" })
              }
              className="shadow-glow text-lg px-8 py-6"
            >
              <Leaf className="w-6 h-6" />
              تصفح الإكسسوارات
            </Button>
            <Button
              variant="accent"
              size="lg"
              onClick={() => dispatch({ type: "SET_PAGE", payload: "offers" })}
              className="shadow-glow text-lg px-8 py-6"
            >
              <Gift className="w-6 h-6" />
              عروض الإكسسوارات
            </Button>
          </div>

          {/* مؤشرات الثقة */}
          <div className="flex flex-wrap justify-center gap-8 text-primary-foreground animate-scale-in">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 hover-lift">
              <ShieldCheck className="w-6 h-6" />
              <span className="font-medium">إكسسوارات معتمدة</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 hover-lift">
              <Truck className="w-6 h-6" />
              <span className="font-medium">
                شحن مجاني لطلبات الإكسسوارات فوق{" "}
                {SITE_CONFIG.shipping.freeShippingThreshold} د
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 hover-lift">
              <Award className="w-6 h-6" />
              <span className="font-medium">
                {SITE_CONFIG.company.customersCount} عميل راضٍ عن إكسسواراتنا
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* المميزات */}
      <section className="py-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "جودة مضمونة",
                desc: "تصاميم أصلية وجودة عالية",
                color: "primary",
              },
              {
                icon: Truck,
                title: "توصيل سريع",
                desc: `شحن مجاني على الإكسسوارات فوق ${SITE_CONFIG.shipping.freeShippingThreshold} دينار`,
                color: "secondary",
              },
              {
                icon: Award,
                title: SITE_CONFIG.company.experience,
                desc: "خبرة في مجال الإكسسوارات",
                color: "accent",
              },
              {
                icon: Heart,
                title: `${SITE_CONFIG.company.customersCount} عميل`,
                desc: "ثقة ورضا عملاء الإكسسوارات",
                color: "primary",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card-natural p-6 text-center group animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth shadow-medium">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الأكثر مبيعاً */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 rounded-full px-6 py-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-primary font-bold">الأكثر مبيعاً</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              إكسسواراتنا الأكثر طلباً
            </h2>
            <p className="text-lg text-muted-foreground">
              القطع التي يحبها عملاؤنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {bestSellers.map((product, i) => (
              <div key={product.id} className="relative">
                <div className="absolute -top-3 -right-3 z-10 w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center shadow-large animate-pulse-soft">
                  <span className="text-white font-bold text-lg">#{i + 1}</span>
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* المنتجات المميزة */}
      <section className="py-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 rounded-full px-6 py-2 mb-4">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span className="text-primary font-bold">مختارات خاصة</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              إكسسواراتنا المميزة
            </h2>
            <p className="text-lg text-muted-foreground">
              اكتشف أجمل الإكسسوارات العصرية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="default"
              size="lg"
              onClick={() =>
                dispatch({ type: "SET_PAGE", payload: "products" })
              }
              className="shadow-medium"
            >
              عرض جميع الإكسسوارات ({PRODUCTS_DATA.length})
            </Button>
          </div>
        </div>
      </section>

      {/* لماذا نحن */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                لماذا تختار {SITE_CONFIG.name}؟
              </h2>
              <p className="text-lg text-muted-foreground">
                نقدم لك أجمل الإكسسوارات بمعايير جودة عالية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: "✅",
                  title: "إكسسوارات عصرية ومتينة",
                  desc: "قطع مصممة بعناية لتناسب جميع الأذواق",
                },
                {
                  icon: "🎯",
                  title: "أسعار تنافسية",
                  desc: "أفضل الأسعار مع عروض وخصومات مستمرة",
                },
                {
                  icon: "🚚",
                  title: "توصيل سريع",
                  desc: `نوصل الإكسسوارات لجميع المحافظات في ${SITE_CONFIG.shipping.estimatedDelivery}`,
                },
                {
                  icon: "💚",
                  title: "دعم متواصل",
                  desc: "فريق خدمة العملاء جاهز لمساعدتك في اختيار الإكسسوارات",
                },
                {
                  icon: "⭐",
                  title: "تقييمات ممتازة",
                  desc: `معدل رضا ${SITE_CONFIG.company.satisfactionRate} من عملائنا عن الإكسسوارات`,
                },
                {
                  icon: "🔒",
                  title: "دفع آمن",
                  desc: "الدفع عند الاستلام مع ضمان استرجاع الأموال",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card-natural p-6 hover-lift animate-scale-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* إحصائيات */}
      <section className="py-16 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              أرقامنا في عالم الإكسسوارات
            </h2>
            <p className="text-xl opacity-90">نفخر بإنجازاتنا معكم</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: SITE_CONFIG.company.experience,
                label: "خبرة",
                icon: "📅",
              },
              {
                number: SITE_CONFIG.company.customersCount,
                label: "عميل راضٍ",
                icon: "👥",
              },
              {
                number: SITE_CONFIG.company.productsCount,
                label: "قطعة إكسسوار",
                icon: "💍",
              },
              {
                number: SITE_CONFIG.company.satisfactionRate,
                label: "رضا العملاء",
                icon: "⭐",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center card-natural p-6 bg-white/10 backdrop-blur-sm border-white/20 animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="card-natural p-12 text-center max-w-3xl mx-auto gradient-subtle">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6 animate-gentle-float" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              جاهز لتنسيق إطلالتك بإكسسوارات رائعة؟
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              انضم إلى آلاف العملاء الراضين واكتشف أجمل الإكسسوارات لمختلف
              المناسبات
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="hero"
                size="lg"
                onClick={() =>
                  dispatch({ type: "SET_PAGE", payload: "products" })
                }
                className="shadow-glow"
              >
                <Leaf className="w-5 h-5" />
                ابدأ التسوق في الإكسسوارات
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  dispatch({ type: "SET_PAGE", payload: "contact" })
                }
              >
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
