import { createSelector } from 'reselect';

export const itemsSelector = createSelector<any, any, IItemData[]>(
  (state) => state.getIn(['locationItems', 'items']),
  (items) => items.toJS()
);

export const columnsSelector = createSelector<any, any, ITableColumnStack>(
  (state) => state.getIn(['locationItems', 'columns']),
  (columns) => columns.toJS()
);

export const activeColumnsSelector = createSelector<any, any, ITableColumn[]>(
  columnsSelector,
  (columns) => columns.selected_columns
);

export const metaSelector = createSelector<any, any, any>(
  (state) => state.getIn(['locationItems', 'meta']),
  (meta) => meta.toJS()
);

export const optionsSelector = createSelector<any, any, IGetOptions>(
  (state) => state.getIn(['locationItems', 'options']),
  (options) => options.toJS()
);
