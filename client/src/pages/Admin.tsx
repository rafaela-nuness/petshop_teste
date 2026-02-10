import { useProducts, useDeleteProduct, useCreateProduct, useUpdateProduct } from "@/hooks/use-products";
import { useAppointments } from "@/hooks/use-services";
import { useOrders } from "@/hooks/use-orders";
import { useUser } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Plus, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema } from "@shared/schema";
import type { InsertProduct, Product } from "@shared/schema";

export default function Admin() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [, setLocation] = useLocation();

  if (isUserLoading) return null;
  
  if (!user || user.role !== 'admin') {
    setLocation('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-display font-bold">Painel Administrativo</h1>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="mb-8 p-1 bg-secondary/30 h-14 rounded-xl">
          <TabsTrigger value="products" className="rounded-lg h-12 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Produtos</TabsTrigger>
          <TabsTrigger value="appointments" className="rounded-lg h-12 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Agendamentos</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-lg h-12 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Pedidos</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsPanel />
        </TabsContent>

        <TabsContent value="appointments">
          <AppointmentsPanel />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProductsPanel() {
  const { data: products } = useProducts();
  const deleteProduct = useDeleteProduct();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      price: 0,
      imageUrl: "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=400"
    }
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        imageUrl: editingProduct.imageUrl,
      });
    } else {
      form.reset({
        name: "",
        description: "",
        price: 0,
        category: "racao",
        imageUrl: "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=400"
      });
    }
  }, [editingProduct, form]);

  const onSubmit = (data: InsertProduct) => {
    const payload = { ...data, price: Number(data.price) };
    if (editingProduct) {
      updateProduct.mutate({ id: editingProduct.id, data: payload }, {
        onSuccess: () => {
          setIsDialogOpen(false);
          setEditingProduct(null);
        }
      });
    } else {
      createProduct.mutate(payload, {
        onSuccess: () => {
          setIsDialogOpen(false);
        }
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gerenciar Produtos</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingProduct(null);
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Editar Produto" : "Adicionar Produto"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input {...form.register("name")} />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Input {...form.register("description")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preço (em centavos)</Label>
                  <Input type="number" {...form.register("price", { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select onValueChange={(val) => form.setValue("category", val)} value={form.watch("category")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="racao">Ração</SelectItem>
                      <SelectItem value="brinquedos">Brinquedos</SelectItem>
                      <SelectItem value="higiene">Higiene</SelectItem>
                      <SelectItem value="acessorios">Acessórios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
                <div className="space-y-2">
                  <Label>URL da Imagem</Label>
                  <div className="flex gap-2">
                    <Input {...form.register("imageUrl")} />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        const url = prompt("Insira a URL da nova imagem:");
                        if (url) form.setValue("imageUrl", url);
                      }}
                    >
                      Alterar
                    </Button>
                  </div>
                </div>
              <Button type="submit" className="w-full" disabled={createProduct.isPending || updateProduct.isPending}>
                {editingProduct ? "Atualizar" : "Salvar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products?.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 bg-secondary/10 rounded-xl border">
              <div className="flex items-center gap-4">
                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-primary">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price / 100)}
                </span>
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={() => {
                    setEditingProduct(product);
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="destructive" 
                  onClick={() => deleteProduct.mutate(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentsPanel() {
  const { data: appointments } = useAppointments();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments?.map((apt) => (
            <div key={apt.id} className="p-4 bg-secondary/10 rounded-xl border flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h4 className="font-bold">{apt.serviceName}</h4>
                <p className="text-sm text-muted-foreground">
                  Cliente: {apt.customerName} ({apt.contactPhone})
                </p>
                <p className="text-sm text-muted-foreground">Pet: {apt.petName}</p>
              </div>
              <div className="text-right">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold inline-block mb-1">
                  {new Date(apt.date).toLocaleString()}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                  {apt.status}
                </div>
              </div>
            </div>
          ))}
          {appointments?.length === 0 && <p className="text-muted-foreground text-center py-8">Nenhum agendamento encontrado.</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function OrdersPanel() {
  const { data: orders } = useOrders();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order.id} className="p-4 bg-secondary/10 rounded-xl border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold">Pedido #{order.id}</h4>
                  <p className="text-sm text-muted-foreground">Cliente: {order.customerName}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg text-primary">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.total / 100)}
                  </span>
                  <div className="text-xs uppercase mt-1">{order.status}</div>
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg text-sm">
                {(order.items as any[]).map((item: any, i: number) => (
                  <div key={i} className="flex justify-between py-1">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="text-muted-foreground">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.price / 100)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {orders?.length === 0 && <p className="text-muted-foreground text-center py-8">Nenhum pedido encontrado.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
