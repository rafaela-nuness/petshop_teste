import { useCart } from "@/hooks/use-cart";
import { useCreateOrder } from "@/hooks/use-orders";
import { useUser } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const { data: user } = useUser();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Por favor, faça login para finalizar a compra.",
      });
      setLocation("/login");
      return;
    }

    createOrder.mutate(
      {
        customerName: user.name,
        userId: user.id,
        total,
        items: items,
      },
      {
        onSuccess: () => {
          clearCart();
          setLocation("/orders"); // Or a success page
        },
      }
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price / 100);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground mb-8">
            Parece que você ainda não escolheu nenhum produto para o seu pet.
          </p>
          <Link href="/products">
            <Button size="lg" className="rounded-full px-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar às Compras
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Carrinho de Compras</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Items List */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-6 p-4 bg-card rounded-2xl border shadow-sm">
              <div className="w-24 h-24 bg-secondary/20 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-primary font-bold">
                  {formatPrice(item.price)}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => updateQuantity(item.productId, -1)}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => updateQuantity(item.productId, 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-muted-foreground hover:text-destructive"
                onClick={() => removeFromCart(item.productId)}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-card rounded-2xl border p-6 shadow-lg sticky top-24">
            <h3 className="font-bold text-xl mb-6">Resumo do Pedido</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Frete</span>
                <span className="text-green-600 font-medium">Grátis</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full h-12 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              onClick={handleCheckout}
              disabled={createOrder.isPending}
            >
              {createOrder.isPending ? "Processando..." : "Finalizar Compra"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  )
}
