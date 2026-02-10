import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Services from "@/pages/Services";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/services" component={Services} />
      <Route path="/cart" component={Cart} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Login} /> {/* Reuse login page with register tab active */}
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground font-sans">
          <Header />
          <main>
            <Router />
          </main>
          <Toaster />
          <footer className="bg-secondary/20 py-12 mt-24 border-t">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; 2024 PetLove. Feito com amor para o seu pet.</p>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
