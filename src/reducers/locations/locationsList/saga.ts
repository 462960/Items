import { takeLatest, call, put } from 'redux-saga/effects';
import fetchFromAPI, { getDefaultAutorizedHeaders } from 'helpers/fetchFromAPI';
import {
  GET_LOCATIONS,
  GET_LOCATIONS_FAILURE,
  GET_LOCATIONS_SUCCESS,
} from 'reducers/locations/locationsList/reducer';
import {
  ADD_LOCATION_SUCCESS,
  EDIT_LOCATION_SUCCESS,
} from 'reducers/locations/location/reducer';

function* getLocations(action: IAction) {
  const { promise } = action;
  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      partUrl: '/locations',
    });
    if (!value || !value.error) {
      yield put({ type: GET_LOCATIONS_SUCCESS, payload: value.data });
      if (promise) yield call(promise.resolve);
    } else {
      yield put({ type: GET_LOCATIONS_FAILURE, error: value.errorString });
      yield call(promise.resolve, {
        error: true,
        errorString: value.errorString,
      });
    }
  } catch (error) {
    yield put({ type: GET_LOCATIONS_FAILURE, error: error.errorString });
    yield call(promise.resolve, {
      error: true,
      errorString: error.errorString,
    });
  }
}

function* refetchLocations() {
  if (location.pathname !== '/structure/locations') return;
  yield put({ type: GET_LOCATIONS });
}

function* mySaga() {
  yield takeLatest(GET_LOCATIONS, getLocations);
  yield takeLatest(ADD_LOCATION_SUCCESS, refetchLocations);
  yield takeLatest(EDIT_LOCATION_SUCCESS, refetchLocations);
}

export default mySaga;
