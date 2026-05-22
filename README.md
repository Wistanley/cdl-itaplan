# Itaplan — Plataforma de Relacionamento Shopping

Protótipo interativo da plataforma **Itaplan** para shoppings: campanhas promocionais, comunicados oficiais da administração, documentos sensíveis, inteligência de dados (perfil demográfico, share of wallet, share of visits) e portal do lojista.

> ⚠️ Este projeto é um **protótipo de apresentação**. Todos os dados são mockados em memória — **sem banco de dados, sem backend, sem APIs externas**. Conformidade LGPD por design: nada sensível é persistido.

## Stack

- **React 19** + **TypeScript**
- **Vite 6** (bundler)
- **Tailwind CSS v4** (estilo)
- **Tabler Icons** + **Google Fonts (Nunito / Nunito Sans)**

## Rodar localmente

Pré-requisitos: **Node.js 18+**

```bash
npm install
npm run dev
```

A aplicação abre em `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm run preview   # serve o /dist localmente para validar
```

## Deploy na Vercel (via GitHub)

1. Faça push do repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detecta automaticamente o Vite (Framework Preset: **Vite**).
4. Não há variáveis de ambiente necessárias.
5. Clique em **Deploy**.

Comandos padrão (já corretos por detecção):

| Campo | Valor |
|---|---|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

## Estrutura

```
.
├── index.html            # Entry HTML
├── src/
│   ├── App.tsx           # Aplicação completa (3 portais: Admin, Lojista, Cliente)
│   ├── main.tsx          # Bootstrap React
│   ├── types.ts          # Tipagens compartilhadas
│   └── index.css         # Tailwind v4 theme + tokens Itaplan
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Portais

- **Landing** — apresentação institucional e escolha de portal.
- **Admin Shopping** — dashboard, gestão de campanhas, lojas, comunicados, documentos, inteligência de dados (LGPD).
- **Lojista** — registrar vendas, ver campanhas ativas, receber comunicados, baixar documentos, insights da loja.
- **Cliente** — consulta por CPF dos números da sorte por campanha.
