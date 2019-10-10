export interface User{
    nick?: string;
    subnick?: string;
    age?: number;//con el simbolo ? le decimos que este atributo es opcional
    email: string;
    friend: boolean;
    status?:string;
    avatar?:string;
    friends?:any;
    uid:any;
}