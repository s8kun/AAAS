import {
  Phone,
  Mail,
  MessageCircle,
  Users,
  Facebook,
  Instagram,
  Clock,
  MapPin,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import {
  SITE_CONFIG,
  getWhatsAppLink,
  getPhoneLink,
  getEmailLink,
} from "@/data/config";
import logo from "@/assets/logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* زر الصعود للأعلى */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-glow flex items-center justify-center hover:scale-110 transition-smooth md:w-12 md:h-12"
        aria-label="العودة للأعلى"
      >
        <ArrowUp className="w-6 h-6 md:w-5 md:h-5" />
      </button>

      <footer className="bg-gradient-to-b from-muted to-muted/50 mt-20 border-t-4 border-primary/30">
        {/* القسم العلوي - معلومات الشركة */}
        <div className="bg-primary/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={logo}
                    alt={SITE_CONFIG.name}
                    className="w-16 h-16 md:w-14 md:h-14 "
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-xl font-bold text-primary">
                    {SITE_CONFIG.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {SITE_CONFIG.tagline}
                  </p>
                </div>
              </div>

              {/* إحصائيات */}
              <div className="flex gap-3 md:gap-2">
                <div className="bg-card rounded-xl p-4 md:p-3 shadow-soft border border-primary/20 min-w-[100px] md:min-w-[80px]">
                  <div className="text-2xl md:text-xl font-bold text-primary">
                    {SITE_CONFIG.company.experience}
                  </div>
                  <div className="text-xs text-muted-foreground">خبرة</div>
                </div>
                <div className="bg-card rounded-xl p-4 md:p-3 shadow-soft border border-primary/20 min-w-[100px] md:min-w-[80px]">
                  <div className="text-2xl md:text-xl font-bold text-primary">
                    {SITE_CONFIG.company.customersCount}
                  </div>
                  <div className="text-xs text-muted-foreground">عميل راضٍ</div>
                </div>
                <div className="bg-card rounded-xl p-4 md:p-3 shadow-soft border border-primary/20 min-w-[100px] md:min-w-[80px]">
                  <div className="text-2xl md:text-xl font-bold text-primary">
                    {SITE_CONFIG.company.satisfactionRate}
                  </div>
                  <div className="text-xs text-muted-foreground">رضا</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* القسم الرئيسي */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* معلومات إضافية */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                عن المتجر
              </h4>
              <div className="space-y-3">
                <div className="bg-card rounded-lg p-3 shadow-soft">
                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        أوقات العمل
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {SITE_CONFIG.contact.workingHours}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-3 shadow-soft">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        التوصيل
                      </p>
                      <p className="text-xs text-muted-foreground">
                        جميع أنحاء ليبيا
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* روابط سريعة */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
                روابط سريعة
              </h4>
              <div className="space-y-2">
                {[
                  { label: "الرئيسية", icon: "🏠" },
                  { label: "المنتجات", icon: "🛍️" },
                  // { label: "العروض", icon: "🎁" },
                  { label: "من نحن", icon: "ℹ️" },
                  { label: "تواصل معنا", icon: "📞" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href="#"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth py-2 px-3 rounded-lg hover:bg-primary/5 group"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* التواصل */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                تواصل معنا
              </h4>
              <div className="space-y-3">
                <a
                  href={getPhoneLink()}
                  className="flex items-center gap-3 text-sm p-3 rounded-lg bg-card shadow-soft hover:shadow-medium hover:scale-105 transition-smooth group border border-transparent hover:border-primary/30"
                >
                  <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-medium">
                    <Phone className="w-5 h-5 md:w-4 md:h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      اتصل بنا
                    </p>
                    <p className="font-bold text-foreground">
                      {SITE_CONFIG.contact.phoneDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm p-3 rounded-lg bg-[#25D366]/10 shadow-soft hover:shadow-medium hover:scale-105 transition-smooth group border border-[#25D366]/20"
                >
                  <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-medium">
                    <MessageCircle className="w-5 h-5 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      راسلنا على
                    </p>
                    <p className="font-bold text-[#25D366]">واتساب</p>
                  </div>
                </a>

                <a
                  href={SITE_CONFIG.contact.whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm p-3 rounded-lg bg-card shadow-soft hover:shadow-medium hover:scale-105 transition-smooth group border border-transparent hover:border-primary/30"
                >
                  <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-gradient-secondary flex items-center justify-center shadow-medium">
                    <Users className="w-5 h-5 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      انضم إلى
                    </p>
                    <p className="font-bold text-foreground">جروب الواتساب</p>
                  </div>
                </a>
              </div>
            </div>

            {/* السوشيال ميديا */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                تابعنا
              </h4>

              <div className="space-y-3 mb-6">
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 transition-smooth group border border-[#1877F2]/20"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center shadow-medium">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="font-bold text-[#1877F2] text-sm">فيسبوك</p>
                    <p className="text-xs text-muted-foreground">
                      تابعنا على Facebook
                    </p>
                  </div>
                </a>

                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-smooth group border border-purple-500/20"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-medium">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="font-bold text-purple-600 text-sm">
                      إنستجرام
                    </p>
                    <p className="text-xs text-muted-foreground">
                      تابعنا على Instagram
                    </p>
                  </div>
                </a>

                <a
                  href={SITE_CONFIG.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-black/5 hover:bg-black/10 transition-smooth group border border-black/10"
                >
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-medium">
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="font-bold text-black text-sm">تيك توك</p>
                    <p className="text-xs text-muted-foreground">
                      تابعنا على TikTok
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* الحقوق والمطور */}
        <div className="border-t-2 border-primary/20 bg-muted/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4 text-center text-sm text-muted-foreground">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <span className="font-medium text-foreground">
                  © {currentYear} {SITE_CONFIG.name}
                </span>
                <span className="hidden sm:inline text-border">•</span>
                <span>جميع الحقوق محفوظة</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
                <a
                  href="#"
                  className="hover:text-primary transition-smooth py-1 px-3 rounded-full hover:bg-primary/5"
                >
                  سياسة الخصوصية
                </a>
                <span className="text-border">|</span>
                <a
                  href="#"
                  className="hover:text-primary transition-smooth py-1 px-3 rounded-full hover:bg-primary/5"
                >
                  الشروط والأحكام
                </a>
                <span className="text-border">|</span>
                <a
                  href={`https://wa.me/${
                    SITE_CONFIG.developer.whatsapp
                  }?text=${encodeURIComponent(
                    "مرحباً، أريد التواصل مع المطور"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-smooth flex items-center gap-1 py-1 px-3 rounded-full hover:bg-primary/5"
                >
                  <span>💻</span>
                  <span>تطوير:</span>
                  <span className="font-medium">
                    {SITE_CONFIG.developer.name}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
