// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'


// const isPublicRoute = createRouteMatcher(['/', '/products(.*)', '/about'])
// const isAdminRoute = createRouteMatcher(['/admin(.*)'])

// export default clerkMiddleware((auth, req) =>{
//     const isAdminUser = auth().userId === process.env.ADMIN_USER_ID

//     if(isAdminRoute(req) && !isAdminRoute){
//         return NextResponse.redirect(new URL('/', req.url))
//     }
//     if(!isPublicRoute(req)) auth().redirectToSignIn()
// })




// export const config = {
//     matcher: [
//         // Skip Next.js internals and all static files, unless found in search params
//         '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//         // Always run for API routes
//         '/(api|trpc)(.*)',
//     ],
// }

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();
  const isAdminUser = authObject.userId === process.env.ADMIN_USER_ID;

  if (isAdminRoute(req) && !isAdminUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isPublicRoute(req) && !authObject.userId) {
    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};
