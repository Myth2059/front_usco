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


data:IUserNLocal | undefined;

onclose(){

  this.isVisibleChange.emit(false);
  this.idChange.emit(undefined);
  setTimeout(() => {
    this.isLoadingChange.emit(true);
  }, 500);
  
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
    this.isLoading=false;
   });
}

}


