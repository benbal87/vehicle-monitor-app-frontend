import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { WebSocketService } from '../../services/web-socket.service'
import { NotificationDialogProps, Vehicle } from '../../types/app.types'
import {
  NotificationDialogComponent
} from '../notification-dialog/notification-dialog.component'

@Component({
  selector: 'app-vehicle-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSort,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './vehicle-table.component.html',
  styleUrl: './vehicle-table.component.scss'
})
export class VehicleTableComponent implements AfterViewInit, OnDestroy {

  protected readonly COLUMN_KEYS: Array<string> = [
    'id',
    'latitude',
    'longitude',
    'notifications'
  ]
  protected readonly PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 50, 100]
  protected readonly PAGE_SIZE_DEFAULT: number = 5
  protected readonly PAGE_INDEX_DEFAULT: number = 0

  @ViewChild(MatSort)
  sort!: MatSort

  @ViewChild(MatPaginator)
  paginator!: MatPaginator

  dataSource: MatTableDataSource<Vehicle>

  isLoading: boolean = true
  error: string | undefined
  pageIndex?: number = undefined
  pageSize?: number = undefined

  webSocketSubscription!: Subscription

  constructor(private ws: WebSocketService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Vehicle>([])
  }

  ngAfterViewInit(): void {
    this.ws.webSocketSubject.subscribe({
      next: data => {
        console.log('Received message:', data)
        this.setData(data)
      },
      error: err => {
        console.error('WebSocket error:', err)
      },
      complete: () => {
        console.log('WebSocket connection closed')
      }
    })
  }

  ngOnDestroy() {
    this.webSocketSubscription.unsubscribe()
  }

  initPagination(): void {
    if (!this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator
    }

    this.dataSource.paginator.pageIndex =
      this.pageIndex ?? this.PAGE_INDEX_DEFAULT
    this.dataSource.paginator.pageSize =
      this.pageSize ?? this.PAGE_SIZE_DEFAULT
    this.dataSource.paginator.pageSizeOptions = this.PAGE_SIZE_OPTIONS
    this.dataSource.paginator.length = this.dataSource.data.length
  }

  setData(data: Vehicle[]): void {
    this.dataSource.data = data
    this.dataSource.sort = this.sort
    this.initPagination()
    this.isLoading = false
  }

  handlePageEvent($pageEvent: PageEvent) {
    this.pageSize = $pageEvent.pageSize
    this.pageIndex = $pageEvent.pageIndex
  }

  openNotificationDialog(vehicleId: number): void {
    const vehicle = this.dataSource.data.find(v => v.id === vehicleId)
    if (vehicle) {
      const props: NotificationDialogProps = {
        data: { vehicle }
      }

      this.dialog.open(NotificationDialogComponent, props)
    } else {
      console.error(`Vehicle with id ${vehicleId} not found.`)
    }
  }

  getMockVehicles(): Vehicle[] {
    return [
      {
        id: 1,
        latitude: 48.6768262,
        longitude: 14.5775257,
        notifications: []
      }, {
        id: 2,
        latitude: 45.1934857,
        longitude: 5.7218985,
        notifications: []
      }, {
        id: 3,
        latitude: -22.0227557,
        longitude: -63.6775234,
        notifications: []
      }, {
        id: 4,
        latitude: -16.5030467,
        longitude: -49.4262684,
        notifications: []
      }, {
        id: 5,
        latitude: 42.4782102,
        longitude: 78.3955986,
        notifications: []
      }
    ]
  }
}
