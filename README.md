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


