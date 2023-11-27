import { Injectable, inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn:'root'
})
export class UserServices{
    private cookieServices = inject(CookieService);

    isLogged(){
       return this.cookieServices.get('cedula') ? true : false      
    }
    isAdmin(){
        return this.cookieServices.get('rol')==="Administrador" ? true : false
           }
    isOwner(id:string):boolean{
        if (this.cookieServices.get('cedula')==id && this.cookieServices.get('rol')==="Propietario") {
            return true;
        }
        return false;
    }
}