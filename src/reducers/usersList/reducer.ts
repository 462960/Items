import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = Immutable.fromJS({
  loading: false,
  users: {
    code: null,
    data: [],
  },
});

export const FETCH_USERS = 'usersList/FETCH_USERS';
export const [FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE] = [
  `${FETCH_USERS}_SUCCESS`,
  `${FETCH_USERS}_FAILURE`,
];

export const fetchUsers = (payload, promise: IPromiseCallback): IAction => ({
  payload,
  promise,
  type: FETCH_USERS,
});

const users = handleActions(
  {
    [FETCH_USERS]: (state) => {
      return state.set('loading', true);
    },
    [FETCH_USERS_SUCCESS]: (state, action) => {
      return state
        .set('loading', false)
        .set('users', Immutable.Map(action.payload));
    },
    [FETCH_USERS_FAILURE]: (state) => {
      return state.set('loading', false);
    },
  },
  initialState
);

export default users;
