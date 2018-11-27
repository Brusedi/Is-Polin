import { anyEntityOptions } from "@appStore/reducers/any-entity-lazy-set.reduser";


export class AnyEntity
{
     [key: string]: any 
}  

export class AnyEntityId
{
     id:any   
     [key: string]: any 
}  


export class CompanyImages
{
    recid:number
    custaccount:string
    image : string
    imageB64 :string
    path: string
}

export const CompanyImagesOption:anyEntityOptions<CompanyImages> = {
    name: "CompanyImages" ,
    location:"/NvaAx/NVAOMACUSTLOGO", 
    selectId: (x) => x.custaccount ,
    selBack: (x:string) => ("?CUSTACCOUNT=" + x )
};

export const NvaSdEventTypeOption:anyEntityOptions<AnyEntityId> = {
    name: "NvaSdEventType", 
    location:"/NvaAx/NvaSdEventType", 
    selectId: (x) => x.id,
    selBack: (x:string) => ("?ID=" + x )
};

