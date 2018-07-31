import Immutable from 'immutable';
import { handleActions, combineActions } from 'redux-actions';
import { RESET_STORE } from 'constants/index';

const initialState = Immutable.fromJS({
  loading: false,
});

export const LOGIN = 'auth/LOGIN';
export const [LOGIN_SUCCESS, LOGIN_FAILURE] = [
  `${LOGIN}_SUCCESS`,
  `${LOGIN}_FAILURE`,
];

export const FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD';
export const [FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE] = [
  `${FORGOT_PASSWORD}_SUCCESS`,
  `${FORGOT_PASSWORD}_FAILURE`,
];

export const RECOVERY_PASSWORD = 'auth/RECOVERY_PASSWORD';
export const [RECOVERY_PASSWORD_SUCCESS, RECOVERY_PASSWORD_FAILURE] = [
  `${RECOVERY_PASSWORD}_SUCCESS`,
  `${RECOVERY_PASSWORD}_FAILURE`,
];

export const login = (data, promise: IPromiseCallback): IAction => ({
  promise,
  payload: data,
  type: LOGIN,
});

export const forgotPassword = (data, promise: IPromiseCallback): IAction => ({
  promise,
  payload: data,
  type: FORGOT_PASSWORD,
});

export const recoveryPassword = (data, promise: IPromiseCallback): IAction => ({
  promise,
  payload: data,
  type: RECOVERY_PASSWORD,
});

export default handleActions(
  {
    [combineActions(LOGIN, RECOVERY_PASSWORD, FORGOT_PASSWORD) as any]: (
      state
    ) => {
      return state.set('loading', true);
    },
    [combineActions(
      LOGIN_FAILURE,
      RECOVERY_PASSWORD_FAILURE,
      FORGOT_PASSWORD_FAILURE,
      LOGIN_SUCCESS,
      RECOVERY_PASSWORD_SUCCESS,
      FORGOT_PASSWORD_SUCCESS
    ) as any]: (state) => {
      return state.set('loading', false);
    },

    [RESET_STORE]: () => {
      return initialState;
    },
  },
  initialState
);
