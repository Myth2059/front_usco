import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent {
  items: MenuItem[] | undefined;
   route:string = "a";
   activeItem :MenuItem | undefined;
   constructor(private router: ActivatedRoute,private cookieService: CookieService,private navRouter: Router) {
    this.router.url.subscribe(val =>{
      if (val.length == 0) {
        console.log("/");
        this.route="/";
        
      }else{
        this.route=val[0].path;
      }
    });
   }



    deleteCookies(){
      
      console.log("event"); 
        
        this.cookieService.deleteAll("/");
        this.navRouter.navigate(['/login']);
       
   }
  

  ngOnInit() {


      this.items = [
          { label: 'Inicio',routerLink:'/', icon: 'pi pi-fw pi-home' },
          { label: 'Administración',routerLink:'/administracion', icon: 'pi pi-fw pi-cog' },
          { label: 'Informes',routerLink:'/informes', icon: 'pi pi-fw pi-pencil' },
          { label: 'Salir', icon: 'pi pi-fw pi-pencil', command:(event)=>{
            this.deleteCookies();
           
          }},
      ];
    
      var elemento = document.querySelector('[aria-label="Salir"]');
      var span = elemento?.getElementsByTagName('span');
      if (span) {
        span[0].addEventListener('click',()=>{
          this.deleteCookies();
        })
      }
  
  


  }
  

}
