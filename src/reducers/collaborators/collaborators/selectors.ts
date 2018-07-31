import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const collaboratorsSelector = createSelector<
  IStore,
  Map<string, IItemData>,
  IItemData[]
>(
  (state) => state.getIn(['collaborators', 'collaborators']),
  (collaborators) => collaborators.toJS()
);

export const columnsSelector = createSelector<
  IStore,
  Map<string, any>,
  ITableColumnStack
>(
  (state) => state.getIn(['collaborators', 'columns']),
  (columns) => columns.toJS()
);

export const activeColumnsSelector = createSelector<
  IStore,
  ITableColumnStack,
  ITableColumn[]
>(columnsSelector, (columns) => columns.selected_columns);

export const metaSelector = createSelector<IStore, any, ITableCountMeta>(
  (state) => state.getIn(['collaborators', 'meta']),
  (meta) => meta.toJS()
);

export const optionsSelector = createSelector<IStore, any, IGetItemOptions>(
  (state) => state.getIn(['collaborators', 'options']),
  (options) => options.toJS()
);
