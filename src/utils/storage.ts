// مساعد للتعامل مع localStorage بشكل آمن

export const storage = {
  // حفظ بيانات
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
      return false;
    }
  },

  // قراءة بيانات
  get: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  // حذف بيانات
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  },

  // مسح كل البيانات
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// مفاتيح التخزين
export const STORAGE_KEYS = {
  CART: 'kavoral_cart',
  WISHLIST: 'kavoral_wishlist',
  QUANTITIES: 'kavoral_quantities',
  CUSTOMER_INFO: 'kavoral_customer_info'
};
