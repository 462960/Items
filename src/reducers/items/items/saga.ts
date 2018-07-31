import { put, takeLatest, call, select } from 'redux-saga/effects';
import { FORM_ERROR } from 'final-form';
import toQuery from 'helpers/toQuery';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';
import {
  getDefaultAutorizedHeaders,
  getPagination,
  generateTypicalSaga,
  toFormData,
} from 'helpers/fetchFromAPI';
import { DEFAULT_PER_PAGE } from 'constants/index';

import {
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
} from 'reducers/items/item/reducer';
import {
  GET_ITEMS,
  GET_ITEMS_FAILURE,
  GET_ITEMS_SUCCESS,
  GET_COLUMNS,
  GET_COLUMNS_FAILURE,
  GET_COLUMNS_SUCCESS,
  UPDATE_COLUMNS,
  UPDATE_COLUMNS_SUCCESS,
  UPDATE_COLUMNS_FAILURE,
  BULK_DELETE_ITEMS,
  BULK_DELETE_ITEMS_FAILURE,
  BULK_DELETE_ITEMS_SUCCESS,
  BULK_CHANGE_COLLABORATORS,
  BULK_CHANGE_COLLABORATORS_FAILURE,
  BULK_CHANGE_COLLABORATORS_SUCCESS,
  BULK_CHANGE_LOCATION,
  BULK_CHANGE_LOCATION_FAILURE,
  BULK_CHANGE_LOCATION_SUCCESS,
  BULK_CHANGE_STATUS,
  BULK_CHANGE_STATUS_FAILURE,
  BULK_CHANGE_STATUS_SUCCESS,
  EXPORT_ALL_ITEMS,
  EXPORT_ALL_ITEMS_SUCCESS,
  EXPORT_ALL_ITEMS_FAILURE,
  EXPORT_PART_ITEMS,
  EXPORT_PART_ITEMS_SUCCESS,
  EXPORT_PART_ITEMS_FAILURE,
  IMPORT_ITEMS,
  IMPORT_ITEMS_SUCCESS,
  IMPORT_ITEMS_FAILURE,
} from './reducer';
import { optionsSelector } from './selectors';

function* getItems(action: IAction) {
  const { payload, promise } = action;
  const queryArgs = {
    ...payload,
    ...getPagination(payload),
    sort_field: payload.sort.field,
    sort_order: payload.sort.order,
    sort: undefined,
  };

  yield generateTypicalSaga(
    {
      headers: getDefaultAutorizedHeaders(),
      partUrl: `/items?${toQuery(queryArgs)}`,
    },
    function*(res) {
      if (isEmpty(res.data) && get(res, 'meta.count', 0) > 0) {
        // case when some user delete items, and fetched page are empty
        const perPage = payload.perPage || DEFAULT_PER_PAGE;
        yield put({
          type: GET_ITEMS,
          payload: {
            ...payload,
            perPage,
            page: Math.ceil(res.meta.count / perPage),
          },
        });
      } else {
        yield put({
          type: GET_ITEMS_SUCCESS,
          options: payload,
          payload: res.data,
          meta: res.meta,
        });
        if (promise) yield call(promise.resolve);
      }
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: GET_ITEMS_FAILURE });
      if (promise)
        yield call(promise.resolve, { error: true, errorString: error });
    }
  );
}

function* refetchItems() {
  if (location.pathname !== '/items') return;
  const payload = yield select(optionsSelector);
  yield put({ payload, type: GET_ITEMS });
}

function* getColumns(action: IAction) {
  const { promise } = action;

  yield generateTypicalSaga(
    {
      headers: getDefaultAutorizedHeaders(),
      partUrl: '/columns?route=/items',
    },
    function*(res) {
      yield put({ type: GET_COLUMNS_SUCCESS, payload: res.data });
      yield call(promise.resolve);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: GET_COLUMNS_FAILURE });
      yield call(promise.resolve, {
        error: true,
        errorString: error,
      });
    }
  );
}

function* updateColumns(action: IAction) {
  const { payload, promise } = action;

  yield generateTypicalSaga(
    {
      data: {
        route: '/items',
        selected_columns: payload,
      },
      headers: getDefaultAutorizedHeaders(),
      method: 'PUT',
      partUrl: '/columns',
    },
    function*(res) {
      yield put({ type: UPDATE_COLUMNS_SUCCESS, payload: res.data });
      if (promise) yield call(promise.resolve);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ type: UPDATE_COLUMNS_FAILURE });
      if (promise) {
        yield call(promise.resolve, { error: true, errorString: error });
      }
    }
  );
}

function* bulkChangeCollaborators(action: IAction) {
  const { payload, promise } = action;

  yield generateTypicalSaga(
    {
      data: payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'PATCH',
      partUrl: '/items/bulkchange/collaborator',
    },
    function*(res) {
      yield put({ type: BULK_CHANGE_COLLABORATORS_SUCCESS, payload: res.data });
      yield call(promise.resolve);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: BULK_CHANGE_COLLABORATORS_FAILURE });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: error,
        errorString: error,
      });
    }
  );
}

