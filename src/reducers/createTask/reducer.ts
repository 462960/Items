import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = Immutable.fromJS({
  loading: false,
  inventories: {
    code: null,
    data: [],
  },
});

export const CREATE_TASK = 'createTask/CREATE_TASK';
export const FETCH_INVENTORIES = 'createTask/FETCH_INVENTORIES';
export const [FETCH_INVENTORIES_SUCCESS, FETCH_INVENTORIES_FAILURE] = [
  `${FETCH_INVENTORIES}_SUCCESS`,
  `${FETCH_INVENTORIES}_FAILURE`,
];

export const createTask = (payload: any, promise: IPromiseCallback) => ({
  payload,
  promise,
  type: CREATE_TASK,
});

export const fetchInventories = (
  payload,
  promise: IPromiseCallback
): IAction => ({
  payload,
  promise,
  type: FETCH_INVENTORIES,
});

const inventories = handleActions(
  {
    [FETCH_INVENTORIES]: (state) => {
      return state.set('loading', true);
    },
    [FETCH_INVENTORIES_SUCCESS]: (state, action) => {
      return state
        .set('loading', false)
        .set('inventories', Immutable.Map(action.payload));
    },
    [FETCH_INVENTORIES_FAILURE]: (state) => {
      return state.set('loading', false);
    },
  },
  initialState
);

export default inventories;
