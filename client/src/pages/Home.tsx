import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 to-background pt-16 pb-32 lg:pt-32 lg:pb-48">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 text-center lg:text-left animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1]">
                Cuidado premium para o seu <span className="text-primary">melhor amigo</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Produtos selecionados e serviços especializados para garantir o bem-estar e a felicidade do seu pet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/products">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                    Ver Produtos
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-2 hover:bg-secondary/50">
                    Agendar Serviço
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-xl lg:max-w-none relative animate-fade-in-up delay-200">
              <div className="relative aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-secondary p-8">
                {/* Unsplash dog image */}
                <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop"
                    alt="Happy Dog"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Cards */}
                <div className="absolute top-10 right-0 lg:-right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce duration-3000">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">100% Seguro</p>
                    <p className="text-xs text-muted-foreground">Produtos verificados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/50 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="w-8 h-8 text-primary" />,
                title: "Entrega Rápida",
                description: "Receba seus produtos em casa com rapidez e segurança."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "Qualidade Garantida",
                description: "Trabalhamos apenas com as melhores marcas do mercado."
              },
              {
                icon: <Heart className="w-8 h-8 text-primary" />,
                title: "Feito com Amor",
                description: "Profissionais apaixonados por animais cuidando do seu pet."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-secondary/20 hover:bg-secondary/40 transition-colors text-center group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de tutores felizes e dê ao seu pet o tratamento que ele merece.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14 text-lg font-bold">
              Criar Conta Grátis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 border-[20px] border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
      </section>
    </div>
  );
}
