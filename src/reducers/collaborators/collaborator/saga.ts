import { takeLatest, call, put } from 'redux-saga/effects';
import fetchFromAPI, {
  getDefaultAutorizedHeaders,
  generateTypicalSaga,
} from 'helpers/fetchFromAPI';
import {
  CREATE_COLLABORATOR,
  CREATE_COLLABORATOR_FAILURE,
  CREATE_COLLABORATOR_SUCCESS,
  GET_COLLABORATOR,
  GET_COLLABORATOR_SUCCESS,
  GET_COLLABORATOR_FAILURE,
  UPDATE_COLLABORATOR,
  UPDATE_COLLABORATOR_FAILURE,
  UPDATE_COLLABORATOR_SUCCESS,
  DELETE_COLLABORATOR,
  DELETE_COLLABORATOR_FAILURE,
  DELETE_COLLABORATOR_SUCCESS,
} from 'reducers/collaborators/collaborator/reducer';
import { FORM_ERROR } from 'final-form';

function* createCollaborator(action: IAction) {
  const { payload, promise } = action;

  try {
    const value = yield call(fetchFromAPI, {
      data: payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'POST',
      partUrl: '/collaborators',
    });
    if (!value || !value.error) {
      yield put({ type: CREATE_COLLABORATOR_SUCCESS });
      if (promise) yield call(promise.resolve);
    } else {
      console.error(value.errorString); // tslint:disable-line no-console
      yield put({
        error: value.errorString,
        type: CREATE_COLLABORATOR_FAILURE,
      });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: value.errorString,
        errorString: value.errorString,
      });
    }
  } catch (error) {
    console.error(error.errorString); // tslint:disable-line no-console
    yield put({ error: error.toString(), type: CREATE_COLLABORATOR_FAILURE });
    yield call(promise.resolve, {
      error: true,
      [FORM_ERROR]: error.errorString,
      errorString: error.errorString,
    });
  }
}

function* getCollaborator(action: IAction) {
  const { payload, promise } = action;

  yield generateTypicalSaga(
    {
      headers: getDefaultAutorizedHeaders(),
      partUrl: `/collaborators/${payload}`,
    },
    function*(res) {
      yield put({ type: GET_COLLABORATOR_SUCCESS, payload: res.data });
      if (promise) yield call(promise.resolve);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: GET_COLLABORATOR_FAILURE });
      if (promise)
        yield call(promise.resolve, { error: true, errorString: error });
    }
  );
}

function* updateCollaborator(action: IAction) {
  const { payload, promise } = action;

  try {
    const value = yield call(fetchFromAPI, {
      data: payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'PUT',
      partUrl: `/collaborators/${payload.public_id}`,
    });
    if (!value || !value.error) {
      yield put({ type: UPDATE_COLLABORATOR_SUCCESS });
      yield put({ type: GET_COLLABORATOR, payload: payload.public_id });
      yield call(promise.resolve);
    } else {
      yield put({
        error: value.errorString,
        type: UPDATE_COLLABORATOR_FAILURE,
      });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: value.errorString,
        errorString: value.errorString,
      });
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    yield put({ error: error.toString(), type: UPDATE_COLLABORATOR_FAILURE });
    console.error(error.errorString); // tslint:disable-line no-console
    yield call(promise.resolve, {
      error: true,
      [FORM_ERROR]: error.toString(),
      errorString: error.toString(),
    });
  }
}

function* deleteCollaborator(action: IAction) {
  const { promise, id } = action;

  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      method: 'DELETE',
      partUrl: `/collaborators/${id}`,
    });
    if (!value || !value.error) {
      yield put({ type: DELETE_COLLABORATOR_SUCCESS });
      yield call(promise.resolve);
    } else {
      yield put({
        error: value.errorString,
        type: DELETE_COLLABORATOR_FAILURE,
      });
      yield call(promise.resolve, {
        error: true,
        errorString: value.errorString,
      });
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    yield put({ error: error.toString(), type: DELETE_COLLABORATOR_FAILURE });
    console.error(error.errorString); // tslint:disable-line no-console
    yield call(promise.resolve, {
      error: true,
      errorString: error.toString(),
    });
  }
}

function* mySaga() {
  yield takeLatest(CREATE_COLLABORATOR, createCollaborator);
  yield takeLatest(GET_COLLABORATOR, getCollaborator);
  yield takeLatest(UPDATE_COLLABORATOR, updateCollaborator);
  yield takeLatest(DELETE_COLLABORATOR, deleteCollaborator);
}

export default mySaga;
