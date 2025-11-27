import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
  isBundle?: boolean;
  bundleId?: string;
  bundleProducts?: number[];
}

interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface AppState {
  currentPage: string;
  cart: CartItem[];
  quantities: Record<number, number>;
  wishlist: Product[];
  customerInfo: CustomerInfo;
  searchTerm: string;
  selectedCategory: string;
  priceRange: [number, number];
  notifications: Notification[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: number | string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: number | string; quantity: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'RESET_QUANTITY'; payload: number }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] }
  | { type: 'UPDATE_CUSTOMER_INFO'; payload: Partial<CustomerInfo> }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const STORAGE_KEYS = {
  CART: 'kavoral_cart',
  WISHLIST: 'kavoral_wishlist',
  QUANTITIES: 'kavoral_quantities',
  CUSTOMER_INFO: 'kavoral_customer_info'
};

const initialState: AppState = {
  currentPage: 'home',
  cart: [],
  quantities: {},
  wishlist: [],
  customerInfo: {
    name: '',
    address: '',
    phone: ''
  },
  searchTerm: '',
  selectedCategory: 'all',
  priceRange: [0, 1000],
  notifications: [],
  selectedProduct: null,
  isLoading: false,
  error: null
};

// Helper functions for localStorage
const saveToStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    
    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex(item => 
        item.isBundle 
          ? item.bundleId === action.payload.bundleId
          : item.id === action.payload.id
      );
      
      let updatedCart: CartItem[];
      
      if (existingIndex >= 0) {
        // المنتج موجود - زيادة الكمية
        updatedCart = state.cart.map((item, index) => 
          index === existingIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // منتج جديد - إضافة للسلة
        updatedCart = [...state.cart, action.payload];
      }
      
      saveToStorage(STORAGE_KEYS.CART, updatedCart);
      return { ...state, cart: updatedCart };
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedCart = state.cart.filter(item => 
        item.isBundle 
          ? item.bundleId !== action.payload
          : item.id !== action.payload
      );
      saveToStorage(STORAGE_KEYS.CART, updatedCart);
      return { ...state, cart: updatedCart };
    }
    
    case 'UPDATE_CART_QUANTITY': {
      if (action.payload.quantity < 1) return state;
      
      const updatedCart = state.cart.map(item => {
        const itemId = item.isBundle ? item.bundleId : item.id;
        return itemId === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item;
      });
      
      saveToStorage(STORAGE_KEYS.CART, updatedCart);
      return { ...state, cart: updatedCart };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedQuantities = {
        ...state.quantities,
        [action.payload.id]: action.payload.quantity
      };
      saveToStorage(STORAGE_KEYS.QUANTITIES, updatedQuantities);
      return { ...state, quantities: updatedQuantities };
    }
    
    case 'RESET_QUANTITY': {
      const updatedQuantities = {
        ...state.quantities,
        [action.payload]: 1
      };
      saveToStorage(STORAGE_KEYS.QUANTITIES, updatedQuantities);
      return { ...state, quantities: updatedQuantities };
    }
    
    case 'ADD_TO_WISHLIST': {
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      const updatedWishlist = [...state.wishlist, action.payload];
      saveToStorage(STORAGE_KEYS.WISHLIST, updatedWishlist);
      return { ...state, wishlist: updatedWishlist };
    }
    
    case 'REMOVE_FROM_WISHLIST': {
      const updatedWishlist = state.wishlist.filter(item => item.id !== action.payload);
      saveToStorage(STORAGE_KEYS.WISHLIST, updatedWishlist);
      return { ...state, wishlist: updatedWishlist };
    }
    
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };
    
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    
    case 'UPDATE_CUSTOMER_INFO': {
      const updatedCustomerInfo = { ...state.customerInfo, ...action.payload };
      saveToStorage(STORAGE_KEYS.CUSTOMER_INFO, updatedCustomerInfo);
      return { ...state, customerInfo: updatedCustomerInfo };
    }
    
    case 'CLEAR_CART':
      saveToStorage(STORAGE_KEYS.CART, []);
      return { ...state, cart: [], quantities: {} };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    // تحميل البيانات من localStorage عند بدء التطبيق
    return {
      ...initial,
      cart: loadFromStorage(STORAGE_KEYS.CART, initial.cart),
      wishlist: loadFromStorage(STORAGE_KEYS.WISHLIST, initial.wishlist),
      quantities: loadFromStorage(STORAGE_KEYS.QUANTITIES, initial.quantities),
      customerInfo: loadFromStorage(STORAGE_KEYS.CUSTOMER_INFO, initial.customerInfo),
    };
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}