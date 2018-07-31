interface ITableColumn {
  name: string;
  order: number;
}

interface ITableColumnWithLabel {
  name: string;
  label?: string;
}

interface IColumnAttrs {
  [x: string]: {
    label: string;
    widthWeight: number;
    sortable?: boolean;
    selector?(item: any): React.ReactNode;
    style?: object;
  };
}

interface ITableColumnStack {
  selected_columns: ITableColumn[];
  all_column_names?: string[];
}

interface ITableColumnStackWithLabels extends ITableColumnStack {
  all_column_names?: ITableColumnWithLabel[];
}

interface ITableMeta {
  page: number;
  perPage: number;
  total: number;
  sort: {
    field?: string;
    order?: string;
  };
}

interface ITableAction {
  type: string;
  onClick(entity: any): any;
  img: string;
}

interface ITableColumnWithAttrs extends ITableColumn {
  label: string;
  style?: object;
  widthWeight: number;
  selector?(item: ITableItem): any;
  sortable?: boolean;
}

interface IColumnChange extends ITableColumn, ITableColumnWithLabel {
  active: boolean;
}

interface IColumnChangeGroup {
  [x: string]: IColumnChange;
}

interface ITableItem {
  public_id?: string;
  [other: string]: any;
}

interface IGetOptions {
  id?: string;
  search?: string;
  sort?: {
    field: string;
    order: string;
  };
  page: number;
  perPage: number;
}

interface ITableCountMeta {
  count: number;
}
