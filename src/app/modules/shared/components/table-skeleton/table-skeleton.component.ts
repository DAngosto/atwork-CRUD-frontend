import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TableColumn } from '../../model/table-column';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [TableModule, SkeletonModule],
  templateUrl: './table-skeleton.component.html',
  styleUrl: './table-skeleton.component.scss',
})
export class TableSkeletonComponent {
  //#region Services
  //#endregion Services

  //#region Forms
  //#endregion Forms

  //#region Signals
  //#endregion Signals

  //#region Computed signals
  //#endregion Computed signals

  //#region Properties
  public columns = input.required<TableColumn[]>();
  public items: {}[] = Array(10).fill({});
  //#endregion Properties

  //#region Event handlers
  //#endregion Event handlers

  //#region Public functions
  //#endregion Public functions

  //#region Private functions
  //#endregion Private functions
}
