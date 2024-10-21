export interface TableRowAction {
  btnType?: string;
  btnLabel?: string;
  btnIcon?: string;
  btnStyle?: string;
  btnClass?: string;
  btnIsVisibleFunction?: (rowData: any) => boolean;
  btnActionFunction?: (rowData: any) => void;
}
