'use server'

import db from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { imageSchema, productSchema, validateWithZoodSchema } from './schemas';


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

export const fetchFeaturedProducts = async() =>{
    const products = await db.product.findMany({
        where:{
            featured:true,
        },
    })
    return products
}

export const fetchAllProducts = ({search = ''}:{search:string}) => {
    return db.product.findMany({
        where:{
            OR:[
                {name:{contains:search, mode:'insensitive'}},
                {company:{contains:search, mode:'insensitive'}}
            ]
        },
        orderBy:{
            createdAt:'desc',
        },
    })
}

export const fetchSingleProduct = async(productId:string) =>{
    const product = await db.product.findUnique({
        where:{
            id: productId
        }
    })
    if(!product) redirect('products')
    return product
}

export const createProductAction = async(
    prevState:any, 
    formData: FormData
    ):Promise<{message:string}> =>{
        const user =await getAuthUser()
        try {
            const rawData = Object.fromEntries(formData)
            const file = formData.get('image') as File
            const validatedFiels = validateWithZoodSchema(productSchema, rawData)
            const validateFile = validateWithZoodSchema(imageSchema, {image:file})

            await db.product.create({
                data:{
                    ...validatedFiels, image:'/images/product-3.jpg', clerkId:user.id,
                }
            })
            return {message: 'product created'}
        } catch (error) {
            return renderError(error)
        }
}