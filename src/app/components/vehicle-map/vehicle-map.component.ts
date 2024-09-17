import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { GoogleMapsModule } from '@angular/google-maps'
import { catchError, map, Observable, of, Subscription } from 'rxjs'
import { GOOGLE_MAPS_API_KEY } from '../../config/google-maps-api-key.token'
import { GOOGLE_MAPS_MAP_ID } from '../../config/google-maps-map-id.token'
import { WebSocketService } from '../../services/web-socket.service'
import { Location, Vehicle } from '../../types/app.types'

@Component({
  selector: 'app-vehicle-map',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule
  ],
  templateUrl: './vehicle-map.component.html',
  styleUrl: './vehicle-map.component.scss'
})
export class VehicleMapComponent implements OnInit, OnDestroy {

  private readonly DEFAULT_LATITUDE = 47.497913
  private readonly DEFAULT_LONGITUDE = 19.040236

  private wsSubscription!: Subscription

  mapsLoaded: Observable<boolean>

  options!: google.maps.MapOptions
  error: string | undefined
  locations: Location[] = []

  constructor(
    @Inject(GOOGLE_MAPS_API_KEY) private apiKey: string,
    @Inject(GOOGLE_MAPS_MAP_ID) private mapId: string,
    private ws: WebSocketService,
    private httpClient: HttpClient
  ) {
    console.log('apiKey=' + apiKey)
    console.log('mapID=' + mapId)
    this.mapsLoaded = httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${apiKey}`,
        'callback'
      )
      .pipe(
        map(() => {
          this.initOptions()
          return true
        }),
        catchError((err: any) => {
          console.error('Error while trying to init google maps api!', err)
          return of(false)
        })
      )
  }

  ngOnInit(): void {
    this.wsSubscription = this.ws.webSocketSubject.subscribe({
      next: (data: Vehicle[] = []) => {
        console.log('Received message:', data)
        this.error = undefined
        this.locations = this.getLocationsFromVehicles(data)
      },
      error: err => {
        console.error('WebSocket error:', err)
        this.error = err.message
      },
      complete: () => {
        console.log('WebSocket connection closed')
      }
    })
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe()
  }

  getLocationsFromVehicles(data: Vehicle[]): Location[] {
    return data.reduce((acc: Location[], item: Vehicle) =>
      [
        ...acc,
        {
          lat: item.latitude,
          lng: item.longitude
        }
      ], [])
  }

  initOptions() {
    this.options = {
      mapId: this.mapId,
      center: {
        lat: this.DEFAULT_LATITUDE,
        lng: this.DEFAULT_LONGITUDE
      },
      zoom: 18
    }
  }

}
