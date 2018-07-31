import get from 'lodash.get';

export const getColumnsWithAttrs = (COLUMNS_ATTRS) => (
  columns: ITableColumn[]
): ITableColumnWithAttrs[] =>
  columns.map((column) => ({
    ...column,
    ...(COLUMNS_ATTRS[column.name] || {}),
  }));

export const getColumnsLabels = (
  columns: string[],
  COLUMNS_ATTRS
): ITableColumnWithLabel[] =>
  columns.map((column) => ({
    name: column,
    label: get(COLUMNS_ATTRS[column], 'label'),
  }));
