# Guia de Deploy no Render (Petshop Orelha)

Este guia explica como colocar sua aplicação em produção no Render.

## 1. Banco de Dados (PostgreSQL)
1. No painel do Render, clique em **New +** e selecione **PostgreSQL**.
2. Dê um nome ao banco (ex: `orelha-db`) e clique em **Create Database**.
3. Após a criação, copie a **Internal Database URL**.

## 2. Aplicação (Web Service)
1. Clique em **New +** e selecione **Web Service**.
2. Conecte seu repositório GitHub.
3. Configure os detalhes do serviço:
   - **Name**: `petshop-orelha`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Clique em **Advanced** e adicione as seguintes **Environment Variables**:
   - `DATABASE_URL`: (Cole a URL do seu banco de dados)
   - `SESSION_SECRET`: (Uma string aleatória e segura, ex: `7c3aed-secret-key-123`)
   - `NODE_ENV`: `production`

## 3. Sincronização do Banco de Dados
Para criar as tabelas no banco de dados de produção, você pode rodar o comando localmente apontando para a URL externa do banco ou configurar um "Render Blueprint" (mais avançado).
A forma mais simples é rodar uma vez localmente:
```bash
DATABASE_URL=sua_url_externa_do_render npm run db:push
```

## 4. Resumo de Comandos
- **Build**: `npm run build` (Gera o frontend e prepara o servidor)
- **Start**: `npm start` (Inicia o servidor em produção)
