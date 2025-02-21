This is a [Next.js] fullstack project bootstrapped with [`create-next-app`]. 

This application allows artists of all kinds to share their works online. 
Each artist has their own account and everything is free! The works are therefore downloadable.
This site offers translations in English and French.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Stack

NextJS, TypeScript, TailwindCSS, Supabase, react-hook-form, next-intl, zod. 

Use of SupabaseAuth for subscription, login, update(upload files) features, with "zod" as database schema validator. 
Use of next-intl for translations feature. 
Use of react-hook-form for client side subscription and login forms. 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
