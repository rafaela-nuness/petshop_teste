# Pet Shop System - Backend & Frontend

Este é um sistema completo de Pet Shop com funcionalidades de E-commerce e Agendamento de Serviços.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React, Vite, Tailwind CSS, Shadcn UI, Wouter (Roteamento).
- **Backend**: Node.js, Express.
- **Banco de Dados**: PostgreSQL com Drizzle ORM.
- **Autenticação**: Passport.js com sessão.
- **Gerenciamento de Estado**: TanStack Query (React Query).

## 📋 Funcionalidades

- **Autenticação**: Registro e login de usuários.
- **E-commerce**: Catálogo de produtos (ração, brinquedos, etc) e carrinho de compras.
- **Serviços**: Agendamento de Banho, Tosa e Consultas.
- **Painel Administrativo**: Visualização de pedidos e agendamentos (para usuários com papel 'admin').

## 🛠️ Instalação Local

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente (DATABASE_URL).
4. Sincronize o banco de dados:
   ```bash
   npm run db:push
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🗄️ Estrutura do Banco de Dados

O banco de dados é composto pelas seguintes tabelas:
- `users`: Usuários do sistema.
- `products`: Catálogo de produtos.
- `services`: Serviços oferecidos.
- `appointments`: Agendamentos realizados.
- `orders`: Pedidos de produtos.

Veja o arquivo `schema.sql` na raiz para o script completo de criação.