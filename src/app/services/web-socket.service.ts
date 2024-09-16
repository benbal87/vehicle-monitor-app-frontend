import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'

@Injectable({ providedIn: 'root' })
export class WebSocketService {

  public webSocketSubject: WebSocketSubject<any>

  constructor() {
    this.webSocketSubject = webSocket('ws://localhost:8080/vehicle-updates')
  }

  public connectToWebSocket(): Subscription {
    return this.webSocketSubject.subscribe({
      next: message => {
        console.log('connectToWebSocket => Received message:', message)
      },
      error: err => {
        console.error('WebSocket error:', err)
      },
      complete: () => {
        console.log('WebSocket connection closed')
      }
    })
  }
}
