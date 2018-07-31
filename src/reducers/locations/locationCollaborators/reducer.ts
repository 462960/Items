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
      name: 'department',
      order: 1,
    },
    {
      name: 'position',
      order: 2,
    },
    {
      name: 'phone_number',
      order: 3,
    },
    {
      name: 'items_count',
      order: 4,
    },
  ],
  all_column_names: [
    'public_id',
    'name',
    'position',
    'phone_number',
    'email',
    'birthday',
    'location',
    'items_count',
  ],
};

const initialState = Immutable.fromJS({
  collaborators: [],
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

export const GET_COLLABORATORS = 'locationCollaborators/GET_COLLABORATORS';
export const [GET_COLLABORATORS_SUCCESS, GET_COLLABORATORS_FAILURE] = [
  `${GET_COLLABORATORS}_SUCCESS`,
  `${GET_COLLABORATORS}_FAILURE`,
];

export const GET_COLUMNS = 'locationCollaborators/GET_COLUMNS';
export const [GET_COLUMNS_SUCCESS, GET_COLUMNS_FAILURE] = [
  `${GET_COLUMNS}_SUCCESS`,
  `${GET_COLUMNS}_FAILURE`,
];

export const UPDATE_COLUMNS = 'locationCollaborators/UPDATE_COLUMNS';
export const [UPDATE_COLUMNS_SUCCESS, UPDATE_COLUMNS_FAILURE] = [
  `${UPDATE_COLUMNS}_SUCCESS`,
  `${UPDATE_COLUMNS}_FAILURE`,
];

export const getCollaborators = (
  payload: IGetOptions,
  promise?: IPromiseCallback
): IAction => ({
  promise,
  payload,
  type: GET_COLLABORATORS,
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
    [GET_COLLABORATORS_SUCCESS]: (state, action: any) => {
      return state
        .set('options', Immutable.Map(action.options))
        .set('collaborators', Immutable.List(action.payload))
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
