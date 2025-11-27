import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';

export default function WishlistPage() {
  const { state, dispatch } = useApp();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearWishlist = () => {
    state.wishlist.forEach(product => {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        type: 'info',
        message: 'تم مسح قائمة المفضلة'
      }
    });
    setShowClearConfirm(false);
  };

  if (state.wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center animate-scale-in">
          <div className="relative inline-block mb-6">
            <Heart className="w-24 h-24 text-muted-foreground/30 animate-gentle-float" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-background"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">قائمة المفضلة فارغة</h2>
          <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
            أضف منتجاتك المفضلة هنا للعودة إليها لاحقاً والاحتفاظ بها
          </p>
          <Button 
            size="lg"
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
            className="shadow-glow"
          >
            <ShoppingBag className="w-5 h-5" />
            اكتشف المنتجات
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">قائمة المفضلة</h1>
          <p className="text-lg text-muted-foreground">
            لديك {state.wishlist.length} {state.wishlist.length === 1 ? 'منتج' : 'منتجات'} في قائمة المفضلة
          </p>
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-scale-in">
          <Button
            variant="outline"
            onClick={() => setShowClearConfirm(true)}
            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
          >
            <Trash2 className="w-4 h-4" />
            مسح القائمة
          </Button>
          <Button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
          >
            <ShoppingBag className="w-4 h-4" />
            إضافة المزيد
          </Button>
        </div>

        {/* تأكيد المسح */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-scale-in">
            <div className="card-natural p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">تأكيد المسح</h3>
              <p className="text-muted-foreground mb-6 text-center">
                هل أنت متأكد من مسح جميع المنتجات من قائمة المفضلة؟ لا يمكن التراجع عن هذا الإجراء.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleClearWishlist}
                >
                  نعم، امسح الكل
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowClearConfirm(false)}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* المنتجات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.wishlist.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* نصائح */}
        <div className="mt-16 card-natural p-6 max-w-2xl mx-auto text-center animate-scale-in">
          <h3 className="font-bold text-lg mb-3 text-foreground">💡 نصيحة</h3>
          <p className="text-muted-foreground text-sm">
            احفظ منتجاتك المفضلة هنا لتتمكن من مقارنتها أو شرائها لاحقاً. المنتجات محفوظة حتى بعد إغلاق المتصفح!
          </p>
        </div>
      </div>
    </div>
  );
}