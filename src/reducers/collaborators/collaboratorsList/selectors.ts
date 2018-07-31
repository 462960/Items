import { createSelector } from 'reselect';

export const collaboratorsSelector = createSelector<any, any, any>(
  (state) => state.getIn(['collaboratorsList', 'collaborators']),
  (collaborators) => collaborators.toJS()
);
