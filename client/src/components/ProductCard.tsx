import type { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price / 100);
  };

  return (
    <div className="group bg-card rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">
      <div className="aspect-[4/3] overflow-hidden relative bg-secondary/20">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-foreground hover:bg-white/90 backdrop-blur shadow-sm">
          {product.category}
        </Badge>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display font-bold text-lg leading-tight text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <span className="text-xl font-bold text-primary font-display">
            {formatPrice(product.price)}
          </span>
          <Button 
            onClick={() => addToCart(product)}
            size="sm"
            className="rounded-full px-4 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
