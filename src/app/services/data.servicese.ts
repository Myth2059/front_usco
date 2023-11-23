import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class DataService {
    private apiUrl = environment.apiUrl;

    async login(id: number, password: string): Promise<responseLogin> {
        const url = `${this.apiUrl}/login`;
        console.log(url);
        
        const body = { id, password };
        console.log("body",body);
        
        const response = await axios.post<responseLogin>(url, body);
        console.log("response",response);
        
        const responseData = response.data;
        let reseponseObject: responseLogin;

        if (responseData.code == 1) {
            reseponseObject = {
                code: responseData.code,
                msg: responseData.msg,
                id: responseData.id,
                rol: responseData.rol,
                user: responseData.user
            }
        } else {
            reseponseObject = {
                code: 0,
                msg: responseData.msg,
            };
        }

        return reseponseObject;
    };



}

interface responseLogin {
    msg: string;
    code: number;
    user?: string;
    id?: number;
    rol?: string
}
