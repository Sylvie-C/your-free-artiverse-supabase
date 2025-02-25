## À propos du projet / About this project

Ce projet est destiné à alimenter mon portfolio de développeuse web. 
Il n'est pas déployé ni finalisé suite à une information de Supabase indiquant que l'utilisation de la base de données est suspendue après une trop longue période d'inactivité. 
Aussi, vous trouverez ici uniquement l'implémentation des fonctionnalités d'authentification avec SupabaseAuth pour une inscription et connexion utilisateur.

This project is intended to feed my web developer portfolio. It has not been deployed or finalized due to information from Supabase indicating that the use of the database is suspended after a long period of inactivity.
Thus, you will only find here the implementation of authentication features with SupabaseAuth for user registration and login.

# À propos de l'application / About this application

Cette application permet aux artistes de tous horizons de partager leurs œuvres en ligne. Chaque artiste possède son propre compte et tout est gratuit ! Les œuvres sont donc téléchargeables. Ce site propose des traductions en anglais et en français. 

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
