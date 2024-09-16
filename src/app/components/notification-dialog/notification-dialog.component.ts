import { Component, Inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog'
import { MatDivider } from '@angular/material/divider'
import { MatList, MatListItem } from '@angular/material/list'
import { NotificationDialogData } from '../../types/app.types'

@Component({
  selector: 'app-notification-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDivider,
    MatList,
    MatListItem
  ],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.scss'
})
export class NotificationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificationDialogData
  ) {
  }

}
