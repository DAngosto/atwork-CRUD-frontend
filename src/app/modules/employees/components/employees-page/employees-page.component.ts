import { Component, computed, inject, signal } from '@angular/core';
import { PaginatedTableComponent } from '../../../shared/components/paginated-table/paginated-table.component';
import { EmployeeService } from '../../services/employee.service';
import { TableColumn } from '../../../shared/model/table-column';
import { TableColumnTypeEnum } from '../../../shared/model/table-column-type.enum';
import { TableSelectionEnum } from '../../../shared/model/table-selection.enum';
import { Employee } from '../../model/employee';
import { TableRowAction } from '../../../shared/model/table-row-action';
import { PrimeIcons } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [PaginatedTableComponent, SplitButtonModule],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss',
})
export class EmployeesPageComponent {
  public employeeService: EmployeeService = inject(EmployeeService);

  public tableSelectionEnum = TableSelectionEnum;
  public selectedEmployees = signal<Employee[]>([]);
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
      btnActionFunction: (rowData: Employee) => {},
    },
    {
      btnIcon: PrimeIcons.PENCIL,
      btnActionFunction: (rowData: Employee) => {},
    },
    {
      btnIcon: PrimeIcons.TRASH,
      btnActionFunction: (rowData: Employee) => {},
    },
  ];

  public getEmployeesSplitButtonModel = computed(() => {
    return [
      {
        label: 'Delete selected',
        icon: PrimeIcons.TRASH,
        disabled: this.selectedEmployees().length === 0,
        command: () => {},
      },
    ];
  });
}
