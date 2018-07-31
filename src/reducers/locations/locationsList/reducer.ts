import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { RESET_STORE } from 'constants/index';

const initialState = Immutable.fromJS({
  loading: false,
  locations: [],
});

export const GET_LOCATIONS = 'locationsList/GET_LOCATIONS';
export const [GET_LOCATIONS_SUCCESS, GET_LOCATIONS_FAILURE] = [
  `${GET_LOCATIONS}_SUCCESS`,
  `${GET_LOCATIONS}_FAILURE`,
];

export const getLocations = (promise?: IPromiseCallback): IAction => ({
  promise,
  type: GET_LOCATIONS,
});

export default handleActions(
  {
    [GET_LOCATIONS]: (state) => {
      return state.set('loading', true);
    },
    [GET_LOCATIONS_SUCCESS]: (state, action) => {
      return state
        .set('loading', false)
        .set('locations', Immutable.fromJS(action.payload));
    },
    [GET_LOCATIONS_FAILURE]: (state) => {
      return state.set('loading', false);
    },

    [RESET_STORE]: () => {
      return initialState;
    },
  },
  initialState
);
