import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { PaginatedTableComponent } from '../../../shared/components/paginated-table/paginated-table.component';
import { EmployeeService } from '../../services/employee.service';
import { TableColumn } from '../../../shared/model/table-column';
import { TableColumnTypeEnum } from '../../../shared/model/table-column-type.enum';
import { TableSelectionEnum } from '../../../shared/model/table-selection.enum';
import { Employee } from '../../model/employee';
import { TableRowAction } from '../../../shared/model/table-row-action';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { CreateEmployeeDialogComponent } from '../dialogs/create-employee-dialog/create-employee-dialog.component';
import { EditEmployeeDialogComponent } from '../dialogs/edit-employee-dialog/edit-employee-dialog.component';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    PaginatedTableComponent,
    SplitButtonModule,
    ToolbarModule,
    CreateEmployeeDialogComponent,
    EditEmployeeDialogComponent,
    CardModule,
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss',
})
export class EmployeesPageComponent {
  //#region Services
  public employeeService: EmployeeService = inject(EmployeeService);
  public confirmationService: ConfirmationService = inject(ConfirmationService);
  public router: Router = inject(Router);
  public messageService: MessageService = inject(MessageService);
  //#endregion Services

  //#region Forms
  //#endregion Forms

  //#region Enums
  public tableSelectionEnum = TableSelectionEnum;
  //#endregion Enums

  //#region Signals
  public selectedEmployees = signal<Employee[]>([]);
  public showCreateEmployeeDialog = signal<boolean>(false);
  public showEditEmployeeDialog = signal<boolean>(false);
  //#endregion Signals

  //#region Computed signals
  //#endregion Computed signals

  //#region Properties
  @ViewChild('employeesPaginatedTable')
  employeesPaginatedTable?: PaginatedTableComponent;
  public employeeIdToEdit = '';
  public employeesTableColumns: TableColumn[] = [
    {
      name: 'Image',
      field: 'pictureUrl',
      type: TableColumnTypeEnum.AVATAR,
    },
    {
      name: 'Name',
      field: 'fullName',
      type: TableColumnTypeEnum.LABEL,
    },
    {
      name: 'Email',
      field: 'email',
      type: TableColumnTypeEnum.LABEL,
    },
    {
      name: 'Job Title',
      field: 'jobTitle',
      type: TableColumnTypeEnum.LABEL,
    },
    {
      name: 'Phone',
      field: 'phone',
      type: TableColumnTypeEnum.LABEL,
    },
    {
      name: 'Address',
      field: 'address',
      type: TableColumnTypeEnum.LABEL,
    },
  ];

  public employeesTableRowActions: TableRowAction[] = [
    {
      btnIcon: PrimeIcons.EYE,
      btnActionFunction: (rowData: Employee) => {
        this.router.navigate(['/employees', rowData.id]);
      },
    },
    {
      btnIcon: PrimeIcons.PENCIL,
      btnActionFunction: (rowData: Employee) => {
        this.employeeIdToEdit = rowData.id;
        this.showEditEmployeeDialog.set(true);
      },
    },
    {
      btnIcon: PrimeIcons.TRASH,
      btnActionFunction: (rowData: Employee) => {
        this.confirmationService.confirm({
          message: `Do you want to delete employee: ${rowData.fullName}?`,
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass: 'p-button-danger p-button-text',
          rejectButtonStyleClass: 'p-button-text p-button-text',
          acceptIcon: 'none',
          rejectIcon: 'none',
          accept: () => {
            this.deleteEmployees([rowData.id]);
          },
          reject: () => {},
        });
      },
    },
  ];
  //#endregion Properties

  constructor() {}

  //#region Event handlers
  public onNew(): void {
    this.showCreateEmployeeDialog.set(true);
  }

  public onDelete(): void {
    this.confirmationService.confirm({
      message: `Do you want to delete selected employees?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.deleteEmployees(this.selectedEmployees().map((x) => x.id));
      },
      reject: () => {},
    });
  }

  public onCreationSuccesfully(creationSuccesfully: any): void {
    if (creationSuccesfully) this.employeesPaginatedTable?.refreshTable();
  }

  public onUpdateSuccesfully(updateSuccesfully: any): void {
    if (updateSuccesfully) this.employeesPaginatedTable?.refreshTable();
  }
  //#endregion Event handlers

  //#region Public functions
  //#endregion Public functions

  //#region Private functions
  private deleteEmployees(employeeIds: string[]): void {
    this.employeeService.deleteEmployees(employeeIds).subscribe({
      next: (_data: boolean) => {
        this.employeesPaginatedTable?.refreshTable();
        this.messageService.add({
          severity: 'success',
          summary: `${employeeIds.length > 1 ? 'Employees' : 'Employee'} Deleted`,
          detail: `${employeeIds.length > 1 ? 'Employees were' : 'Employee was'} deleted succesfully`,
          life: 3000,
        });
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
  //#endregion Private functions
}
