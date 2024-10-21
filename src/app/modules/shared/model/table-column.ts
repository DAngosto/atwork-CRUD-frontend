import { TableColumnTypeEnum } from './table-column-type.enum';

export interface TableColumn {
  name: string;
  field: string;
  type: TableColumnTypeEnum;
}
