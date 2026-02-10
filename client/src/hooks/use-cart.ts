import { useState, useEffect } from "react";
import type { CartItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: any) => {
    setItems((current) => {
      // Use productId consistently. Newly created products from API will have 'id'.
      const productId = typeof product.id === 'number' ? product.id : product.productId;
      if (!productId) {
        console.error("Invalid product added to cart", product);
        return current;
      }

      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...current,
        {
          productId: productId,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        },
      ];
    });
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} foi adicionado.`,
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setItems((current) =>
      current.map((item) => {
        if (item.productId === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return { items, addToCart, removeFromCart, updateQuantity, clearCart, total, count };
}
