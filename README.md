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

also client side function  'use client' 578 6-06

