import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  model,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { TableColumn } from '../../model/table-column';
import { TableRowAction } from '../../model/table-row-action';
import { TableRowActionLocationEnum } from '../../model/table-row-actions-location.enum';
import { TableSelectionEnum } from '../../model/table-selection.enum';
import { TableColumnTypeEnum } from '../../model/table-column-type.enum';
import { AvatarModule } from 'primeng/avatar';
import { TableSkeletonComponent } from '../table-skeleton/table-skeleton.component';

@Component({
  selector: 'app-paginated-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    AvatarModule,
    TableSkeletonComponent,
  ],
  templateUrl: './paginated-table.component.html',
  styleUrl: './paginated-table.component.scss',
})
export class PaginatedTableComponent implements OnDestroy {
  //#region Properties
  private subscriptions: Subscription[] = [];
  private _selectedItems!: any[];
  get selectedItems(): any[] {
    return this._selectedItems;
  }
  set selectedItems(values: any[]) {
    this._selectedItems = values;
    this.onSelectedItemsChange();
  }
  //#endregion Properties

  //#region Enums
  public rowActionLocationEnum = TableRowActionLocationEnum;
  public tableSelectionEnum = TableSelectionEnum;
  public tableColumnTypeEnum = TableColumnTypeEnum;
  //#endregion Enums

  //#region Signals
  public dataService = input.required<any>();
  public fetchMethod = input<(page: number, size: number) => Observable<any>>();
  public columns = input.required<TableColumn[]>();
  public rowActions = input<TableRowAction[]>();
  public tableSelection = input<TableSelectionEnum>();
  public rowActionsLocation = input<TableRowActionLocationEnum>(
    this.rowActionLocationEnum.END,
  );
  public selectedRowDatas = model<any[]>();
  public items: WritableSignal<any[]> = signal([]);
  public loading: WritableSignal<boolean> = signal(false);
  public actualPage: WritableSignal<number> = signal(1);
  public pageSize: WritableSignal<number> = signal(10);
  public totalPages: WritableSignal<number> = signal(0);
  //#endregion Signals

  //#region Computed Signals
  public selectionMode = computed(() => {
    switch (this.tableSelection()) {
      case this.tableSelectionEnum.SINGLE: {
        return this.tableSelectionEnum.SINGLE;
      }
      case this.tableSelectionEnum.MULTIPLE: {
        return this.tableSelectionEnum.MULTIPLE;
      }
      default: {
        return undefined;
      }
    }
  });
  //#endregion Computed Signals

  constructor() {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  //#region Public
  public onBtnVisibleFunction(rowAction: TableRowAction, rowData: any): string {
    if (
      rowAction.btnIsVisibleFunction &&
      !rowAction.btnIsVisibleFunction(rowData)
    ) {
      return ' hidden';
    }
    return '';
  }

  public onRowActionClick(rowAction: TableRowAction, rowData: any) {
    if (rowAction.btnActionFunction) rowAction.btnActionFunction(rowData);
  }

  public loadEntities(event: TableLazyLoadEvent) {
    this.actualPage.set(event.first! / event.rows! + 1);
    this.loadData();
  }

  public refreshTable(): void {
    this.loadData();
  }
  //#endregion Public

  //#region Private
  private loadData() {
    this.loading.set(true);
    if (this.fetchMethod()) {
      this.subscriptions.push(
        this.fetchMethod()!(this.actualPage(), this.pageSize()).subscribe({
          next: (response: any) => {
            this.items.set(response.data);
            this.totalPages.set(response.totalRecords);
            this.loading.set(false);
          },
          error: (e: any) => {
            console.log(e);
            this.loading.set(false);
          },
        }),
      );
    } else {
      console.error('fetchMethod is not defined.');
      this.loading.set(false);
    }
  }

  private onSelectedItemsChange() {
    if (
      this.tableSelection() === this.tableSelectionEnum.SINGLE ||
      this.tableSelection() === this.tableSelectionEnum.RADIOBUTTON
    ) {
      this.selectedRowDatas.set(this.selectedItems ?? []);
    } else {
      this.selectedRowDatas.set(this.selectedItems);
    }
  }
  //#endregion Private
}
