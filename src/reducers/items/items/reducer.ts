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
    page: 1,
    perPage: DEFAULT_PER_PAGE,
    search: null,
    sort: {
      order: '',
      field: '',
    },
  },
});

export const GET_ITEMS = 'items/GET_ITEMS';
export const [GET_ITEMS_SUCCESS, GET_ITEMS_FAILURE] = [
  `${GET_ITEMS}_SUCCESS`,
  `${GET_ITEMS}_FAILURE`,
];

export const EXPORT_ALL_ITEMS = 'items/EXPORT_ALL_ITEMS';
export const [EXPORT_ALL_ITEMS_SUCCESS, EXPORT_ALL_ITEMS_FAILURE] = [
  `${EXPORT_ALL_ITEMS}_SUCCESS`,
  `${EXPORT_ALL_ITEMS}_FAILURE`,
];

export const EXPORT_PART_ITEMS = 'items/EXPORT_PART_ITEMS';
export const [EXPORT_PART_ITEMS_SUCCESS, EXPORT_PART_ITEMS_FAILURE] = [
  `${EXPORT_PART_ITEMS}_SUCCESS`,
  `${EXPORT_PART_ITEMS}_FAILURE`,
];

export const IMPORT_ITEMS = 'items/IMPORT_ITEMS';
export const [IMPORT_ITEMS_SUCCESS, IMPORT_ITEMS_FAILURE] = [
  `${IMPORT_ITEMS}_SUCCESS`,
  `${IMPORT_ITEMS}_FAILURE`,
];

export const BULK_CHANGE_COLLABORATORS = 'items/BULK_CHANGE_COLLABORATORS';
export const [
  BULK_CHANGE_COLLABORATORS_SUCCESS,
  BULK_CHANGE_COLLABORATORS_FAILURE,
] = [
  `${BULK_CHANGE_COLLABORATORS}_SUCCESS`,
  `${BULK_CHANGE_COLLABORATORS}_FAILURE`,
];

export const BULK_DELETE_ITEMS = 'items/BULK_DELETE_ITEMS';
export const [BULK_DELETE_ITEMS_SUCCESS, BULK_DELETE_ITEMS_FAILURE] = [
  `${BULK_DELETE_ITEMS}_SUCCESS`,
  `${BULK_DELETE_ITEMS}_FAILURE`,
];

export const BULK_CHANGE_STATUS = 'items/BULK_CHANGE_STATUS';
export const [BULK_CHANGE_STATUS_SUCCESS, BULK_CHANGE_STATUS_FAILURE] = [
  `${BULK_CHANGE_STATUS}_SUCCESS`,
  `${BULK_CHANGE_STATUS}_FAILURE`,
];

export const BULK_CHANGE_LOCATION = 'items/BULK_CHANGE_LOCATION';
export const [BULK_CHANGE_LOCATION_SUCCESS, BULK_CHANGE_LOCATION_FAILURE] = [
  `${BULK_CHANGE_LOCATION}_SUCCESS`,
  `${BULK_CHANGE_LOCATION}_FAILURE`,
];

export const GET_COLUMNS = 'items/GET_COLUMNS';
export const [GET_COLUMNS_SUCCESS, GET_COLUMNS_FAILURE] = [
  `${GET_COLUMNS}_SUCCESS`,
  `${GET_COLUMNS}_FAILURE`,
];

export const UPDATE_COLUMNS = 'items/UPDATE_COLUMNS';
export const [UPDATE_COLUMNS_SUCCESS, UPDATE_COLUMNS_FAILURE] = [
  `${UPDATE_COLUMNS}_SUCCESS`,
  `${UPDATE_COLUMNS}_FAILURE`,
];

export const getItems = (
  payload: IGetItemOptions,
  promise?: IPromiseCallback
): IAction => ({
  promise,
  payload,
  type: GET_ITEMS,
});

export const exportAllItems = (promise?: IPromiseCallback): IAction => ({
  promise,
  type: EXPORT_ALL_ITEMS,
});

export const exportPartItems = (
  ids: string[],
  promise?: IPromiseCallback
): IAction => ({
  promise,
  payload: ids,
  type: EXPORT_PART_ITEMS,
});

export const importItems = (
  payload: any,
  requestOptions: object,
  promise?: IPromiseCallback
): IAction => ({
  promise,
  payload,
  requestOptions,
  type: IMPORT_ITEMS,
});

export const bulkChangeCollaborators = (
  data: IBulkChangeCollaborator,
  promise: IPromiseCallback
): IAction => ({
  promise,
  payload: data,
  type: BULK_CHANGE_COLLABORATORS,
});

export const bulkDeleteItems = (
  data: IBulkChange,
  promise: IPromiseCallback
): IAction => ({
  promise,
  payload: data,
  type: BULK_DELETE_ITEMS,
});

export const bulkChangeLocation = (
  data: IBulkChangeLocation,
  promise: IPromiseCallback
): IAction => ({
  promise,
  payload: data,
  type: BULK_CHANGE_LOCATION,
});

export const bulkChangeStatus = (
  data: IBulkChangeStatus,
  promise: IPromiseCallback
): IAction => ({
  promise,
  payload: data,
  type: BULK_CHANGE_STATUS,
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
