# Guia de Hospedagem no Render

Este guia detalha como hospedar este sistema no [Render](https://render.com/).

## 1. Banco de Dados (PostgreSQL)

1. Crie um "New PostgreSQL" no dashboard do Render.
2. Copie a **Internal Database URL** (para uso entre serviços no Render) ou a **External Database URL** (para acesso local).

## 2. Aplicação (Web Service)

Como este projeto é um monorepo (Frontend e Backend no mesmo processo), seguiremos estes passos:

1. Clique em **New +** > **Web Service**.
2. Conecte seu repositório GitHub.
3. Configure os detalhes do serviço:
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Vá em **Environment Variables** e adicione:
   - `DATABASE_URL`: A URL do seu banco de dados no Render.
   - `SESSION_SECRET`: Uma string longa e aleatória para as sessões.
   - `NODE_ENV`: `production`

## 3. Comandos Importantes

Para subir o banco de dados pela primeira vez após configurar a `DATABASE_URL` localmente:
```bash
npx drizzle-kit push
```

## 4. Notas sobre o Render
- O Render possui um plano gratuito para Web Services, mas ele "dorme" após 15 minutos de inatividade.
- O PostgreSQL no plano gratuito do Render expira após 90 dias.
