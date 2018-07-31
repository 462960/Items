import { createSelector } from 'reselect';

export const locationSelector = createSelector<any, any, ILocationData>(
  (state) => state.getIn(['location', 'location']),
  (location) => location.toJS()
);

export const locationCollaboratorsSelector = createSelector<
  any,
  any,
  ILocationData[]
>(
  (state) => state.getIn(['location', 'location_collaborators']),
  (collaborators) => collaborators.toJS()
);
