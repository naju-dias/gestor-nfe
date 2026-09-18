# Gestor de Notas Fiscais com IA

Sistema fullstack que importa notas fiscais eletrônicas (XML de NFe), categoriza os
itens automaticamente usando IA, e gera relatórios financeiros — dashboard e
exportação para Excel.

🔗 **[Demo ao vivo](https://gestor-nfe.vercel.app/dashboard)**

## O problema

Empresas e profissionais recebem várias notas fiscais por mês e não têm uma forma
simples de consolidar gastos por categoria e fornecedor. A conciliação manual é
lenta e sujeita a erro.

## O que o sistema faz

- 📄 **Importação de XML de NFe** — parser extrai fornecedor, itens e valores automaticamente
- 🤖 **Categorização com IA** — cada item é classificado automaticamente (material de escritório, serviço, equipamento etc.) via LLM
- 📊 **Dashboard financeiro** — total gasto, distribuição por categoria (gráfico) e por fornecedor
- 📥 **Exportação para Excel** — relatório completo em `.xlsx`, com formatação de moeda
- ✅ **Proteção contra duplicidade** — não importa a mesma nota duas vezes

## Stack

- **Frontend/Backend**: Next.js 16 (App Router) + TypeScript
- **Banco de dados**: PostgreSQL (Neon) + Prisma ORM 7
- **IA**: Groq API (Llama / GPT-OSS)
- **Estilo**: Tailwind CSS + Recharts
- **Deploy**: Vercel

## Documentação do produto

- [`PRD.md`](./PRD.md) — problema, necessidade do usuário, escopo
- [`TESTING.md`](./TESTING.md) — casos de teste executados manualmente

## Rodando localmente

\`\`\`bash
npm install
npx prisma migrate dev
npm run dev
\`\`\`

Variáveis de ambiente necessárias (`.env`):

\`\`\`
DATABASE_URL="postgresql://..."
GROQ_API_KEY="gsk_..."
\`\`\`

## Autor

Ana Julia Dias - [Portfólio](https://najudias.vercel.app)
