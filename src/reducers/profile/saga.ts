import { put, takeLatest, call } from 'redux-saga/effects';
import fetchFromAPI, {
  getDefaultAutorizedHeaders,
  toFormData,
} from 'helpers/fetchFromAPI';
import {
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PHOTO,
  UPDATE_PHOTO_SUCCESS,
  DELETE_PHOTO,
  UPDATE_EMAIL,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
} from 'reducers/profile/reducer';

function* updateProfile(action) {
  try {
    const value = yield call(fetchFromAPI, {
      data: action.payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'PUT',
      partUrl: '/users/profile',
    });
    if (!value || !value.error) {
      yield put({ type: UPDATE_PROFILE_SUCCESS, payload: value });
      yield put({ type: FETCH_PROFILE });
    } else {
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    console.error(error.errorString); // tslint:disable-line no-console
  }
}

function* updatePhoto(action) {
  try {
    const value = yield call(fetchFromAPI, {
      data: toFormData({ photo: action.payload }),
      headers: getDefaultAutorizedHeaders({
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      }),
      method: 'POST',
      partUrl: '/users/profile/photo',
    });
    if (!value || !value.error) {
      yield put({ type: UPDATE_PHOTO_SUCCESS, payload: value });
    } else {
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    console.error(error.errorString); // tslint:disable-line no-console
  }
}

function* deletePhoto() {
  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      method: 'DELETE',
      partUrl: '/users/profile/photo',
    });
    if (!value || !value.error) {
      // yield put({ type: DELETE_PHOTO });
    } else {
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    console.error(error.errorString); // tslint:disable-line no-console
  }
}

function* updateEmail(action) {
  try {
    const value = yield call(fetchFromAPI, {
      data: action.payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'PUT',
      partUrl: '/users/email/change',
    });
    if (!value || !value.error) {
      yield put({ type: UPDATE_EMAIL_SUCCESS, payload: value });
    } else {
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    console.error(error.errorString); // tslint:disable-line no-console
  }
}

function* updatePassword(action) {
  try {
    const value = yield call(fetchFromAPI, {
      data: action.payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'PUT',
      partUrl: '/users/password/change',
    });
    if (!value || !value.error) {
      yield put({ type: UPDATE_PASSWORD_SUCCESS, payload: value });
    } else {
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    console.error(error.errorString); // tslint:disable-line no-console
  }
}

function* getUserProfile() {
  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      partUrl: '/users/profile',
    });
    if (!value || !value.error) {
      yield put({ type: FETCH_PROFILE_SUCCESS, payload: value });
    } else {
      yield put({ type: FETCH_PROFILE_FAILURE, error: value.errorString });
    }
  } catch (error) {
    yield put({ type: FETCH_PROFILE_FAILURE, error: error.errorString });
  }
}

function* mySaga() {
  yield takeLatest(UPDATE_PROFILE, updateProfile);
  yield takeLatest(UPDATE_PHOTO, updatePhoto);
  yield takeLatest(DELETE_PHOTO, deletePhoto);
  yield takeLatest(UPDATE_EMAIL, updateEmail);
  yield takeLatest(UPDATE_PASSWORD, updatePassword);
  yield takeLatest(FETCH_PROFILE, getUserProfile);
}

export default mySaga;
