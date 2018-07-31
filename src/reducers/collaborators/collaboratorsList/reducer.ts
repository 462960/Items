import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { RESET_STORE } from 'constants/index';

const initialState = Immutable.fromJS({
  loading: false,
  collaborators: [],
});

export const GET_COLLABORATORS = 'collaboratorsList/GET_COLLABORATORS';
export const [GET_COLLABORATORS_SUCCESS, GET_COLLABORATORS_FAILURE] = [
  `${GET_COLLABORATORS}_SUCCESS`,
  `${GET_COLLABORATORS}_FAILURE`,
];

export const getCollaborators = (promise?: IPromiseCallback): IAction => ({
  promise,
  type: GET_COLLABORATORS,
});

export default handleActions(
  {
    [GET_COLLABORATORS]: (state) => {
      return state.set('loading', true);
    },
    [GET_COLLABORATORS_SUCCESS]: (state, action) => {
      return state
        .set('loading', false)
        .set('collaborators', Immutable.fromJS(action.payload));
    },
    [GET_COLLABORATORS_FAILURE]: (state) => {
      return state.set('loading', false);
    },

    [RESET_STORE]: () => {
      return initialState;
    },
  },
  initialState
);
