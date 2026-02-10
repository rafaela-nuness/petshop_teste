import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "racao", label: "Ração" },
  { id: "brinquedos", label: "Brinquedos" },
  { id: "higiene", label: "Higiene" },
  { id: "acessorios", label: "Acessórios" },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { data: products, isLoading } = useProducts(
    selectedCategory === "all" ? undefined : selectedCategory
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Nossos Produtos</h1>
            <p className="text-muted-foreground">Encontre o melhor para o seu pet</p>
          </div>
          
          {/* Mobile Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <h3 className="font-bold text-lg">Categorias</h3>
                {CATEGORIES.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex flex-col w-64 gap-2 flex-shrink-0">
            <h3 className="font-bold text-lg px-4 mb-2">Categorias</h3>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "ghost"}
                className={`justify-start rounded-xl ${selectedCategory === cat.id ? 'bg-primary text-white shadow-lg shadow-primary/25' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-card rounded-2xl border p-4 h-[400px]">
                    <Skeleton className="w-full h-1/2 rounded-xl mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="mt-auto flex justify-between items-center">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center py-20 bg-secondary/20 rounded-3xl">
                <h3 className="text-xl font-bold mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground">Tente mudar a categoria selecionada.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
