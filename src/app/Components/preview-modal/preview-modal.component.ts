import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DataService, IUserNLocal } from 'src/app/services/data.servicese'; 

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.css']
})
export class PreviewModalComponent {
  constructor(private dataService: DataService){};
@Input() isVisible:boolean = false;
@Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
@Input() id:number | undefined;
@Output() idChange: EventEmitter<number | undefined> = new EventEmitter<number | undefined>();
@Input() isLoading:boolean = true;
@Output() isLoadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

editableStatus:IEditable={
  "name": false,
  "lastname": false,
  "phone": false,
  "rol": false,
  "nombre": false,
  "ubicacion": false,
  "estado": false,
  "categoria": false,
  "subcategoria": false,
  "imgurl": false,
  "user_id": false,
}

data:IUserNLocal | undefined;

onclose(){

  this.isVisibleChange.emit(false);
  this.idChange.emit(undefined); 
  this.isLoadingChange.emit(true);
  for (let key in this.editableStatus) {
    if (Object.prototype.hasOwnProperty.call(this.editableStatus, key)) {
       this.editableStatus[key] = false;
      
    }
  }
 
  
}

ngOnChanges(changes: SimpleChanges):void {
  if (changes['isVisible']) {
    if (this.isVisible) {
    this.loadData();
    }    
  }
}

loadData(){
   this.dataService.getLocal(this.id!).then((response)=>{
    this.data = {...response};
    this.isLoadingChange.emit(false);
   });
}

}


interface IEditable{
  "name": boolean,
  "lastname": boolean,
  "phone": boolean,
  "rol": boolean,
  "nombre": boolean,
  "ubicacion": boolean,
  "estado": boolean,
  "categoria": boolean,
  "subcategoria": boolean,
  "imgurl": boolean,
  "user_id": boolean,
  [key:string]:boolean
}