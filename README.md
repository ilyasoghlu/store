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


# app/globals.css delete everything in the global css besides of the Tailwind codes   

# app/layout.tsx change metadata in layout file 

# Create Pages 

  - about/about
  - admin/admin
  - card/card
  - favorites/favorites
  - orders/orders
  - products/products 
  - reviews/reviews 

# shadcn ui (ui.shadcn.com)

- shadcn is a UI library. Install it and it helps you not create components manually. After installation you can export files from UI folder  

- npm shadcn@latest init 

then you must select style  

- after the installation of the Node Modules in the UI folder you need create components 

for ex:
npx shadcn-ui@latest add button   

- the interesting side of the shad cn components you can custom it in the file 
- also you can save some components more than one but sometimes happens some errors
- but be careful in case of spelling mistakes command is not working  

for ex:
- npx shadcn@latest add breadcrumb card checkbox dropdown-menu input label popover select separator table textarea toast skleton carousel



# Create Component folders and components

- ui

- card

- form
  - FormContainer
  - FormInput
  - ImageInputContainer
  - ImageInput
  - PriceInput
  - TextArea
  - CheckboxInput
  - Button (for the next time please call this component as Buttons - because here will be some subfunctions as like mini buttons )

- global 
  - Container
  - EmptyList
  - SectionTitle
  - LoadingContainer
  - LoadingTable

- home 
  - FeaturedProducts
  - Hero
  - HeroCarousel

- navbar 
  - CardButton
  - DarkMode
  - LinksDropdown
  - Logo
  - Navbar
  - NavSearch
  - SignOutLink

- products
  - FavoriteToggleButton
  - FavoriteToggleForm
  - ProductsContainer
  - ProductsGrid
  - ProductsList

- single-product
  - AddToCard
  - BreadCrumbs
  - ProductRating

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


