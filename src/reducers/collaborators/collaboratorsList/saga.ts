import { takeLatest, call, put } from 'redux-saga/effects';
import fetchFromAPI, { getDefaultAutorizedHeaders } from 'helpers/fetchFromAPI';
import {
  GET_COLLABORATORS,
  GET_COLLABORATORS_FAILURE,
  GET_COLLABORATORS_SUCCESS,
} from 'reducers/collaborators/collaboratorsList/reducer';

function* getCollaborators() {
  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      partUrl: '/collaborators',
    });
    if (!value || !value.error) {
      yield put({ type: GET_COLLABORATORS_SUCCESS, payload: value.data });
    } else {
      yield put({ type: GET_COLLABORATORS_FAILURE, error: value.errorString });
    }
  } catch (error) {
    yield put({ type: GET_COLLABORATORS_FAILURE, error: error.errorString });
  }
}

function* mySaga() {
  yield takeLatest(GET_COLLABORATORS, getCollaborators);
}

export default mySaga;
