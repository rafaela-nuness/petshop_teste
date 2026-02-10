import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Authentication
  setupAuth(app);

  // Products Routes
  app.get(api.products.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const products = await storage.getProducts(category);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.post(api.products.create.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const input = api.products.create.input.parse(req.body);
      const product = await storage.createProduct(input);
      res.status(201).json(product);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json(err);
      }
      throw err;
    }
  });

  app.put(api.products.update.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const input = api.products.update.input.parse(req.body);
      const product = await storage.updateProduct(Number(req.params.id), input);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json(err);
      }
      throw err;
    }
  });

  app.delete(api.products.delete.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await storage.deleteProduct(Number(req.params.id));
    res.sendStatus(204);
  });

  // Services Routes
  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  // Appointments Routes
  app.post(api.appointments.create.path, async (req, res) => {
    try {
      const input = api.appointments.create.input.parse(req.body);
      const appointment = await storage.createAppointment(input);
      res.status(201).json(appointment);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json(err);
      }
      throw err;
    }
  });

  app.get(api.appointments.list.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const appointments = await storage.getAppointments();
    res.json(appointments);
  });

  // Orders Routes
  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      // Associate with user if logged in
      const orderData = { ...input, userId: req.user?.id };
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json(err);
      }
      throw err;
    }
  });

  app.get(api.orders.list.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const orders = await storage.getOrders();
    res.json(orders);
  });

  // Seed Data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const users = await storage.getUserByUsername("admin@petshop.com");
  if (!users) {
    // Create Admin
    await storage.createUser({
      username: "admin@petshop.com",
      password: "admin123", // In a real app, hash this! (Auth implementation handles hashing usually, but for this simple req we might store plain or simple hash)
      name: "Administrador",
      role: "admin"
    });

    // Create Products
    await storage.createProduct({
      name: "Ração Premium Cães Adultos 15kg",
      description: "Ração de alta qualidade para cães de todas as raças.",
      price: 24990, // R$ 249,90
      category: "Ração",
      imageUrl: "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=500&q=80"
    });
    await storage.createProduct({
      name: "Brinquedo Mordedor Resistente",
      description: "Ideal para cães que gostam de roer. Material atóxico.",
      price: 4990,
      category: "Brinquedos",
      imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80"
    });
    await storage.createProduct({
      name: "Shampoo Pet Cheirinho de Bebê",
      description: "Hipoalergênico e com pH balanceado.",
      price: 3500,
      category: "Higiene",
      imageUrl: "https://images.unsplash.com/photo-1585846416120-3a7354ed7d6d?w=500&q=80"
    });
    await storage.createProduct({
      name: "Coleira Ajustável com Pingente",
      description: "Conforto e segurança para o seu passeio.",
      price: 5990,
      category: "Acessórios",
      imageUrl: "https://images.unsplash.com/photo-1599561046251-cc796a6e932c?w=500&q=80"
    });

    // Create Services
    await storage.createService({
      name: "Banho Completo",
      description: "Lavagem, secagem, corte de unhas e limpeza de ouvidos.",
      price: 6000,
      duration: 60,
      imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&q=80"
    });
    await storage.createService({
      name: "Tosa Higiênica",
      description: "Corte dos pelos nas patas e áreas íntimas.",
      price: 4000,
      duration: 30,
      imageUrl: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?w=500&q=80"
    });
    await storage.createService({
      name: "Consulta Veterinária",
      description: "Avaliação geral da saúde do seu pet.",
      price: 15000,
      duration: 30,
      imageUrl: "https://images.unsplash.com/photo-1628009368231-760335298025?w=500&q=80"
    });
    await storage.createService({
      name: "Adestramento Comportamental",
      description: "Sessões individuais para melhorar o comportamento e obediência.",
      price: 12000,
      duration: 60,
      imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80"
    });
    await storage.createService({
      name: "Hospedagem Pet",
      description: "Ambiente seguro e confortável para o seu pet passar a noite.",
      price: 8000,
      duration: 1440,
      imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80"
    });
    await storage.createService({
      name: "Fisioterapia e Reabilitação",
      description: "Tratamentos especializados para recuperação motora.",
      price: 18000,
      duration: 45,
      imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80"
    });
  }
}
