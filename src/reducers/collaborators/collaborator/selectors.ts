import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const collaboratorSelector = createSelector<
  IStore,
  Map<string, ICollaboratorData>,
  ICollaboratorData
>(
  (state) => state.getIn(['collaborator', 'collaborator']),
  (collaborator) => collaborator.toJS()
);
