import { createSelector } from 'reselect';

export const locationsSelector = createSelector<any, any, ILocationData[]>(
  (state) => state.getIn(['locationsList', 'locations']),
  (locations) => locations.toJS()
);
