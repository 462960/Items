import { createSelector } from 'reselect';
import {
  activeColumnsSelector,
  columnsSelector,
  metaSelector,
  optionsSelector,
} from 'reducers/items/items/selectors';
import { COLUMNS_ATTRS } from './constants';
import {
  getColumnsWithAttrs,
  getColumnsLabels,
} from 'components/common/Table/helpers';

export const customActiveColumnsSelector = createSelector<
  IStore,
  ITableColumn[],
  ITableColumnWithAttrs[]
>(activeColumnsSelector, getColumnsWithAttrs(COLUMNS_ATTRS));

export const customAllColumnsSelector = createSelector<
  IStore,
  ITableColumnStack,
  ITableColumnStackWithLabels
>(columnsSelector, (allColumns) => ({
  ...allColumns,
  all_column_names: getColumnsLabels(
    allColumns.all_column_names,
    COLUMNS_ATTRS
  ),
}));

export const tableMetaSelector = createSelector<
  IStore,
  ITableCountMeta,
  IGetItemOptions,
  ITableMeta
>(metaSelector, optionsSelector, (meta, options) => ({
  page: options.page,
  perPage: options.perPage,
  total: meta.count,
  sort: options.sort,
}));
