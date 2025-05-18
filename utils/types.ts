export type actionFunction =(
    prevState: any,
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