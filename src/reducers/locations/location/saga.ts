import { takeLatest, call, put } from 'redux-saga/effects';
import fetchFromAPI, {
  getDefaultAutorizedHeaders,
  generateTypicalSaga,
} from 'helpers/fetchFromAPI';
import { FORM_ERROR } from 'final-form';
import {
  ADD_LOCATION,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAILURE,
  EDIT_LOCATION,
  EDIT_LOCATION_SUCCESS,
  EDIT_LOCATION_FAILURE,
  GET_LOCATION,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  GET_LOCATION_COLLABORATORS,
  GET_LOCATION_COLLABORATORS_FAILURE,
  GET_LOCATION_COLLABORATORS_SUCCESS,
} from 'reducers/locations/location/reducer';

function* createLocation(action: IAction) {
  const { payload, promise } = action;

  try {
    const value = yield call(fetchFromAPI, {
      data: payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'POST',
      partUrl: '/locations',
    });
    if (!value || !value.error) {
      yield put({ type: ADD_LOCATION_SUCCESS });
      if (promise) yield call(promise.resolve);
    } else {
      yield put({ type: ADD_LOCATION_FAILURE, error: value.errorString });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: value.errorString,
        errorString: value.errorString,
      });
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    yield put({ type: ADD_LOCATION_FAILURE, error: error.errorString });
    yield call(promise.resolve, {
      error: true,
      [FORM_ERROR]: error.errorString,
      errorString: error.errorString,
    });
    console.error(error.errorString); // tslint:disable-line no-console
  }
}

function* getLocation(action: IAction) {
  const { payload, promise } = action;

  yield generateTypicalSaga(
    {
      headers: getDefaultAutorizedHeaders(),
      partUrl: `/locations/${payload}`,
    },
    function*(res) {
      yield put({ type: GET_LOCATION_SUCCESS, payload: res.data });
      if (promise) yield call(promise.resolve);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: GET_LOCATION_FAILURE });
      if (promise)
        yield call(promise.resolve, { error: true, errorString: error });
    }
  );
}

function* editLocation(action: IAction) {
  const { payload, promise } = action;

  try {
    const value = yield call(fetchFromAPI, {
      data: payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'PATCH',
      partUrl: `/locations/${payload.public_id}`,
    });
    if (!value || !value.error) {
      yield put({ type: EDIT_LOCATION_SUCCESS });
      if (promise) yield call(promise.resolve);
    } else {
      yield put({ type: EDIT_LOCATION_FAILURE, error: value.errorString });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: value.errorString,
        errorString: value.errorString,
      });
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    yield put({ type: EDIT_LOCATION_FAILURE, error: error.errorString });
    yield call(promise.resolve, {
      error: true,
      [FORM_ERROR]: error.errorString,
      errorString: error.errorString,
    });
    console.error(error.errorString); // tslint:disable-line no-console
  }
}

function* getLocationCollaborators(action: IAction) {
  const { id, promise } = action;

  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      partUrl: `/locations/${id}/collaborators`,
    });
    if (!value || !value.error) {
      yield put({
        type: GET_LOCATION_COLLABORATORS_SUCCESS,
        payload: value.data,
      });
      if (promise) yield call(promise.resolve);
    } else {
      yield put({
        type: GET_LOCATION_COLLABORATORS_FAILURE,
        error: value.errorString,
      });
      if (promise) {
        yield call(promise.resolve, {
          error: true,
          [FORM_ERROR]: value.errorString,
          errorString: value.errorString,
        });
      }
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    yield put({
      type: GET_LOCATION_COLLABORATORS_FAILURE,
      error: error.errorString,
    });
    if (promise) {
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: error.errorString,
        errorString: error.errorString,
      });
    }
    console.error(error.errorString); // tslint:disable-line no-console
  }
}

function* mySaga() {
  yield takeLatest(ADD_LOCATION, createLocation);
  yield takeLatest(EDIT_LOCATION, editLocation);
  yield takeLatest(GET_LOCATION, getLocation);
  yield takeLatest(GET_LOCATION_COLLABORATORS, getLocationCollaborators);
}

export default mySaga;
