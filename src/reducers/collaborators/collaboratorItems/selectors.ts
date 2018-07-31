import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

export const itemsSelector = createSelector<
  IStore,
  List<IItemData>,
  IItemData[]
>(
  (state) => state.getIn(['collaboratorItems', 'items']),
  (items) => items.toJS()
);

export const columnsSelector = createSelector<
  IStore,
  Map<string, any>,
  ITableColumnStack
>(
  (state) => state.getIn(['collaboratorItems', 'columns']),
  (columns) => columns.toJS()
);

export const activeColumnsSelector = createSelector<
  IStore,
  ITableColumnStack,
  ITableColumn[]
>(columnsSelector, (columns) => columns.selected_columns);

export const metaSelector = createSelector<
  IStore,
  Map<string, ITableCountMeta>,
  ITableCountMeta
>((state) => state.getIn(['collaboratorItems', 'meta']), (meta) => meta.toJS());

export const optionsSelector = createSelector<
  IStore,
  Map<string, IGetOptions>,
  IGetOptions
>(
  (state) => state.getIn(['collaboratorItems', 'options']),
  (options) => options.toJS()
);
