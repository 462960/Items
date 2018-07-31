import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { RESET_STORE, DEFAULT_PER_PAGE } from 'constants/index';
import pickBy from 'lodash.pickby';
import isNil from 'lodash.isnil';

/* global API_URL */

function* fetchFromAPI(payload) {
  try {
    const res = yield call(axios, `${API_URL}${payload.partUrl}`, payload);
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
    return {};
  } catch (error) {
    if (!error.response) {
      return {
        error: true,
        errorString: error.toString(),
      };
    }
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      yield put({ type: RESET_STORE });
    }
    return {
      error: true,
      status: error.response.status,
      ...error.response.data,
      errorString: stringifyResponseError(error.response),
    };
  }
}

export const getDefaultHeaders = (customHeaders = {}) => {
  return {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
};

export const getDefaultAutorizedHeaders = (customHeaders = {}) => {
  return {
    Authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json',
    ...customHeaders,
  };
};

export const toFormData = (data) => {
  const formData = new FormData();
  const filteredData = pickBy(data, (a) => !isNil(a));
  Object.keys(filteredData).forEach((field) => {
    const value = data[field];

    if (Array.isArray(value)) {
      value.forEach((valuePart) => {
        formData.append(`${field}[]`, valuePart);
      });
    } else {
      formData.append(field, value);
    }
  });

  return formData;
};

const stringifyResponseError = (res) => {
  if (res.data.errors) return res.data.errors.join(', ');
  return res.data.message;
};

export function* generateTypicalSaga(
  fetchOptions: IFetchOptions,
  onSuccess,
  onFail
) {
  try {
    const value = yield call(fetchFromAPI, fetchOptions);
    if (!value || !value.error) {
      yield onSuccess(value);
    } else {
      yield onFail(value);
    }
  } catch (error) {
    yield onFail(error);
  }
}

export const getPagination = ({ page = 1, perPage = DEFAULT_PER_PAGE }) => {
  return {
    limit: perPage,
    offset: perPage * (page - 1),
  };
};

export default fetchFromAPI;
