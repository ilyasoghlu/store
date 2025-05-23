"use server";

import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};
// ! This is function is for just admin user will have access t this page (My products in admin user page ) this is an extra check
const getAdminUser = async () => {
  const user = getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "an error occured",
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
  prevState: any, 
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
    prevState: any, 
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
    prevState: any, 
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


export const toggleFavoriteAction = async ()=>{
  return{ message: 'toggle favorite action' }
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