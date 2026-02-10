import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertAppointment } from "@shared/schema";

export function useServices() {
  return useQuery({
    queryKey: [api.services.list.path],
    queryFn: async () => {
      const res = await fetch(api.services.list.path);
      if (!res.ok) throw new Error("Failed to fetch services");
      return api.services.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateAppointment() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertAppointment) => {
      // Zod coercion happens in schema/backend, but dates need to be strings for JSON
      const payload = {
        ...data,
        date: new Date(data.date).toISOString() // Ensure date is serialized
      };
      
      const res = await fetch(api.appointments.create.path, {
        method: api.appointments.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error("Failed to book appointment");
      return api.appointments.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({ 
        title: "Agendado!", 
        description: "Seu agendamento foi realizado com sucesso." 
      });
    },
    onError: () => {
      toast({ 
        title: "Erro", 
        description: "Não foi possível realizar o agendamento.", 
        variant: "destructive" 
      });
    }
  });
}

export function useAppointments() {
  return useQuery({
    queryKey: [api.appointments.list.path],
    queryFn: async () => {
      const res = await fetch(api.appointments.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch appointments");
      return api.appointments.list.responses[200].parse(await res.json());
    },
  });
}
