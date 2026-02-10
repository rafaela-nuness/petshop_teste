-- Script de criação do banco de dados (PostgreSQL)

-- Tabela de Usuários
CREATE TABLE "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "name" text NOT NULL,
    "role" text DEFAULT 'user' NOT NULL,
    "created_at" timestamp DEFAULT now(),
    CONSTRAINT "users_username_unique" UNIQUE("username")
);

-- Tabela de Produtos
CREATE TABLE "products" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "price" integer NOT NULL,
    "category" text NOT NULL,
    "image_url" text NOT NULL
);

-- Tabela de Serviços
CREATE TABLE "services" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "price" integer NOT NULL,
    "duration" integer NOT NULL,
    "image_url" text NOT NULL
);

-- Tabela de Agendamentos
CREATE TABLE "appointments" (
    "id" serial PRIMARY KEY NOT NULL,
    "customer_name" text NOT NULL,
    "contact_phone" text NOT NULL,
    "pet_name" text NOT NULL,
    "service_name" text NOT NULL,
    "date" timestamp NOT NULL,
    "status" text DEFAULT 'pending' NOT NULL,
    "created_at" timestamp DEFAULT now()
);

-- Tabela de Pedidos
CREATE TABLE "orders" (
    "id" serial PRIMARY KEY NOT NULL,
    "customer_name" text NOT NULL,
    "user_id" integer REFERENCES users(id),
    "total" integer NOT NULL,
    "status" text DEFAULT 'pending' NOT NULL,
    "items" jsonb NOT NULL,
    "created_at" timestamp DEFAULT now()
);
