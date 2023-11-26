import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { DataService, ILocal } from '../services/data.servicese';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService
  ) {}
data:ILocal[] | undefined;
isAdmin=true;
isVisible=false;
isLoading=true;
id:number | undefined=undefined;

async showModal(id:number){
  this.id=id;
  this.isVisible = true;
    
}
 async ngOnInit() {
  this.isAdmin = this.cookieService.get('rol') == "Administrador";

  console.log(this.isAdmin);

 var datasco:any = await this.dataService.getLocales();
 console.log(datasco);
 
 this.data = [...datasco.data]
 this.cdr.detectChanges();


  }
}