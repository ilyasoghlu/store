This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# app/globals.css -dən lazısız fayyalrı sil (Tailwind saxla )

# app/layout.tsx -də metadata dəyişdir 

# Create Pages 

- about
- admin
- card
- favorites
- orders
- products 
- reviews 

# shadcn ui (ui.shadcn.com)

- Bu bir UI komponentlər dəstidir, artıq bir çox komponentləri manual olaraq yaratmağa ehtiyyac qalmır sadəcə lazım olan  komponentlər proyektə əlavə edilir və lazımi yerdə import edilir 

npmshadcn@latest init 

daha sonra style seçilməlidir 

node modullar install edildikdən sonra components qovluğunda Uİ componentlər install edilməlidir 

for ex:
npx shadcn-ui@latest add button - komanda dəyişə bilər rəsmi saytdan götürmək lazımdır 

və shacn komponentlərin maraqlı cəhəti onları yaranan faylın içərisindən custom etmək mümkündür 

və ya bir neçə komponenti eyni anda multi komponent kimi də yükləyə bilərik 

npx shadcn@latest add breadcrumb card checkbox dropdown-menu input label popover select separator table textarea toast skleton carousel (spelling diqqət et səhv spelling olduqda paket yüklənmir )



# Create Component folders and components

- ui
- card
- form
- global 
  - Container
- home 
- navbar 
  - CardButton
  - DarkMode
  - LinksDropdown
  - Logo
  - Navbar
  - NavSearch
  - SignOutLink
- products
- single-product

# Create Container component 

This component contains sizes and alignments. Here will be 2 props 
  - children   - Because component contains children components 
  - className  - for CSS classes 


# Blueprint - for Navbar component 

importing of the necessary components to Navbar and create structure  

import Container from '../global/Container'
import Logo from './Logo'
import NavSearch from './NavSearch'
import CardButton from './CardButton'
import DarkMode from './DarkMode'
import LinksDropdown from './LinksDropdown'

function Navbar() {
  return (
    <nav className='border-b'>
      <Container className='flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 '>
        <Logo />
        <NavSearch />
        <div className='flex gap-4 items-center'>
          <CardButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  )
}

then add Navbar component to the layout 

# Install React Icons 

- npm i react-icons

# Create Logo Component
# Create CardButton Component
- this is an async function, because it will work with database

# Create NavSearch Component  




# Theme 

[Theming Options] (https://ui.shadcn.com/docs/theming)
[Themes] (https://ui.shadcn.com/themes)

- replace css variables in globals.css (In my project something happens and project cant get colors)

This proses devided into two parts  

### Providers 

- create app/providers.tsx 

- this is a client side function that's why we must provide 'use client'
- providers  need a children component 
- then in the layout import provider (this provider will be in the body and all of the components will be the children components of the provider   )
- in the HTML add suppressHydrationWarning - it prevents popping up of the errors 


### Shadcn Dark Mode

[Next.js Dark Mode] (https://ui.shadcn.com/docs/dark-mode/next)

npm install next-themes

- create app/theme-provider.tsx  (this is also client side function - )
- then import ThemeProvider function into the providers.tsx (be careful because next also have ThemeProvider but we need function from the our theme-provider.tsx)

### DarkMode Component

also client side function  'use client' 

# Links 

- create utils folder (This folder is also global as like as app folder )
- create links file in utils folder  links.ts



mongodb+srv://ilyasoghlu:<db_password>@cluster0.drre1yp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


# DB creating on the MangoDB 

- instal MangoDB locally https://www.mongodb.com/try/download/community
- Alternatively can also install and run the MangoDB service (MangoDB Compass is also useful for visualize DB )
- local connection string will be  mongodb://localhost:27017/my-database-name


# Connecting Prisma& Client (done)

- npm install prisma --save-dev
- npm install @prisma/client


# Initialize Prisma for MangoDB (done)

- npx prisma init --datasource-provider mongodb

 this command will create the following two files in your project
  - .env (set your connection string here )
  - prisma/schema.prisma 

then update  .env (create for the next time at that time I have no real DB URL )

- DATABASE_URL="mongodb://localhost:27017/my-database" # or Atlas URL    (write here real project )

# Define Data Model  in prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Product {
  id    String @id @default(auto()) @map("_id")
  name  String
  price Int
}

# Push to Database 

- npx prisma db push   (This creates collections in MongoDB. No migrations are needed (MongoDB is schemaless).)


# Create Prisma Helper  - lib/prisma.ts (done)

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

# Use in API Route or Server Component - pages/api/products.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const products = await prisma.product.findMany()
  res.status(200).json(products)
}

## Optional MangoDB Atlas for Production 
If you prefer the cloud:

Go to https://cloud.mongodb.com

Create a cluster

Whitelist your IP (or 0.0.0.0 for testing)

Copy your connection string into .env

DATABASE_URL="mongodb+srv://<user>:<pass>@cluster.mongodb.net/myDB?retryWrites=true&w=majority"


# Install prisma vs-code extension on my computer


# Setup Instance 


in development, the command next dev clears Node.js cache on run. This is turn initialize a new PrismaClient instance each time due to hot reloading that creates a connection 
to the database. This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.

- create utils/db.ts 

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () =>{
    return new PrismaClient()
}


type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma 

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

# What is the ? 
- npx prisma migrate dev --name init
- npx prisma db push 

npx prisma migrate dev --name init creates a new migration fro your database schema changes and applies i, while npx prisma db push directly updates 
the database schema without creating a migration the context of databases, a migration is a set of operations that modify the database schema, helping it evolve over time while preserving existing data. 


- npx prisma studio 