import { put, takeLatest, call, select } from 'redux-saga/effects';
import uuid from 'uuid/v4';
import toQuery from 'helpers/toQuery';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';
import {
  getDefaultAutorizedHeaders,
  getPagination,
  generateTypicalSaga,
} from 'helpers/fetchFromAPI';
import { DEFAULT_PER_PAGE } from 'constants/index';

import {
  CREATE_COLLABORATOR_SUCCESS,
  UPDATE_COLLABORATOR_SUCCESS,
  DELETE_COLLABORATOR_SUCCESS,
} from 'reducers/collaborators/collaborator/reducer';
import {
  BULK_CHANGE_LOCATION_SUCCESS,
  BULK_DELETE_COLLABORATORS_SUCCESS,
} from 'reducers/collaborators/collaborators/reducer';
import {
  GET_COLLABORATORS,
  GET_COLLABORATORS_FAILURE,
  GET_COLLABORATORS_SUCCESS,
  GET_COLUMNS,
  GET_COLUMNS_FAILURE,
  GET_COLUMNS_SUCCESS,
  UPDATE_COLUMNS,
  UPDATE_COLUMNS_SUCCESS,
  UPDATE_COLUMNS_FAILURE,
} from './reducer';
import { optionsSelector } from './selectors';

function* getCollaborators(action: IAction) {
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
      partUrl: `/locations/${payload.id}/collaborators?${toQuery(queryArgs)}`,
    },
    function*(res) {
      if (isEmpty(res.data) && get(res, 'meta.count', 0) > 0) {
        // case when some user delete collaborators, and fetched page are empty
        const perPage = payload.perPage || DEFAULT_PER_PAGE;
        yield put({
          type: GET_COLLABORATORS,
          payload: {
            ...payload,
            perPage,
            page: Math.ceil(res.meta.count / perPage),
          },
        });
      } else {
        yield put({
          type: GET_COLLABORATORS_SUCCESS,
          options: payload,
          payload: res.data,
          meta: res.meta,
        });
        if (promise) yield call(promise.resolve);
      }
    },
    function*(res) {
      const error = res.errorString || res.toString();

      yield put({ error, type: GET_COLLABORATORS_FAILURE });
      if (promise)
        yield call(promise.resolve, { error: true, errorString: error });
    }
  );
}

function* refetchCollaborators() {
  if (!location.pathname.match(/locations\/[^/]+\/collaborators/i)) return;
  const payload = yield select(optionsSelector);
  yield put({ payload, type: GET_COLLABORATORS });
}

function* getColumns(action: IAction) {
  const { promise } = action;

  yield generateTypicalSaga(
    {
      headers: getDefaultAutorizedHeaders(),
      partUrl: `/columns?route=/locations/${uuid()}/collaborators`,
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
        route: `/locations/${uuid()}/collaborators`,
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
  yield takeLatest(GET_COLLABORATORS, getCollaborators);
  yield takeLatest(GET_COLUMNS, getColumns);
  yield takeLatest(UPDATE_COLUMNS, updateColumns);
  yield takeLatest(CREATE_COLLABORATOR_SUCCESS, refetchCollaborators);
  yield takeLatest(UPDATE_COLLABORATOR_SUCCESS, refetchCollaborators);
  yield takeLatest(DELETE_COLLABORATOR_SUCCESS, refetchCollaborators);
  yield takeLatest(BULK_CHANGE_LOCATION_SUCCESS, refetchCollaborators);
  yield takeLatest(BULK_DELETE_COLLABORATORS_SUCCESS, refetchCollaborators);
}

export default mySaga;
