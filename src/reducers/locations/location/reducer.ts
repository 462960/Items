import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { RESET_STORE } from 'constants/index';
import get from 'lodash.get';
import { GET_ITEMS_SUCCESS } from 'reducers/locations/locationItems/reducer';
import { GET_COLLABORATORS_SUCCESS } from 'reducers/locations/locationCollaborators/reducer';

const initialState = Immutable.fromJS({
  location_collaborators: [],
  location: {},
});

export const ADD_LOCATION = 'location/ADD_LOCATION';
export const [ADD_LOCATION_SUCCESS, ADD_LOCATION_FAILURE] = [
  `${ADD_LOCATION}_SUCCESS`,
  `${ADD_LOCATION}_FAILURE`,
];

export const GET_LOCATION = 'location/GET_LOCATION';
export const [GET_LOCATION_SUCCESS, GET_LOCATION_FAILURE] = [
  `${GET_LOCATION}_SUCCESS`,
  `${GET_LOCATION}_FAILURE`,
];

export const EDIT_LOCATION = 'location/EDIT_LOCATION';
export const [EDIT_LOCATION_SUCCESS, EDIT_LOCATION_FAILURE] = [
  `${EDIT_LOCATION}_SUCCESS`,
  `${EDIT_LOCATION}_FAILURE`,
];

export const GET_LOCATION_COLLABORATORS = 'location/GET_LOCATION_COLLABORATORS';
export const [
  GET_LOCATION_COLLABORATORS_SUCCESS,
  GET_LOCATION_COLLABORATORS_FAILURE,
] = [
  `${GET_LOCATION_COLLABORATORS}_SUCCESS`,
  `${GET_LOCATION_COLLABORATORS}_FAILURE`,
];

export const addLocation = (
  payload: ILocationData,
  promise?: IPromiseCallback
) => ({
  payload,
  promise,
  type: ADD_LOCATION,
});

export const getLocation = (id: string, promise?: IPromiseCallback) => ({
  promise,
  payload: id,
  type: GET_LOCATION,
});

export const editLocation = (
  payload: ILocationData,
  promise?: IPromiseCallback
) => ({
  payload,
  promise,
  type: EDIT_LOCATION,
});

export const getLocationCollaborators = (
  id: string,
  promise?: IPromiseCallback
) => ({
  id,
  promise,
  type: GET_LOCATION_COLLABORATORS,
});

export default handleActions(
  {
    [GET_LOCATION_COLLABORATORS_SUCCESS]: (state, action) => {
      return state.set(
        'location_collaborators',
        Immutable.fromJS(action.payload)
      );
    },

    [GET_LOCATION_SUCCESS]: (state, action) => {
      return state.set('location', Immutable.fromJS(action.payload));
    },

    [GET_ITEMS_SUCCESS]: (state, action: IAction) => {
      return state.setIn(
        ['location', 'items_count'],
        get(action, 'meta.count', 0)
      );
    },

    [GET_COLLABORATORS_SUCCESS]: (state, action: IAction) => {
      return state.setIn(
        ['location', 'collaborators_count'],
        get(action, 'meta.count', 0)
      );
    },

    [RESET_STORE]: () => {
      return initialState;
    },
  },
  initialState
);
