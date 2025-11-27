import {
  Phone,
  Mail,
  MessageCircle,
  Users,
  Facebook,
  Instagram,
  Clock,
  MapPin,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-8 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <div className="text-center mb-12 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <MessageCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            تواصل معنا
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتك ومساعدتك في اختيار الإكسسوارات
            المناسبة لإطلالتك
          </p>
        </div>

        {/* بطاقات التواصل الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* اتصل بنا */}
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="card-natural p-6 text-center group hover-lift animate-scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth shadow-medium">
              <Phone className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">
              اتصل بنا مباشرة
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              تواصل معنا عبر الهاتف للاستفسار عن الإكسسوارات
            </p>
            <p className="text-primary font-bold text-lg" dir="ltr">
              {SITE_CONFIG.contact.phoneDisplay}
            </p>
          </a>

          {/* واتساب */}
          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-natural p-6 text-center group hover-lift animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth shadow-medium">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">
              راسلنا على واتساب
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              الرد خلال دقائق على استفسارات الإكسسوارات
            </p>
            <p className="text-green-600 font-bold text-lg">أرسل رسالة</p>
          </a>

          {/* جروب الواتساب */}
          <a
            href={SITE_CONFIG.contact.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="card-natural p-6 text-center group hover-lift animate-scale-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth shadow-medium">
              <Users className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">
              انضم لمجتمعنا
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              جروب الواتساب لعشاق الإكسسوارات
            </p>
            <p className="text-secondary font-bold text-lg">انضم الآن</p>
          </a>

          {/* البريد الإلكتروني */}
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="card-natural p-6 text-center group hover-lift animate-scale-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth shadow-medium">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">
              راسلنا عبر الإيميل
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              للاستفسارات الرسمية
            </p>
            <p className="text-blue-600 font-bold text-sm break-all px-2">
              {SITE_CONFIG.contact.email}
            </p>
          </a>
        </div>

        {/* السوشيال ميديا */}
        <div
          className="mb-16 animate-scale-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="gradient-hero text-primary-foreground rounded-2xl p-10 shadow-large relative overflow-hidden">
            {/* خلفية ديكورية */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-3 text-center">
                تابعنا على السوشيال ميديا
              </h2>
              <p className="text-center text-primary-foreground/90 mb-8 text-lg">
                اكتشف آخر العروض وقطع الإكسسوارات الجديدة
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 transition-all duration-300 hover:scale-105 shadow-medium"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Facebook className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">Facebook</p>
                    <p className="text-sm text-white/80">تابعنا على فيسبوك</p>
                  </div>
                </a>

                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 transition-all duration-300 hover:scale-105 shadow-medium"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">Instagram</p>
                    <p className="text-sm text-white/80">تابعنا على انستجرام</p>
                  </div>
                </a>

                <a
                  href={SITE_CONFIG.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 transition-all duration-300 hover:scale-105 shadow-medium"
                >
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">TikTok</p>
                    <p className="text-sm text-white/80">تابعنا على تيك توك</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* بطاقة معلومات التواصل التفصيلية */}
        <div
          className="max-w-3xl mx-auto animate-scale-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="card-natural p-8 shadow-large">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-2">
                معلومات التواصل الخاصة بالإكسسوارات
              </h3>
              <p className="text-muted-foreground">نحن في خدمتك دائماً</p>
            </div>

            <div className="space-y-6">
              {/* الهاتف */}
              <div className="flex items-start gap-4 p-4 bg-gradient-subtle rounded-xl hover-lift">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-foreground mb-1">
                    رقم الهاتف
                  </h4>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="text-muted-foreground hover:text-primary transition-smooth text-lg"
                    dir="ltr"
                  >
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    متاح للمكالمات والرسائل بخصوص الإكسسوارات
                  </p>
                </div>
              </div>

              {/* واتساب */}
              <div className="flex items-start gap-4 p-4 bg-gradient-subtle rounded-xl hover-lift">
                <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-foreground mb-1">
                    واتساب
                  </h4>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-green-600 transition-smooth text-lg"
                    dir="ltr"
                  >
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    الرد خلال دقائق معدودة على استفسارات الإكسسوارات
                  </p>
                </div>
              </div>

              {/* البريد الإلكتروني */}
              <div className="flex items-start gap-4 p-4 bg-gradient-subtle rounded-xl hover-lift">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-foreground mb-1">
                    البريد الإلكتروني
                  </h4>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-muted-foreground hover:text-blue-600 transition-smooth break-all"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    للاستفسارات والطلبات الرسمية الخاصة بالإكسسوارات
                  </p>
                </div>
              </div>

              {/* ساعات العمل */}
              <div className="flex items-start gap-4 p-4 bg-gradient-subtle rounded-xl">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-foreground mb-1">
                    ساعات العمل
                  </h4>
                  <p className="text-muted-foreground text-lg">
                    {SITE_CONFIG.contact.workingHours}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {SITE_CONFIG.contact.workingDays}
                  </p>
                </div>
              </div>

              {/* الموقع */}
              <div className="flex items-start gap-4 p-4 bg-gradient-subtle rounded-xl">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-foreground mb-1">
                    التوصيل
                  </h4>
                  <p className="text-muted-foreground text-lg">
                    نوصل الإكسسوارات لجميع أنحاء ليبيا
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    خدمة توصيل سريعة وآمنة لقطع الإكسسوارات
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="mt-16 text-center animate-scale-in"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="card-natural p-8 max-w-2xl mx-auto">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              هل لديك سؤال عن الإكسسوارات؟
            </h3>
            <p className="text-muted-foreground mb-6">
              لا تتردد في التواصل معنا! فريقنا جاهز لمساعدتك في اختيار القطع
              الأنسب لك
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-smooth shadow-medium hover:shadow-large"
              >
                <MessageCircle className="w-5 h-5" />
                تواصل عبر واتساب
              </a>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-smooth shadow-medium hover:shadow-large"
              >
                <Phone className="w-5 h-5" />
                اتصل الآن
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
