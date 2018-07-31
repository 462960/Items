import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = Immutable.fromJS({
  loading: false,
  tasksStatuses: {
    code: null,
    data: [],
  },
});

export const FETCH_TASKS_STATUSES = 'tasksStatusesList/FETCH_TASKS_STATUSES';
export const [FETCH_TASKS_STATUSES_SUCCESS, FETCH_TASKS_STATUSES_FAILURE] = [
  `${FETCH_TASKS_STATUSES}_SUCCESS`,
  `${FETCH_TASKS_STATUSES}_FAILURE`,
];

export const fetchTasksStatuses = (
  payload,
  promise: IPromiseCallback
): IAction => ({
  payload,
  promise,
  type: FETCH_TASKS_STATUSES,
});

const tasksStatuses = handleActions(
  {
    [FETCH_TASKS_STATUSES]: (state) => {
      return state.set('loading', true);
    },
    [FETCH_TASKS_STATUSES_SUCCESS]: (state, action) => {
      return state
        .set('loading', false)
        .set('tasksStatuses', Immutable.Map(action.payload));
    },
    [FETCH_TASKS_STATUSES_FAILURE]: (state) => {
      return state.set('loading', false);
    },
  },
  initialState
);

export default tasksStatuses;
