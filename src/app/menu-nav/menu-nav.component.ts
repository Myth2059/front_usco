import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          { label: 'Inicio', icon: 'pi pi-fw pi-home' },
          { label: 'Administración', icon: 'pi pi-fw pi-calendar' },
          { label: 'Registro', icon: 'pi pi-fw pi-pencil' },
      ];
  }

}
