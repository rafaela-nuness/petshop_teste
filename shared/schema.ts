import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(), // email
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"), // 'admin' | 'user'
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // stored in cents
  category: text("category").notNull(), // 'racao', 'brinquedos', 'higiene', 'acessorios'
  imageUrl: text("image_url").notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // 'Banho', 'Tosa', 'Consulta', 'Vacina'
  description: text("description").notNull(),
  price: integer("price").notNull(), // stored in cents
  duration: integer("duration").notNull(), // in minutes
  imageUrl: text("image_url").notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  contactPhone: text("contact_phone").notNull(),
  petName: text("pet_name").notNull(),
  serviceName: text("service_name").notNull(),
  date: timestamp("date").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'confirmed', 'completed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(), // For guest checkout or logged in user name
  userId: integer("user_id"), // Optional, if logged in
  total: integer("total").notNull(),
  status: text("status").notNull().default("pending"),
  items: jsonb("items").notNull(), // Store snapshot of items: { productId, name, quantity, price }[]
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  role: true,
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertAppointmentSchema = createInsertSchema(appointments).omit({ id: true, createdAt: true, status: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, status: true });

// === TYPES ===

export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type Order = typeof orders.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

// For cart items in frontend/order json
export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};