function* bulkChangeLocation(action: IAction) {
  const { payload, promise } = action;

  yield generateTypicalSaga(
    {
      data: payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'PATCH',
      partUrl: '/items/bulkchange/location',
    },
    function*(res) {
      yield put({ type: BULK_CHANGE_LOCATION_SUCCESS, payload: res.data });
      yield call(promise.resolve);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: BULK_CHANGE_LOCATION_FAILURE });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: error,
        errorString: error,
      });
    }
  );
}

function* bulkChangeStatus(action: IAction) {
  const { payload, promise } = action;

  yield generateTypicalSaga(
    {
      data: payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'PATCH',
      partUrl: '/items/bulkchange/status',
    },
    function*(res) {
      yield put({ type: BULK_CHANGE_STATUS_SUCCESS, payload: res.data });
      yield call(promise.resolve);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: BULK_CHANGE_STATUS_FAILURE });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: error,
        errorString: error,
      });
    }
  );
}

function* bulkDeleteItems(action: IAction) {
  const { payload, promise } = action;

  yield generateTypicalSaga(
    {
      data: payload,
      headers: getDefaultAutorizedHeaders(),
      method: 'DELETE',
      partUrl: '/items/bulkdelete',
    },
    function*(res) {
      yield put({ type: BULK_DELETE_ITEMS_SUCCESS, payload: res.data });
      yield call(promise.resolve);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: BULK_DELETE_ITEMS_FAILURE });
      yield call(promise.resolve, {
        error: true,
        [FORM_ERROR]: error,
        errorString: error,
      });
    }
  );
}

function* exportAllItems(action: IAction) {
  const { promise } = action;
  const options = yield select(optionsSelector);
  const queryArgs = {
    status: options.status,
    limit: 999999,
  };

  yield generateTypicalSaga(
    {
      headers: getDefaultAutorizedHeaders(),
      partUrl: `/items.csv?${toQuery(queryArgs)}`,
    },
    function*(res) {
      yield put({
        type: EXPORT_ALL_ITEMS_SUCCESS,
        payload: res,
      });
      if (promise) yield call(promise.resolve, res);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: EXPORT_ALL_ITEMS_FAILURE });
      if (promise)
        yield call(promise.resolve, {
          error: true,
          errorString: error,
        });
    }
  );
}

function* exportPartItems(action: IAction) {
  const { payload, promise } = action;
  const queryArgs = {
    public_ids: payload,
  };

  yield generateTypicalSaga(
    {
      headers: getDefaultAutorizedHeaders(),
      partUrl: `/items/byids.csv?${toQuery(queryArgs)}`,
    },
    function*(res) {
      yield put({
        type: EXPORT_PART_ITEMS_SUCCESS,
        payload: res,
      });
      if (promise) yield call(promise.resolve, res);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: EXPORT_PART_ITEMS_FAILURE });
      if (promise)
        yield call(promise.resolve, {
          error: true,
          errorString: error,
        });
    }
  );
}

function* importItems(action: IAction) {
  const { payload, promise, requestOptions } = action;

  yield generateTypicalSaga(
    {
      headers: getDefaultAutorizedHeaders({
        'Content-Type': 'multipart/form-data',
      }),
      data: toFormData(payload),
      method: 'POST',
      partUrl: `/items/import`,
      ...requestOptions,
    },
    function*(res) {
      yield put({
        type: IMPORT_ITEMS_SUCCESS,
        payload: res,
      });
      if (promise) yield call(promise.resolve, res);
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: IMPORT_ITEMS_FAILURE });
      if (promise)
        yield call(promise.resolve, { error: true, errorString: error });
    }
  );
}

function* mySaga() {
  yield takeLatest(GET_ITEMS, getItems);
  yield takeLatest(GET_COLUMNS, getColumns);
  yield takeLatest(UPDATE_COLUMNS, updateColumns);
  yield takeLatest(BULK_CHANGE_COLLABORATORS, bulkChangeCollaborators);
  yield takeLatest(BULK_CHANGE_LOCATION, bulkChangeLocation);
  yield takeLatest(BULK_CHANGE_STATUS, bulkChangeStatus);
  yield takeLatest(BULK_DELETE_ITEMS, bulkDeleteItems);
  yield takeLatest(CREATE_ITEM_SUCCESS, refetchItems);
  yield takeLatest(UPDATE_ITEM_SUCCESS, refetchItems);
  yield takeLatest(DELETE_ITEM_SUCCESS, refetchItems);
  yield takeLatest(BULK_CHANGE_COLLABORATORS_SUCCESS, refetchItems);
  yield takeLatest(BULK_CHANGE_LOCATION_SUCCESS, refetchItems);
  yield takeLatest(BULK_CHANGE_STATUS_SUCCESS, refetchItems);
  yield takeLatest(BULK_DELETE_ITEMS_SUCCESS, refetchItems);
  yield takeLatest(EXPORT_ALL_ITEMS, exportAllItems);
  yield takeLatest(EXPORT_PART_ITEMS, exportPartItems);
  yield takeLatest(IMPORT_ITEMS, importItems);
}

export default mySaga;
