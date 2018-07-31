import { createSelector } from 'reselect';

export const collaboratorsSelector = createSelector<any, any, IItemData[]>(
  (state) => state.getIn(['locationCollaborators', 'collaborators']),
  (collaborators) => collaborators.toJS()
);

export const columnsSelector = createSelector<any, any, ITableColumnStack>(
  (state) => state.getIn(['locationCollaborators', 'columns']),
  (columns) => columns.toJS()
);

export const activeColumnsSelector = createSelector<any, any, ITableColumn[]>(
  columnsSelector,
  (columns) => columns.selected_columns
);

export const metaSelector = createSelector<any, any, any>(
  (state) => state.getIn(['locationCollaborators', 'meta']),
  (meta) => meta.toJS()
);

export const optionsSelector = createSelector<any, any, IGetItemOptions>(
  (state) => state.getIn(['locationCollaborators', 'options']),
  (options) => options.toJS()
);
