import { put, takeLatest, call, select } from 'redux-saga/effects';
import toQuery from 'helpers/toQuery';
import uuid from 'uuid/v4';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';
import {
  getDefaultAutorizedHeaders,
  getPagination,
  generateTypicalSaga,
} from 'helpers/fetchFromAPI';
import { DEFAULT_PER_PAGE } from 'constants/index';

import {
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
} from 'reducers/items/item/reducer';
import {
  BULK_DELETE_ITEMS_SUCCESS,
  BULK_CHANGE_COLLABORATORS_SUCCESS,
  BULK_CHANGE_LOCATION_SUCCESS,
  BULK_CHANGE_STATUS_SUCCESS,
} from 'reducers/items/items/reducer';
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
      partUrl: `/collaborators/${payload.id}/items?${toQuery(queryArgs)}`,
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
  if (!location.pathname.match(/collaborators\/[^/]+$/i)) return;
  const payload = yield select(optionsSelector);
  yield put({ payload, type: GET_ITEMS });
}

function* getColumns(action: IAction) {
  const { promise } = action;

  yield generateTypicalSaga(
    {
      headers: getDefaultAutorizedHeaders(),
      partUrl: `/columns?route=/collaborators/${uuid()}/items`,
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
        route: `/collaborators/${uuid()}/items`,
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

function* mySaga() {
  yield takeLatest(GET_ITEMS, getItems);
  yield takeLatest(GET_COLUMNS, getColumns);
  yield takeLatest(UPDATE_COLUMNS, updateColumns);
  yield takeLatest(CREATE_ITEM_SUCCESS, refetchItems);
  yield takeLatest(UPDATE_ITEM_SUCCESS, refetchItems);
  yield takeLatest(DELETE_ITEM_SUCCESS, refetchItems);
  yield takeLatest(BULK_CHANGE_COLLABORATORS_SUCCESS, refetchItems);
  yield takeLatest(BULK_CHANGE_LOCATION_SUCCESS, refetchItems);
  yield takeLatest(BULK_CHANGE_STATUS_SUCCESS, refetchItems);
  yield takeLatest(BULK_DELETE_ITEMS_SUCCESS, refetchItems);
}

export default mySaga;
