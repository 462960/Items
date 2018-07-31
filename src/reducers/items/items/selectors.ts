import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

export const itemsSelector = createSelector<
  IStore,
  List<IItemData>,
  IItemData[]
>((state) => state.getIn(['items', 'items']), (items) => items.toJS());

export const columnsSelector = createSelector<
  IStore,
  List<ITableColumnStack>,
  ITableColumnStack
>((state) => state.getIn(['items', 'columns']), (columns) => columns.toJS());

export const activeColumnsSelector = createSelector<
  IStore,
  ITableColumnStack,
  ITableColumn[]
>(columnsSelector, (columns) => columns.selected_columns);

export const metaSelector = createSelector<
  IStore,
  Map<string, ITableCountMeta>,
  ITableCountMeta
>((state) => state.getIn(['items', 'meta']), (meta) => meta.toJS());

export const optionsSelector = createSelector<
  IStore,
  Map<string, IGetItemOptions>,
  IGetItemOptions
>((state) => state.getIn(['items', 'options']), (options) => options.toJS());
