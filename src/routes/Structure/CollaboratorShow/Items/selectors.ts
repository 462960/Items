import { createSelector } from 'reselect';
import {
  getColumnsWithAttrs,
  getColumnsLabels,
} from 'components/common/Table/helpers';
import {
  activeColumnsSelector,
  columnsSelector,
  metaSelector,
  optionsSelector,
} from 'reducers/collaborators/collaboratorItems/selectors';
import { COLUMNS_ATTRS } from 'components/common/Table/ItemsTable/constants';

export const customActiveColumnsSelector = createSelector<
  any,
  ITableColumn[],
  ITableColumnWithAttrs[]
>(activeColumnsSelector, getColumnsWithAttrs(COLUMNS_ATTRS));

export const customAllColumnsSelector = createSelector<
  any,
  any,
  ITableColumnStackWithLabels
>(columnsSelector, (allColumns) => ({
  ...allColumns,
  all_column_names: getColumnsLabels(
    allColumns.all_column_names,
    COLUMNS_ATTRS
  ),
}));

export const tableMetaSelector = createSelector<
  any,
  any,
  IGetOptions,
  ITableMeta
>(metaSelector, optionsSelector, (meta, options) => ({
  page: options.page,
  perPage: options.perPage,
  total: meta.count,
  sort: options.sort,
}));
