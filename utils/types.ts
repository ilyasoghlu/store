import { Prisma } from "@prisma/client";

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include:{product:true}
}>

export type actionFunction =(
    prevState: unknown,
    formData:FormData
) => Promise<{message:string}>


export type CardItem = {
    producId:string;
    image: string;
    title:string;
    price:string;
    amount:number;
    company:string;
};

export type CardState = {
    cardItems:CardItem[];
    numberItemsInCard:number;
    cardTotal:number;
    shipping:number;
    tax:number;
    orderTotal:number;
}