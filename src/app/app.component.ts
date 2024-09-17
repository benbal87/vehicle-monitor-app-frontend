import { Component } from '@angular/core'
import { MatTab, MatTabGroup } from '@angular/material/tabs'
import { RouterOutlet } from '@angular/router'
import {
  VehicleMapComponent
} from './components/vehicle-map/vehicle-map.component'
import {
  VehicleTableComponent
} from './components/vehicle-table/vehicle-table.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, VehicleTableComponent, MatTabGroup, MatTab,
    VehicleMapComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
