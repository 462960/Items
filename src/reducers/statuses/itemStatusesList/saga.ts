import { takeLatest, call, put } from 'redux-saga/effects';
import fetchFromAPI, { getDefaultAutorizedHeaders } from 'helpers/fetchFromAPI';
import {
  GET_ITEM_STATUSES,
  GET_ITEM_STATUSES_FAILURE,
  GET_ITEM_STATUSES_SUCCESS,
} from 'reducers/statuses/itemStatusesList/reducer';

function* getItemStatuses(action: IAction) {
  const { promise } = action;
  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      partUrl: '/items/statuses',
    });
    if (!value || !value.error) {
      yield put({ type: GET_ITEM_STATUSES_SUCCESS, payload: value.data });
      if (promise) yield call(promise.resolve, value.data);
    } else {
      yield put({ type: GET_ITEM_STATUSES_FAILURE, error: value.errorString });
      if (promise) {
        yield call(promise.reject, {
          error: true,
          errorString: value.errorString,
        });
      }
    }
  } catch (error) {
    yield put({ type: GET_ITEM_STATUSES_FAILURE, error: error.errorString });
    if (promise) {
      yield call(promise.reject, {
        error: true,
        errorString: error.errorString,
      });
    }
  }
}

function* mySaga() {
  yield takeLatest(GET_ITEM_STATUSES, getItemStatuses);
}

export default mySaga;
