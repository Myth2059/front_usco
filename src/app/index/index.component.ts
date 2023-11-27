import { ChangeDetectorRef, Component,OnInit, inject } from '@angular/core';
import { DataService, ILocal } from '../services/data.servicese';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserServices } from '../services/user.services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class IndexComponent implements OnInit{
  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) {}
data:ILocal[] | undefined;
isAdmin=true;
isVisible=false;
isLoading=true;
id:number | undefined=undefined;

userServices = inject(UserServices);

deleteLocal(event:Event,idEliminar:number){
  this.confirmationService.confirm({
  target:event.target as EventTarget,
  message:"Deseas eliminar la tienda?",
  icon: 'pi pi-exclamation-triangle',
  accept:()=>{
    
    
    this.dataService.deleteLocal(idEliminar,parseInt(this.cookieService.get("cedula"))).then((value)=>{
      console.log(idEliminar);
      
      if (value.code == 1) {
        this.data = this.data?.filter(value => value.id != idEliminar );
        this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: value.msg ,key:"delete"});
      }else{
        this.messageService.add({ severity: 'error', summary: 'Eliminado', detail: value.msg ,key:"delete"});
      }
   
    });

  }
  })
}

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

