import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem Enviada!",
      description: "Entraremos em contato em breve.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-center mb-16">Fale Conosco</h1>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Info Card */}
        <div className="bg-primary text-white rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div>
              <h3 className="text-2xl font-display font-bold mb-6">Informações de Contato</h3>
              <p className="text-white/80">Estamos aqui para ajudar você e seu pet. Entre em contato por qualquer canal.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Endereço</h4>
                  <p className="text-white/80">Rua dos Pets, 123<br/>Jardim dos Animais, SP</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Telefone</h4>
                  <p className="text-white/80">(11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-white/80">contato@petlove.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Horário de Funcionamento</h4>
                  <p className="text-white/80">Seg - Sex: 8h às 19h<br/>Sáb: 9h às 14h</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-[-10%] left-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>

        {/* Form */}
        <div className="bg-card p-8 lg:p-12 rounded-3xl border shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" placeholder="Seu nome" className="rounded-xl h-12" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" className="rounded-xl h-12" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea id="message" placeholder="Como podemos ajudar?" className="rounded-xl min-h-[150px]" required />
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-lg">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
