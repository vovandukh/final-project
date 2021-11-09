export interface IProductRequest{
    name:string;
    category:any;
    subCategory:any;
    description:string;
    price:string;
    imagePath:string;
    imagePath1?:string;
    imagePath2?:string;
    imagePath3?:string;
    imagePath4?:string;
    count:number;
}
export interface IProductResponce{
    id:string;
    name:string;
    category:any;
    description:string;
    price:string;
    imagePath:string;
    imagePath1?:string;
    imagePath2?:string;
    imagePath3?:string;
    imagePath4?:string;
    count:number;
}