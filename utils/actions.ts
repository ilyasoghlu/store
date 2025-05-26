"use server";

import db from "@/utils/db";
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { 
      imageSchema, 
      productSchema, 
      reviewSchema, 
      validateWithZodSchema 
    } from "./schemas";
import { revalidatePath } from "next/cache";
// import {deleteImage, uploadImage } from './mango' (I must setup this functionality ) 

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};
// ! This is function is for just admin user will have access to this page (My products in admin user page ) this is an extra check
const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [{ name: { contains: search, mode: "insensitive" } }, { company: { contains: search, mode: "insensitive" } }],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("products");
  return product;
};

export const createProductAction = async (
  prevState: unknown, 
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const file = formData.get("image") as File;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    console.log(validatedFile);
    await db.product.create({
      data: {
        ...validatedFields,
        image: "/images/product-3.jpg",
        clerkId: user.id,
      },
    });

    return { message: "product created" };
  } catch (error) {
    return renderError(error);
  }
};

// todo Here will be function for connecting  MangoDb to Project 621 lesson -just at that time I can not create this connection because I use Mango but tutor uses Supabase

export const fetchAdminProducts = async () => {
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

// ! this function will  add in the Button component

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAdminUser();
  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });
    revalidatePath("/admin/products");
    return {
      message: "product removed",
    };
  } catch (error) {
    return renderError(error);
  }
};

// ! This functions provide Edit Product Page

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
    prevState: unknown, 
    formData: FormData) => {
      await getAdminUser()
      try {
        const productId = formData.get('id') as string
        const rawData =Object.fromEntries(formData)
        const validatedFields = validateWithZodSchema(productSchema, rawData)
        await db.product.update({
          where:{
            id:productId
          },
          data:{
            ...validatedFields,
          }
        });
        revalidatePath(`/admin/products/${productId}/edit`)
        return { message: "Product updated successfully" };
      } catch (error) {
        return renderError(error)
      }
};

export const updateProductImageAction = async (
    prevState: unknown, 
    formData: FormData
  ) => {
    await getAuthUser()
    try {
      const image = formData.get('image') as File
      const productId = formData.get('id') as string
      const oldImageUrl = formData.get('url') as string

      const validatedFile =validateWithZodSchema(imageSchema, {image})
      // !the  following lines come from Mango and I did not create yet, that's why error is normal  
      const fullPath  = await uploadImage(validatedFile.image)
      await deleteImage(oldImageUrl)
      await db.product.update({
        where:{
          id:productId,
        },
        data:{
          image: fullPath,
        },
      });
        revalidatePath(`/admin/products/${productId}/edit`)
        return { message: "Product Image updated successfully" };
    } catch (error) {
      return renderError(error)
    }

};


export const toggleFavoriteAction = async (prevState: {
  productId:string;
  favoriteId:string |null;
  pathname:string;
})=>{
  const user = await getAuthUser()
  const {productId, favoriteId, pathname} = prevState;

  try {
    if(favoriteId){
      await db.favorite.delete({
        where: {
          id:favoriteId
        },
      });
    }else{
      await db.favorite.create({
        data:{
          productId,
          clerkId:user.id,
        }
      })
    }
    revalidatePath(pathname)
    return{ message: favoriteId?'removed from faves':'added to faves' }
  } catch (error) {
    return renderError(error)
  }

}


export const fetchFavoriteId = async({productId}:{productId:string}) =>{
  const user = await getAuthUser()
  const favorite = await db.favorite.findFirst({
    where:{
      productId,
      clerkId:user.id,
    },
    select:{
      id:true,
    },
  })
  return favorite?.id || null;
}

export const fetchUserFavorites = async() =>{
  const user = await getAuthUser()
  const favorites = await  db.favorite.findMany({
    where:{
      clerkId:user.id,
    },
    include:{
      product:true,
    }
  })
  return favorites;
}


// ! Review functionality 

export const createReviewAction = async (
  prevState: unknown,
  formData:FormData
) =>{
  const user = await getAuthUser()
  try {
      const rawData = Object.fromEntries(formData)
      const validatedFields = validateWithZodSchema(reviewSchema, rawData)
      await db.review.create({
        data: {
          ...validatedFields,
          clerkId: user.id
        },
      })
      revalidatePath(`/product/${validatedFields.productId}`)
    return {message: 'review submitted successfully'}
  } catch (error) {
    return renderError(error)
  }
}

export const fetchProductReviews = async (productId : string) =>{
  const reviews = await db.review.findMany({
    where:{
      productId,
    },
    orderBy: {
      createdAt:'desc',
    }
  })
  return reviews
}

export const fetchProductRating = async (productId:string) =>{
  const result = await db.review.groupBy({
    by:['productId'],
    _avg:{
      rating:true,
    },
    _count:{
      rating:true,
    },
    where: {productId},
  });
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count:result[0]?._count?.rating ?? 0,
  }
}



export const fetchProductReviewsByUser = async () =>{
  const user = await getAuthUser()
  const reviews = await db.review.findMany({
    where:{
      clerkId:user.id
    },
    select:{
      id:true,
      comment: true,
      product: {
        select:{
          image:true,
          name:true,
        },
      },
    },
  });
  return reviews
}

// ! delete reviews from page 

export const deleteReviewAction = async (prevState: {reviewId:string} ) =>{
  const {reviewId} = prevState
  const user = await getAuthUser()
  try {
    await db.review.delete({
      where:{
        id: reviewId,
        clerkId: user.id,

      },

    })
    revalidatePath('/reviews')
    return {message: 'review deleted successfully'}
  } catch (error) {
    return renderError(error)
  }
}
export const findExistingReview = async (userId:string, productId:string) =>{
  return db.review.findFirst({
    where: {
      clerkId:userId,
      productId,
    },
  })
}

// ! Card menu functionality 

// ! use fetchCardItems function in the CardButton file instead of the temp data navbar/CardButton.tsx
export const fetchCardItems = async () =>{
  const {userId} = await auth()
  const card = await db.card.findFirst({
    where:{
      clerkId:userId?? '',
    },
    select:{
      numItemsInCard:true
    }
  })
  return card?.numItemsInCard || 0
}

const fetchProduct = async () =>{}

export const fetchOrCreateCard = async () =>{}
 
const updateOrCreateCardItem = async () =>{}

export const updateCard = async () =>{}

// ! this function will call from /single-product/AddToCard.tsx file 
export const addToCardAction = async (prevState:any, formData:FormData) =>{
  return {message:'product added to card '}
}

export const removeCardUtemAction = async () =>{}

export const updateCardItemAction = async () =>{}