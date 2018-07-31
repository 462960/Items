import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { RESET_STORE, DEFAULT_PER_PAGE } from 'constants/index';

const defaultColumns: ITableColumnStack = {
  selected_columns: [
    {
      name: 'name',
      order: 0,
    },
    {
      name: 'barcode',
      order: 1,
    },
    {
      name: 'serial_number',
      order: 2,
    },
    {
      name: 'count',
      order: 3,
    },
    {
      name: 'updated_at',
      order: 4,
    },
    {
      name: 'status',
      order: 5,
    },
    {
      name: 'location',
      order: 6,
    },
    {
      name: 'collaborator',
      order: 7,
    },
  ],
  all_column_names: [
    'public_id',
    'name',
    'description',
    'barcode',
    'serial_number',
    'count',
    'created_at',
    'updated_at',
    'comment',
    'status',
    'location',
    'collaborator',
    'updated_by',
    'photos',
  ],
};

const initialState = Immutable.fromJS({
  items: [],
  columns: defaultColumns,
  meta: {
    count: 0,
  },
  options: {
    id: null,
    page: 1,
    perPage: DEFAULT_PER_PAGE,
    search: null,
    sort: {
      order: '',
      field: '',
    },
  },
});

export const GET_ITEMS = 'locationItems/GET_ITEMS';
export const [GET_ITEMS_SUCCESS, GET_ITEMS_FAILURE] = [
  `${GET_ITEMS}_SUCCESS`,
  `${GET_ITEMS}_FAILURE`,
];

export const GET_COLUMNS = 'locationItems/GET_COLUMNS';
export const [GET_COLUMNS_SUCCESS, GET_COLUMNS_FAILURE] = [
  `${GET_COLUMNS}_SUCCESS`,
  `${GET_COLUMNS}_FAILURE`,
];

export const UPDATE_COLUMNS = 'locationItems/UPDATE_COLUMNS';
export const [UPDATE_COLUMNS_SUCCESS, UPDATE_COLUMNS_FAILURE] = [
  `${UPDATE_COLUMNS}_SUCCESS`,
  `${UPDATE_COLUMNS}_FAILURE`,
];

export const getItems = (
  payload: IGetOptions,
  promise?: IPromiseCallback
): IAction => ({
  promise,
  payload,
  type: GET_ITEMS,
});

export const getColumns = (promise: IPromiseCallback): IAction => ({
  promise,
  type: GET_COLUMNS,
});

export const updateColumns = (
  payload: ITableColumn[],
  promise?: IPromiseCallback
): IAction => ({
  promise,
  payload,
  type: UPDATE_COLUMNS,
});

export default handleActions(
  {
    [GET_ITEMS_SUCCESS]: (state, action: any) => {
      return state
        .set('options', Immutable.Map(action.options))
        .set('items', Immutable.List(action.payload))
        .set('meta', Immutable.Map(action.meta));
    },

    [UPDATE_COLUMNS]: (state, action) => {
      return state.setIn(
        ['columns', 'selected_columns'],
        Immutable.List(action.payload)
      );
    },

    [GET_COLUMNS_SUCCESS]: (state, action) => {
      return state.set('columns', Immutable.fromJS(action.payload));
    },

    [RESET_STORE]: () => {
      return initialState;
    },
  },
  initialState
);