# Theme 

  [Theming Options] (https://ui.shadcn.com/docs/theming)
  [Themes] (https://ui.shadcn.com/themes)

  - replace css variables in globals.css (In my project something happens and project cant get colors)

  This proses divided into two parts  

    ### Providers 

      - create app/providers.tsx 

      - this is a client side function that's why we must provide 'use client'
      - providers  need a children component 
      - then in the layout import provider (this provider will be in the body and all of the components will be the children components of the provider   )
      - in the HTML add suppressHydrationWarning - it prevents popping up of the errors 


    ### Shad cn Dark Mode

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
  id    String @id @default(auto()) @map("_id") @db.ObjectId (Without objectId it gives a big fat error )
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

# this command opens Prisma Studio 
- npx prisma studio 

# This command pushes the Data base (you need push this command after Studio)
- npx prisma db push 


# MangoDB to Prisma tutorial 
https://www.youtube.com/watch?v=7t_cL2BQ5Ok&t=156s&ab_channel=MongoDB


# Prisma CRUD 
https://www.prisma.io/docs/consepts/components/prisma-client/crud


# Product Model 02.05.2025

`` prisma 

model Product {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  price Int
  company String
  description String 
  featured Boolean 
  image String
  createdAt DateTime @default(now())
  updatedAt dateTime @updatedAt
  clerkId string
}

# Create a json file in prisma folder products.json (this is for seeding of the database)

    [
        {
            "name": "Babara",
            "company": "Wikido",
            "description": "A great product",
            "featured": true,
            "image": "https://www.pexels.com/photo/woman-with-butterflies-clips-in-hair-18821587/",
            "price": 3.79,
            "createdAt": "2024-04-11T00:00:00Z",
            "updatedAt": "2024-11-08T00:00:00Z",
            "clerkId": "Mathan"
        },
        {
            "name": "Arido",
            "company": "MWCO",
            "description": "A great product",
            "featured": true,
            "image": "https://www.pexels.com/photo/woman-pouring-green-sauce-into-a-bowl-13726800/",
            "price": 3.79,
            "createdAt": "2024-04-11T00:00:00Z",
            "updatedAt": "2024-11-08T00:00:00Z",
            "clerkId": "Mathan"
        },
        ... Here you can add more products ...
    ]


# Create Seed File 

- create in prisma/seed.js

- check prisma studio (node prisma/seed)

- if you try use decimal values for eg: 3.5 don't use Int instead of it use Float 
- in schema.prisma if you will have an error about project name please add project name in .env file into the URL (marked with ***)
(DATABASE_URL="mongodb+srv://ilyasoghlu:yg6uIV90GZgHnjyw@cluster0.drre1yp.mongodb.net/*******?retryWrites=true&w=majority&appName=Cluster0")


# Create utils/actions.ts file 

- this functional file contains of the functions for fetching the products (maybe will be other functions in the future) 

    import db from '@/utils/db';


    export const fetchFeaturedProducts = async() =>{
        const products = await db.product.findMany({
            where:{
                featured:true,
            },
        })
        return products
    }

    export const fetchAllProducts = () => {
        return db.product.findMany({
            orderBy:{
                createdAt:'desc',
            },
        })
    }

# Create utils/format.ts

- this functional file contains of the currency format function 

      export const FormatCurrency = (amount: number | null) =>{
          const value = amount || 0;
          return new Intl.NumberFormat('en-US', {
              style:'currency',
              currency:'USD'
          }).format(value)
        } 


# Create content of the Hero content 

- use shadcn ui for creating HeroCarousel
   - Carousel, 
   - CarouselContent, 
   - CarouselItem,
   - CarouselNext,
   - CarouselPrevious 
- create HeroCarousel content 
  -  add images (local @/public/images/*.jpg)


# Create About page content 

- this page's content is static 

# Create Loading 

There two methods for creating the loader 

1. Creating of the loading.tsx page in the app and in case of changing over the pages it will show 'Loading...'

  - it will be situated in the app (as like as layout or home page) 
  - this is a client side page

        'use client'

      function loading() {
          return (
              <div>loading...</div>
          )
      }

export default loading

2. Importing of the Suspense from react 

  - import the Suspense into the home page 

      - the following variant is so simple 

        import { Suspense } from 'react'

          function Home() {
            return (
              <>
                <Hero />
                <Suspense fallback={<div>loading...</div>}>
                  <FeaturedProducts />
                </Suspense>
              </>
            )
          }

          export default Home

    - Let's import LoadingContainer from components  

        import { Suspense } from 'react'

          function Home() {
            return (
              <>
                <Hero />
                <Suspense fallback={<LoadingContainer />}>
                  <FeaturedProducts />
                </Suspense>
              </>
            )
          }

    - then add some magic here )))))

        import React from 'react'
          import { Card, CardContent } from '../ui/card'
          import { Skeleton } from '../ui/skeleton'

          function LoadingContainer() {
            return (
              <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <LoadingProduct />
                <LoadingProduct />
                <LoadingProduct />
              </div>
            )
          }

          function LoadingProduct(){
            return (
              <Card>
                <CardContent className='p-4'>
                  <Skeleton className='h-48 w-full' />
                  <Skeleton className='h-46 w-3/4  mt-4' />
                  <Skeleton className='h-46 w-1/2  mt-4' />
                </CardContent>
              </Card>
            )
          }
          export default LoadingContainer


# Products  page (ProductsContainerPage)

    ## Create loading.tsx file in the products folder 
      - this is a user side function  

    ## Create search parameters in the Product page 
  

      import ProductsContainer from '@/components/products/ProductsContainer'
      import React from 'react'

        function Products({searchParams}:{searchParams: {layout?:string, search?:string}}) {
          const layout = searchParams.layout || 'grid'
          const search = searchParams.search || ''
          return (
            <ProductsContainer layout={layout} search={search} />
          )
        }

      export default Products

    ## Create content of the ProductContainer Component 
      
      - Create ProductList component 
    
    ## Then create functionality in the action.ts file for search 

# NavSearch 

    This component will be a user side component 
    'use client'

    - install use-debounce
      npm i use-debounce 
      
      ## Wrap NavSearch in Suspense 

# Create a fetchSingleProduct function in the actions.ts

  - import { redirect } from 'next/navigation';


# Create Product Details Page 

 - it will be a dynamic page (in products folder create a new folder [id])


 # Authentication (Here I use Clerk )
  
  - https://clerk.com/
  - create an account in this site, you can create 
    - over github
    - over gmail  (I created over gmail)
    - over any email 
  
  Then 
      - create a new application 
        - this is in the clerk 

      - install following on your project 
        - npm install @clerk/next.js

      - set your environmental variables (.env file ) first of all create this file in your project (P.S Maybe for the reason of the version it can be .env local file )
        - copy/paste necessary codes from clerk application 
      
      - update middleware.ts (create it in your project it must be in the src folder (in global))
        - middleware file is for define pages are public or not
          - here you must create public pages function 

          

      - add ClerkProvider to your app 
        - import ClerkProvider into the layout file (import {ClerKProvider} from '@clerk/nextjs')
        - then wrap everything in the ClerkProvider (as parent component )
        - copy/paste necessary codes from clerk application
      
      - create your first user then run the project (npm run dev )

# Here is some middleware tutorial options 

To ensure that the middleware works reliably across various routes and authentication conditions, here's an outline of considerations you might want to handle:

1. Handling Authenticated and Non-Authenticated Users
Make sure to define what should happen when a user is authenticated vs. when they are not. This includes routing users to the appropriate pages (like a login page or dashboard).

2. Handling Public Routes
Public routes (/, /about, /products) should be accessible without authentication, while all other routes require authentication.

3. Redirecting or Displaying a Custom Message
You may want to display a custom message or redirect the user based on their authentication status. You could customize the redirection flow or even show a different UI based on whether the user is authenticated.

4. Handling Edge Cases (e.g., API routes)
Ensure that your API routes (like /api/*) are always protected or allowed based on your needs.

Here's how you could adjust and expand the code to account for different cases:

Improved Middleware Example:
ts
Copy
Edit
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(['/', '/products(.*)', '/about']);

export default clerkMiddleware(async (auth, req) => {
    const authObject = await auth();  // Await the auth() Promise

    // If the route is not public, ensure the user is authenticated
    if (!isPublicRoute(req)) {
        // If the user is not authenticated
        if (!authObject.isAuthenticated) {
            // Redirect unauthenticated users to the login page
            return authObject.redirectToSignIn();
        }
    }

    // Optionally, handle further logic for authenticated users
    // For example, if you're handling redirection for authenticated users
    if (authObject.isAuthenticated && req.url === '/login') {
        // If the user is authenticated and tries to access the login page, redirect them
        return authObject.redirectTo('/dashboard');
    }

    // Add any other conditional logic you need for specific routes
    // For example, you can add extra protections for sensitive routes, etc.
});

export const config = {
    matcher: [
        // Skip Next.js internals and static assets
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
Key Features:
General Authentication Flow:

If the user is not authenticated and is trying to access a protected route, they'll be redirected to the sign-in page with redirectToSignIn().

Redirection for Authenticated Users:

If an authenticated user tries to access a route like /login, you can redirect them to a dashboard or home page using redirectTo('/dashboard').

Edge Case Handling:

You could handle other routes (like /admin or /profile) by adding extra conditions based on your app's specific requirements.

Example Scenario:
Unauthenticated User:

If a user tries to access a route like /dashboard or /profile without being logged in, they will be redirected to the login page (redirectToSignIn()).

Authenticated User:

If a user is already authenticated and tries to access the login page (/login), they will be redirected to a dashboard or home page.

Public Routes:

Public routes like /, /about, and /products remain accessible to all users without requiring authentication.

Further Customization:
Custom Error Pages: You could redirect users to a custom error page if they try to access a restricted resource.

Role-Based Access: You could further customize this middleware to check for user roles (e.g., admin, user) and only allow access to certain routes based on the user's role.


# Complete the SignOutLink Component
# Complete The UseIcon Component
# Complete The LinksDropDown Component

# Create new links in the links.ts

  - {href:'/admin/sales', label:'dashboard'},
  - create adminLinks for dashboard menu (it is optional you can create it for every user, here only admin can add, delete or edit )


# Admin Pages Structure 

  - remove existing page.tsx from  the admin folder 

Then create following structure for the admin folder 

  - admin
    - products (folder)
      - [id] (This is a dynamic )
        - edit/page.tsx 
      - create
        - page.tsx
      - page.tsx
    - sales (folder)
      - page.tsx
    - layout.tsx
    - Sidebar.tsx

# Create Sidebar 

        function Sidebar() {
          const pathname = usePathname();
          return (
              <aside>
              {adminLinks.map((link) => {
                  const isActivePage = pathname === link.href;
                  const variant = isActivePage ? "secondary" : "ghost";
                  return (
                  <Button
                      asChild
                      className="w-full mb-2 capitalize font-normal"
                      variant={variant}
                  >
                      <Link
                      key={link.href}
                      href={link.href}
                      >
                        {link.label}    
                      </Link>
                  </Button>
                  );
              })}
              </aside>
          );
      }

# Restrict Access to Admin Page
  <!-- - Dashboard menu hidden in Dropdown menu -The reason Clerk has limit  -->

# Setup the Create Product Page - in admin page 

  - create action for getting information from FormData 

        const createProductAction = async (formData: FormData) =>{
            'use server'
            const name = formData.get('name') as string
            console.log((name))
        }

  ## Faker Library 
      (https://fakerjs.dev/guide/)

  - instal faker library for showing fake products in input testing app 
    - npm install @faker-js/faker
  

# Create types file in the utils (utils/types.ts)
  - here create function for Form components - because we can reuse components over and over thats why we need dynamic componets and just change types of them  

# FormContainer Component 
 - in this component will be used two logic
  1. inputs - here will be information which stored in the children as well as Submit button and so 
  2. action - this is the functional part of this logic for update/delete/edit of the product 

# Create Product Action and Helper functions 
- I will be in the actions file (here already we have this function but we add some functionality)

  This is the simpe variant, without any functionality 

    export const createProductAction = async(
    prevState:any, 
    formData: FormData
    ):Promise<{message:string}> =>{
    return {message: 'product created'}
  }

  Then 

  const getAuthUser = async () =>{
    const user = await currentUser()
    if (!user) redirect ('/')
        return user
}
const renderError  = (error: unknown) : {message:string} =>{
    return {
        message: error instanceof Error ? error.message : 'an error occured', 
    }
}

  export const createProductAction = async(
    prevState:any, 
    formData: FormData
    ):Promise<{message:string}> =>{
        const user =await getAuthUser()
        try {
            const name = formData.get('name') as string;
            const company = formData.get('comapny') as string;
            const price = Number(formData.get('name') as string);
            // !Temporary
            const image = formData.get('image') as File;
            const description  = formData.get('description') as string;
            const featured = Boolean(formData.get('featured') as string);

            await db.product.create({
                data:{
                    name,
                    company,
                    price,
                    image:'/images/product-1.jpg',
                    description,
                    featured,
                    clerkId:user.id,
                }
            })

            return {message: 'product created'}
        } catch (error) {
            return renderError(error)
        }
}

But you must accept that mostly we use a function nt one time and function must be optimized that's why I will use Zod library for this function 

# Zod library and product scheme 

 - npm install zod 
  - https://zod.dev/?id=basic-usage
- setup utils/schema.ts


# MangoDB Atlas image upload 

  ✅ 1. Create a MongoDB Atlas Project
      Go to MongoDB Atlas.

      Sign in or sign up.

      Create a new project (e.g., ImageUploader).

      Set up a free shared cluster.

  ✅ 2. Create a Database
      In your cluster, go to "Browse Collections".

      Click "Create Database".

      Name it (e.g., fileStorage).

      Create an initial collection (e.g., dummy, you’ll use GridFS soon).

  ✅ 3. Enable App Services
      Go to the “App Services” tab in your Atlas project.

      Create a new App Service.

      Choose the fileStorage database and cluster.

      Enable Authentication (Anonymous or Email/Password for now).

  ✅ 4. Use GridFS
      GridFS is a special MongoDB feature that splits large files into chunks.

      In Atlas, you can interact with GridFS collections:

      Two collections are created:

      fs.files

      fs.chunks

      But you’ll need to upload files using one of the following:

  ✅ 5. Upload with Code (No Backend)
      Use Next.js + MongoDB Node Driver or MongoDB Realm Functions:

      Option A: Use MongoDB from Next.js (API Route)
      Install dependencies:


# Setup admin products page app/admin/products/page.tsx 
  
  - It will be async function
  - Here will use table components from shadcn 
        import {
              Table,
              TableBody,
              TableCaption,
              TableCell,
              TableHead,
              TableRow,
        } from '@/components/ui/table' 

  - import such functions and components 
    
      import EmptyList from '@/components/global/EmptyList'
      import { fetchAdminProducts } from '@/utils/actions'
      import Link from 'next/link'

# Setup a function type in the Button component  @/components/form/Button (for the next time )

# Setup Edit Product Page in admin 

# Setup UpdateImageContainer Component 
  - it will be a user side component (use client)


# Favorite Model ()
  prisma 

      model Product{
        favorites Favorite[]
      }


I have changed this model for my case, but my variant also  has some mistakes 

      model Favorite {
        id String @id default(uuid())
        clerkId String
        product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
        productId String
        createAt DataTime @default(now())
        updateAt DataTime @updateAt
      }

      then 

      npx prisma db push (it gives error in my case )


  # Create button models in Button component @/components/form/Button.tsx
  
    - CardSignInButton 

          export const CardSignInButton = () =>{
              return (
              <SignInButton mode="modal">
                <Button 
                  type='button' 
                  size='icon' 
                  variant='outline' 
                  className="p-2 cursor-pointer" 
                  asChild
                >
                  <FaRegHeart />
                </Button>
              </SignInButton>)
          }

    - CardSubmitButton 

        export const CardSubmitButton = ({isFavorite}: {isFavorite:boolean} ) => {
            const {pending} = useFormStatus()
            return(
              <Button 
                type="submit" 
                size='icon' 
                variant='outline' 
                className="p-2 cursor-pointer"
              >
                { pending?(
                  <ReLoadIcon className='animate-spin' />
                  ) : (
                    isFavorite?<FaHeart/> :<FaRegHeart/>
                  )}
              </Button>
            )
          }


  # Create functions in action file 

      export const toggleFavoriteAction = async ()=>{
              return{ message: 'toggle favorite action' }
            }