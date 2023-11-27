import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})

export class DataService {
    constructor(private cookieService: CookieService){}
    private apiUrl = environment.apiUrl;

    async login(id: number, password: string): Promise<IResponseLogin> {
        const url = `${this.apiUrl}/login`;      
        let reseponseObject: IResponseLogin;
        const body = { id, password };
     try {
           
        const response = await axios.post<IResponseLogin>(url, body);
      
        
        const responseData = response.data;
        

        if (responseData.code == 1) {
            reseponseObject = {
                code: responseData.code,
                msg: responseData.msg,
                id: responseData.id,
                rol: responseData.rol,
                user: responseData.user
            }
            this.cookieService.set("cedula",""+reseponseObject.id);
            this.cookieService.set("token",""+reseponseObject.msg);
            this.cookieService.set("name",""+reseponseObject.user);
            this.cookieService.set("rol",""+reseponseObject.rol);

        } else {
            reseponseObject = {
                code: 0,
                msg: responseData.msg,
            };
        }
        return reseponseObject;
    } catch (e:any) {

        reseponseObject ={code:0,msg:e.message}
        return reseponseObject;
        
    }
        
    };






        async createUser(user:IUser):Promise<IResponse>{

            const headers = {
                'Authorization':this.cookieService.get('token')
            }

            const response = (await axios.post<IResponse>(`${this.apiUrl}/createuser`,user,{headers})).data;

            return response;

        }

        async createLocal(local:ILocal):Promise<IResponse>{
            const headers = {
                'Authorization':this.cookieService.get('token')
            }
            const response = (await axios.post<IResponse>(`${this.apiUrl}/createlocal`,local,{headers})).data;
            console.log(response);
            
            return response;


        }

        async getLocales():Promise<ILocal>{

            const response = (await axios.get<ILocal>(`${this.apiUrl}/locales`)).data;

            return response;
        }

        async getLocal(id:number):Promise<IUserNLocal>{
            const response = (await axios.get<IUserNLocal>(`${this.apiUrl}/getlocal/${id}`)).data;

            return response;    
        }

        async updateLocal(body:any):Promise<IResponse>{
            const response = (await axios.put<IResponse>(`${this.apiUrl}/updatelocal`,body)).data;
            return response;
        }


}

export interface IUser{
    id:number;
    name:string;
    lastname:string;
    phone:number;
    password:string;
    rol:string;
}

interface IResponse{
    msg:string;
    code:number;
}

export interface ILocal{
id?:number,
nombre:string,
ubicacion:number,
estado:string,
categoria:string,
subcategoria:string,
imgurl:string,
user_id:string,
detalles:string,


}

interface IResponseLogin {
    msg: string;
    code: number;
    user?: string;
    id?: number;
    rol?: string
}

export interface IUserNLocal{
    "id":number,
    "name": string,
    "lastname": string,
    "phone": number,
    "rol": string,
    "nombre": string,
    "ubicacion": number,
    "estado":string,
    "categoria": string,
    "subcategoria":string,
    "imgurl": string,
    "user_id": number,
    "detalles":string
}