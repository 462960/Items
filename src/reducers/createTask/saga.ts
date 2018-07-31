import { takeLatest, call, put } from 'redux-saga/effects';
import fetchFromAPI, { getDefaultAutorizedHeaders } from 'helpers/fetchFromAPI';
import {
  CREATE_TASK,
  FETCH_INVENTORIES,
  FETCH_INVENTORIES_SUCCESS,
  FETCH_INVENTORIES_FAILURE,
} from 'reducers/createTask/reducer';

function* createItem(action: IAction) {
  const { payload } = action;

  try {
    const value = yield call(fetchFromAPI, {
      data: payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'POST',
      partUrl: '/tasks',
    });
    if (!value || value.error) {
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    console.error(error.errorString); // tslint:disable-line no-console
  }
}

function* getInventories() {
  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      method: 'GET',
      partUrl: '/inventories',
    });
    if (!value || !value.error) {
      yield put({ type: FETCH_INVENTORIES_SUCCESS, payload: value });
    } else {
      yield put({ type: FETCH_INVENTORIES_FAILURE, error: value.errorString });
    }
  } catch (error) {
    yield put({ type: FETCH_INVENTORIES_FAILURE, error: error.errorString });
  }
}

function* mySaga() {
  yield takeLatest(CREATE_TASK, createItem);
  yield takeLatest(FETCH_INVENTORIES, getInventories);
}

export default mySaga;
