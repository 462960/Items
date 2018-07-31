import { takeLatest, call, put } from 'redux-saga/effects';
import { FORM_ERROR } from 'final-form';
import fetchFromAPI, {
  getDefaultAutorizedHeaders,
  toFormData,
} from 'helpers/fetchFromAPI';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAILURE,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
} from 'reducers/items/item/reducer';

function* createItem(action: IAction) {
  const { payload, promise, requestOptions } = action;

  try {
    const value = yield call(fetchFromAPI, {
      data: toFormData(payload),
      headers: getDefaultAutorizedHeaders({
        'Content-Type': 'multipart/form-data',
      }),
      method: 'POST',
      partUrl: '/items',
      ...requestOptions,
    });
    if (!value || !value.error) {
      yield call(promise.resolve);
      yield put({ type: CREATE_ITEM_SUCCESS });
    } else {
      yield put({ error: value.errorString, type: CREATE_ITEM_FAILURE });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: value.errorString,
        errorString: value.errorString,
      });
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    yield put({ error: error.toString(), type: CREATE_ITEM_FAILURE });
    console.error(error.errorString); // tslint:disable-line no-console
    yield call(promise.resolve, {
      error: true,
      [FORM_ERROR]: error.toString(),
      errorString: error.toString(),
    });
  }
}

function* updateItem(action: IAction) {
  const { payload, promise, requestOptions } = action;

  try {
    const value = yield call(fetchFromAPI, {
      data: toFormData(payload),
      headers: getDefaultAutorizedHeaders({
        'Content-Type': 'multipart/form-data',
        'X-HTTP-METHOD-OVERRIDE': 'PUT',
      }),
      method: 'POST',
      partUrl: `/items/${payload.public_id}`,
      ...requestOptions,
    });
    if (!value || !value.error) {
      yield put({ type: UPDATE_ITEM_SUCCESS });
      yield call(promise.resolve);
    } else {
      yield put({ error: value.errorString, type: UPDATE_ITEM_FAILURE });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: value.errorString,
        errorString: value.errorString,
      });
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    yield put({ error: error.toString(), type: UPDATE_ITEM_FAILURE });
    console.error(error.errorString); // tslint:disable-line no-console
    yield call(promise.resolve, {
      error: true,
      [FORM_ERROR]: error.toString(),
      errorString: error.toString(),
    });
  }
}

function* deleteItem(action: IAction) {
  const { promise, id } = action;

  try {
    const value = yield call(fetchFromAPI, {
      headers: getDefaultAutorizedHeaders(),
      method: 'DELETE',
      partUrl: `/items/${id}`,
    });
    if (!value || !value.error) {
      yield put({ type: DELETE_ITEM_SUCCESS });
      yield call(promise.resolve);
    } else {
      yield put({ error: value.errorString, type: DELETE_ITEM_FAILURE });
      yield call(promise.resolve, {
        error: true,
        errorString: value.errorString,
      });
      console.error(value.errorString); // tslint:disable-line no-console
    }
  } catch (error) {
    yield put({ error: error.toString(), type: DELETE_ITEM_FAILURE });
    console.error(error.errorString); // tslint:disable-line no-console
    yield call(promise.resolve, {
      error: true,
      errorString: error.toString(),
    });
  }
}

function* mySaga() {
  yield takeLatest(CREATE_ITEM, createItem);
  yield takeLatest(UPDATE_ITEM, updateItem);
  yield takeLatest(DELETE_ITEM, deleteItem);
}

export default mySaga;
