

import { z, ZodSchema} from 'zod'

export const productSchema = z.object({
    name: z.string().min(2,{
        message:'name must be at least 2 characters.'
    }).max(100, {
        message: 'name must be less than 100 characters',}
    ),
    company: z.string().min(4),
    price:z.coerce.number().int().min(0,{
        message: 'price must be a psitive number'
    }),
    description: z.string().refine((description) => {
        const wordCount= description.split('').length;
        return wordCount>=10&&wordCount<=1000;
        },
        {
            message: 'description must be between 10 and 100 words'
        }),
        
    featured: z.coerce.boolean(),

})

function validateImageFile(){
    const maxUploadSize = 1024 *1024;
    const acceptedFileTypes = ['images/'];
    return z.instanceof(File).refine((file)=>{
        return !file || file.size <= maxUploadSize
    }, 'File size must be less than 1mb').refine((file)=>{
        return !file || acceptedFileTypes.some((type)=> file.type.startsWith(type))
    }, 'File must be an image')
}


// !Image Validation in the create product page
export const imageSchema = z.object({
    image:validateImageFile()
})


// !Special Error message
export function validateWithZoodSchema<T>(schema:ZodSchema<T>, data:unknown):T{
    const result = schema.safeParse(data)
    if(!result.success){
        const errors = validatedFiels.error.errors.map((error)=>error.message)
        throw new Error(errors.join(','))
    }
    return result.data
}

