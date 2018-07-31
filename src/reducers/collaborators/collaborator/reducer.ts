import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { RESET_STORE } from 'constants/index';

const initialState = Immutable.fromJS({
  collaborator: {},
});

export const CREATE_COLLABORATOR = 'collaborator/CREATE_COLLABORATOR';
export const [CREATE_COLLABORATOR_SUCCESS, CREATE_COLLABORATOR_FAILURE] = [
  `${CREATE_COLLABORATOR}_SUCCESS`,
  `${CREATE_COLLABORATOR}_FAILURE`,
];

export const GET_COLLABORATOR = 'collaborator/GET_COLLABORATOR';
export const [GET_COLLABORATOR_SUCCESS, GET_COLLABORATOR_FAILURE] = [
  `${GET_COLLABORATOR}_SUCCESS`,
  `${GET_COLLABORATOR}_FAILURE`,
];

export const UPDATE_COLLABORATOR = 'item/UPDATE_COLLABORATOR';
export const [UPDATE_COLLABORATOR_SUCCESS, UPDATE_COLLABORATOR_FAILURE] = [
  `${UPDATE_COLLABORATOR}_SUCCESS`,
  `${UPDATE_COLLABORATOR}_FAILURE`,
];

export const DELETE_COLLABORATOR = 'item/DELETE_COLLABORATOR';
export const [DELETE_COLLABORATOR_SUCCESS, DELETE_COLLABORATOR_FAILURE] = [
  `${DELETE_COLLABORATOR}_SUCCESS`,
  `${DELETE_COLLABORATOR}_FAILURE`,
];

export const createCollaborator = (
  payload: ICollaboratorData,
  promise: IPromiseCallback
) => ({
  payload,
  promise,
  type: CREATE_COLLABORATOR,
});

export const getCollaborator = (id: string, promise?: IPromiseCallback) => ({
  promise,
  payload: id,
  type: GET_COLLABORATOR,
});

export const updateCollaborator = (
  payload: ICollaboratorData,
  promise: IPromiseCallback
): IAction => ({
  payload,
  promise,
  type: UPDATE_COLLABORATOR,
});

export const deleteCollaborator = (
  id: string,
  promise: IPromiseCallback
): IAction => ({
  id,
  promise,
  type: DELETE_COLLABORATOR,
});

export default handleActions(
  {
    [GET_COLLABORATOR_SUCCESS]: (state, action) => {
      return state.set('collaborator', Immutable.fromJS(action.payload));
    },

    [RESET_STORE]: () => {
      return initialState;
    },
  },
  initialState
);
