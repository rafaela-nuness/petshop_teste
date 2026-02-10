import { useState } from "react";
import { useServices, useCreateAppointment } from "@/hooks/use-services";
import { ServiceCard } from "@/components/ServiceCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema } from "@shared/schema";
import { z } from "zod";
import type { Service } from "@shared/schema";

// Form schema with date as string for input
const bookingSchema = insertAppointmentSchema.extend({
  date: z.string().min(1, "Data é obrigatória"),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function Services() {
  const { data: services, isLoading } = useServices();
  const createAppointment = useCreateAppointment();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingForm) => {
    if (!selectedService) return;
    
    createAppointment.mutate({
      ...data,
      serviceName: selectedService.name,
      // Date string from input to ISO Date string handled by mutation
    }, {
      onSuccess: () => {
        setSelectedService(null);
        form.reset();
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">Serviços Especializados</h1>
        <p className="text-lg text-muted-foreground">
          Profissionais qualificados para cuidar do seu pet com todo carinho e dedicação que ele merece.
        </p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-secondary/20 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services?.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onBook={(s) => {
                setSelectedService(s);
                form.setValue("serviceName", s.name);
              }}
            />
          ))}
        </div>
      )}

      {/* Booking Dialog */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Agendar {selectedService?.name}</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para solicitar o agendamento.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Seu Nome</Label>
              <Input id="customerName" {...form.register("customerName")} placeholder="Maria Silva" />
              {form.formState.errors.customerName && (
                <span className="text-xs text-destructive">{form.formState.errors.customerName.message}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="petName">Nome do Pet</Label>
                <Input id="petName" {...form.register("petName")} placeholder="Rex" />
                {form.formState.errors.petName && (
                  <span className="text-xs text-destructive">{form.formState.errors.petName.message}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Telefone</Label>
                <Input id="contactPhone" {...form.register("contactPhone")} placeholder="(11) 99999-9999" />
                {form.formState.errors.contactPhone && (
                  <span className="text-xs text-destructive">{form.formState.errors.contactPhone.message}</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Data e Hora Preferencial</Label>
              <Input 
                id="date" 
                type="datetime-local" 
                {...form.register("date")} 
              />
              {form.formState.errors.date && (
                <span className="text-xs text-destructive">{form.formState.errors.date.message}</span>
              )}
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full h-12 text-lg rounded-xl" disabled={createAppointment.isPending}>
                {createAppointment.isPending ? "Enviando..." : "Confirmar Agendamento"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
