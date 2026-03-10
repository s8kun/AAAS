import { useEffect, useState } from "react";
import {
  PRODUCTS_DATA,
  Product,
  loadProducts,
  subscribeToProducts,
} from "@/data/products";

export const useProducts = (): Product[] => {
  const [products, setProducts] = useState<Product[]>([...PRODUCTS_DATA]);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(() => {
      setProducts([...PRODUCTS_DATA]);
    });

    if (PRODUCTS_DATA.length === 0) {
      void loadProducts();
    }

    return unsubscribe;
  }, []);

  return products;
};
