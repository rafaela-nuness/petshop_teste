import type { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price / 100);
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 text-3xl">
        {/* Placeholder for icon/image */}
        <img 
          src={service.imageUrl} 
          alt={service.name} 
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      
      <h3 className="text-xl font-bold font-display mb-2">{service.name}</h3>
      <p className="text-muted-foreground mb-4 h-12 line-clamp-2">{service.description}</p>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 bg-secondary/50 py-2 px-3 rounded-lg w-fit">
        <Clock className="w-4 h-4" />
        <span>{service.duration} minutos</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary font-display">
          {formatPrice(service.price)}
        </span>
        <Button onClick={() => onBook(service)} className="rounded-full">
          Agendar Agora
        </Button>
      </div>
    </div>
  );
}
