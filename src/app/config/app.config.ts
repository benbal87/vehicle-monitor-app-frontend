import { provideHttpClient, withJsonpSupport } from '@angular/common/http'
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  provideAnimationsAsync
} from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { environment } from '../../environments/environment'

import { routes } from './app.routes'
import { GOOGLE_MAPS_API_KEY } from './google-maps-api-key.token'
import { GOOGLE_MAPS_MAP_ID } from './google-maps-map-id.token'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withJsonpSupport()),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    {
      provide: GOOGLE_MAPS_API_KEY,
      useValue: environment.googleMaps.apiKey
    },
    {
      provide: GOOGLE_MAPS_MAP_ID,
      useValue: environment.googleMaps.mapId
    }
  ]
}
