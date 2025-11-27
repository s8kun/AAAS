import {
  Leaf,
  Award,
  Users,
  Target,
  Heart,
  Shield,
  Sparkles,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { SITE_CONFIG } from "@/data/config";
import logo from "@/assets/logo.png";

export default function AboutPage() {
  const { dispatch } = useApp();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-hero py-20 mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="mb-8 animate-scale-in">
              <img
                src={logo}
                alt={SITE_CONFIG.name}
                className="w-32 h-32 rounded-full shadow-large mx-auto mb-6 border-4 border-white/20"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              من نحن
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              {SITE_CONFIG.description ||
                `نقدم لك مجموعة متنوعة من الإكسسوارات الأنيقة والعصرية التي تضيف لمسة جمالية لكل إطلالة، مع جودة عالية وأسعار تنافسية.`}
            </p>
            <div
              className="flex flex-wrap justify-center gap-4 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="font-bold text-2xl">
                  {SITE_CONFIG.company.experience}
                </span>
                <span className="text-sm mr-2">خبرة في السوق</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="font-bold text-2xl">
                  {SITE_CONFIG.company.customersCount}
                </span>
                <span className="text-sm mr-2">عميل راضٍ</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="font-bold text-2xl">
                  {SITE_CONFIG.company.productsCount}
                </span>
                <span className="text-sm mr-2">منتج عصري</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* قصتنا */}
        <div className="max-w-4xl mx-auto mb-16 animate-slide-up">
          <div className="card-natural p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">قصتنا</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                بدأت رحلتنا في عام{" "}
                <strong className="text-primary">
                  {SITE_CONFIG.company.foundedYear}
                </strong>{" "}
                من شغفنا بعالم الإكسسوارات ودورها في إبراز جمالك وأناقتك. نحن في{" "}
                <strong className="text-primary">{SITE_CONFIG.name}</strong>{" "}
                نؤمن بأن التفاصيل تصنع الفرق، لذلك نوفر لك مجموعات مميزة من
                الإكسسوارات العصرية ذات الجودة العالية.
              </p>
              <p className="text-lg">
                على مدار{" "}
                <strong className="text-primary">
                  {SITE_CONFIG.company.experience}
                </strong>
                ، نجحنا في خدمة أكثر من{" "}
                <strong className="text-primary">
                  {SITE_CONFIG.company.customersCount}
                </strong>{" "}
                عميل راضٍ عن منتجات الإكسسوارات، وحققنا نسبة رضا تصل إلى{" "}
                <strong className="text-primary">
                  {SITE_CONFIG.company.satisfactionRate}
                </strong>
                . هذا النجاح يعود لالتزامنا الكامل بالجودة والمصداقية وخدمة
                عملائنا بأفضل طريقة ممكنة.
              </p>
              <p className="text-lg">
                نحن نختار كل قطعة بعناية فائقة، ونتأكد من خاماتها وجودتها قبل أن
                تصل إليك. هدفنا أن نكون شريكك الموثوق في تنسيق إطلالتك اليومية
                والمناسبات الخاصة.
              </p>
            </div>
          </div>
        </div>

        {/* قيمنا */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              قيمنا الأساسية
            </h2>
            <p className="text-lg text-muted-foreground">
              المبادئ التي نلتزم بها في تقديم أفضل الإكسسوارات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "تصاميم عصرية",
                description:
                  "قطع تناسب جميع الأذواق والمناسبات، بتصاميم حديثة ومبتكرة",
                color: "text-green-500",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "الجودة أولاً",
                description:
                  "نختار الخامات بعناية ونختبرها للتأكد من جودتها ومتانتها",
                color: "text-blue-500",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "نهتم بعملائنا",
                description:
                  "رضاك هو هدفنا الأول، ونسعى دائماً لتقديم أفضل تجربة تسوق للإكسسوارات",
                color: "text-red-500",
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "الشفافية",
                description:
                  "نوضح تفاصيل كل قطعة بوضوح ونلتزم بالمصداقية الكاملة مع عملائنا",
                color: "text-purple-500",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "التطوير المستمر",
                description:
                  "نبحث دائماً عن أحدث صيحات الإكسسوارات ونطور خدماتنا لنلبي احتياجاتك",
                color: "text-orange-500",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "الخبرة والاحترافية",
                description:
                  "فريقنا يقدم لك نصائح لاختيار الإكسسوارات الأنسب لك",
                color: "text-yellow-500",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="card-natural p-6 text-center group hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 ${value.color} group-hover:scale-110 transition-smooth`}
                >
                  {value.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* لماذا نحن */}
        <div className="mb-16">
          <div className="gradient-hero text-primary-foreground rounded-2xl p-8 md:p-12 shadow-large">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <Sparkles className="w-16 h-16 mx-auto mb-4 animate-gentle-float" />
                <h2 className="text-4xl font-bold mb-4">
                  لماذا تختار {SITE_CONFIG.name}؟
                </h2>
                <p className="text-xl opacity-90">
                  نقدم لك أكثر من مجرد منتجات
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "إكسسوارات عصرية تناسب جميع الأذواق",
                  "شحن سريع وآمن لجميع أنحاء ليبيا",
                  "شحن مجاني للطلبات فوق 120 دينار",
                  "مساعدة في تنسيق الإطلالات",
                  "أسعار تنافسية وعروض حصرية",
                  "ضمان الجودة واسترجاع مجاني",
                  "دعم فني متوفر على مدار الساعة",
                  "تغليف أنيق ومناسب للهدايا",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* إحصائياتنا */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              إنجازاتنا في عالم الإكسسوارات
            </h2>
            <p className="text-lg text-muted-foreground">
              أرقام تعكس التزامنا ونجاحنا
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-natural p-6 text-center hover-lift">
              <div className="text-5xl font-bold text-primary mb-2">
                {SITE_CONFIG.company.experience}
              </div>
              <div className="text-sm text-muted-foreground">خبرة في السوق</div>
            </div>
            <div className="card-natural p-6 text-center hover-lift">
              <div className="text-5xl font-bold text-primary mb-2">
                {SITE_CONFIG.company.customersCount}
              </div>
              <div className="text-sm text-muted-foreground">عميل سعيد</div>
            </div>
            <div className="card-natural p-6 text-center hover-lift">
              <div className="text-5xl font-bold text-primary mb-2">
                {SITE_CONFIG.company.productsCount}
              </div>
              <div className="text-sm text-muted-foreground">منتج عصري</div>
            </div>
            <div className="card-natural p-6 text-center hover-lift">
              <div className="text-5xl font-bold text-primary mb-2">
                {SITE_CONFIG.company.satisfactionRate}
              </div>
              <div className="text-sm text-muted-foreground">نسبة الرضا</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-2xl mx-auto text-center mb-16 animate-scale-in">
          <div className="card-natural p-8">
            <Users className="w-16 h-16 text-primary mx-auto mb-6 animate-gentle-float" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              انضم لعائلتنا الكبيرة
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              كن جزءاً من آلاف العملاء الذين اختاروا الإطلالة الأنيقة مع{" "}
              {SITE_CONFIG.name}. نحن هنا لنساعدك في تنسيق إطلالتك بأجمل
              الإكسسوارات.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="hero"
                onClick={() =>
                  dispatch({ type: "SET_PAGE", payload: "products" })
                }
                className="shadow-glow"
              >
                <Leaf className="w-5 h-5" />
                تصفح الإكسسوارات
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  dispatch({ type: "SET_PAGE", payload: "contact" })
                }
              >
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
