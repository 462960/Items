import { takeLatest, call, put } from 'redux-saga/effects';
import fetchFromAPI, { getDefaultAutorizedHeaders } from 'helpers/fetchFromAPI';
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from 'reducers/usersList/reducer';

function* getUsers() {
  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      method: 'GET',
      partUrl: '/users',
    });
    if (!value || !value.error) {
      yield put({ type: FETCH_USERS_SUCCESS, payload: value });
    } else {
      yield put({ type: FETCH_USERS_FAILURE, error: value.errorString });
    }
  } catch (error) {
    yield put({ type: FETCH_USERS_FAILURE, error: error.errorString });
  }
}

function* mySaga() {
  yield takeLatest(FETCH_USERS, getUsers);
}

export default mySaga;
