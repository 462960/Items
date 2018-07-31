import { createSelector } from 'reselect';

export const itemsStatusesSelector = createSelector<any, any, any>(
  (state) => state.getIn(['itemStatusesList', 'itemStatuses']),
  (statuses) => statuses.toJS()
);
