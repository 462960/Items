import { takeLatest, call, put } from 'redux-saga/effects';
import fetchFromAPI, { getDefaultAutorizedHeaders } from 'helpers/fetchFromAPI';
import {
  FETCH_TASKS_STATUSES,
  FETCH_TASKS_STATUSES_SUCCESS,
  FETCH_TASKS_STATUSES_FAILURE,
} from 'reducers/statuses/tasksStatusesList/reducer';

function* getTasksStatuses() {
  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      method: 'GET',
      partUrl: '/tasks/statuses',
    });
    if (!value || !value.error) {
      yield put({ type: FETCH_TASKS_STATUSES_SUCCESS, payload: value });
    } else {
      yield put({
        type: FETCH_TASKS_STATUSES_FAILURE,
        error: value.errorString,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_TASKS_STATUSES_FAILURE, error: error.errorString });
  }
}

function* mySaga() {
  yield takeLatest(FETCH_TASKS_STATUSES, getTasksStatuses);
}

export default mySaga;
