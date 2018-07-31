import { put, takeLatest, call } from 'redux-saga/effects';
import { FORM_ERROR } from 'final-form';
import fetchFromAPI, { getDefaultHeaders } from 'helpers/fetchFromAPI';
import decodeJWT from 'helpers/decodeJWT';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RECOVERY_PASSWORD,
  RECOVERY_PASSWORD_SUCCESS,
  RECOVERY_PASSWORD_FAILURE,
} from './reducer';
import { SET_JWT_DATA } from 'reducers/profile/reducer';

function* login(action: IAction) {
  const { payload, promise } = action;
  try {
    const value = yield call(fetchFromAPI, {
      data: payload,
      headers: getDefaultHeaders(),
      method: 'POST',
      partUrl: '/login',
    });
    if (!value || !value.error) {
      localStorage.setItem('token', value.token);
      localStorage.setItem('refresh_token', value.refresh_token);
      yield put({ type: SET_JWT_DATA, payload: decodeJWT(value.token) });
      yield put({ type: LOGIN_SUCCESS });
      yield call(promise.resolve);
    } else {
      yield put({ type: LOGIN_FAILURE, error: value.errorString });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: value.errorString,
        errorString: value.errorString,
      });
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, error: error.toString() });
    yield call(promise.resolve, {
      error: true,
      [FORM_ERROR]: error.toString(),
      errorString: error.toString(),
    });
  }
}

function* forgotPassword(action: IAction) {
  const { payload, promise } = action;
  try {
    const value = yield call(fetchFromAPI, {
      data: payload,
      headers: getDefaultHeaders(),
      method: 'POST',
      partUrl: '/users/password/forgot',
    });
    if (!value || !value.error) {
      yield put({ type: FORGOT_PASSWORD_SUCCESS });
      yield call(promise.resolve);
    } else {
      yield put({ type: FORGOT_PASSWORD_FAILURE, error: value.errorString });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: value.errorString,
        errorString: value.errorString,
      });
    }
  } catch (error) {
    yield put({ type: FORGOT_PASSWORD_FAILURE, error: error.toString() });
    yield call(promise.resolve, {
      error: true,
      [FORM_ERROR]: error.toString(),
      errorString: error.toString(),
    });
  }
}

function* recoveryPassword(action: IAction) {
  const { payload, promise } = action;
  try {
    const value = yield call(fetchFromAPI, {
      data: payload,
      headers: getDefaultHeaders(),
      method: 'POST',
      partUrl: '/users/password/reset',
    });
    if (!value || !value.error) {
      yield put({ type: RECOVERY_PASSWORD_SUCCESS });
      yield call(promise.resolve);
    } else {
      yield put({ type: RECOVERY_PASSWORD_FAILURE, error: value.errorString });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: value.errorString,
        errorString: value.errorString,
      });
    }
  } catch (error) {
    yield put({ type: RECOVERY_PASSWORD_FAILURE, error: error.toString() });
    yield call(promise.resolve, {
      error: true,
      [FORM_ERROR]: error.toString(),
      errorString: error.toString(),
    });
  }
}

function* mySaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(RECOVERY_PASSWORD, recoveryPassword);
}

export default mySaga;
