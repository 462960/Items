import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { RESET_STORE } from 'constants/index';

const initialState = Immutable.fromJS({
  loading: false,
  itemStatuses: [],
});

export const GET_ITEM_STATUSES = 'itemStatusesList/GET_ITEM_STATUSES';
export const [GET_ITEM_STATUSES_SUCCESS, GET_ITEM_STATUSES_FAILURE] = [
  `${GET_ITEM_STATUSES}_SUCCESS`,
  `${GET_ITEM_STATUSES}_FAILURE`,
];

export const getItemStatuses = (promise?: IPromiseCallback): IAction => ({
  promise,
  type: GET_ITEM_STATUSES,
});

export default handleActions(
  {
    [GET_ITEM_STATUSES]: (state) => {
      return state.set('loading', true);
    },
    [GET_ITEM_STATUSES_SUCCESS]: (state, action) => {
      return state
        .set('loading', false)
        .set('itemStatuses', Immutable.fromJS(action.payload));
    },
    [GET_ITEM_STATUSES_FAILURE]: (state) => {
      return state.set('loading', false);
    },

    [RESET_STORE]: () => {
      return initialState;
    },
  },
  initialState
);
