import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { RESET_STORE } from 'constants/index';

const initialState = Immutable.fromJS({
  loading: false,
  profile: {
    code: null,
    data: {
      // fullname: 'John Doe',
      // location: 'Kharkov',
      // phone: '2131231',
      // position: 'Developer',
      // timezone: '(GMT-04:00)Eastern Time',
      // date_format: 'dd/mm/yy',
      // photo_url: '',
      //      photo_url: 'http://inventory.com/1f4t148851msd82.jpg',
      // system_notifications: true,
      // push_notifications: true,
      // newsletter: true,
      // company_name: 'Jelvix',
      //     Should be added
      // isThemeDark: true,
      // user_group: 'Admin',
      // registered: '19/05/2016',
      // last_update: '09/08/2018',
    },
  },
  jwtData: {},
});

// Fetch profile
export const FETCH_PROFILE = 'profile/FETCH_PROFILE';
export const [FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE] = [
  `${FETCH_PROFILE}_SUCCESS`,
  `${FETCH_PROFILE}_FAILURE`,
];
// Update profile
export const UPDATE_PROFILE = 'profile/UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_PROFILE_SUCCESS';
// Update photo
export const UPDATE_PHOTO = 'profile/UPDATE_PHOTO';
export const UPDATE_PHOTO_SUCCESS = 'profile/UPDATE_PHOTO_SUCCESS';
// Delete photo
export const DELETE_PHOTO = 'profile/DELETE_PHOTO';
// Update email
export const UPDATE_EMAIL = 'profile/UPDATE_EMAIL';
export const UPDATE_EMAIL_SUCCESS = 'profile/UPDATE_EMAIL_SUCCESS';
// Update password
export const UPDATE_PASSWORD = 'profile/UPDATE_PASSWORD';
export const UPDATE_PASSWORD_SUCCESS = 'profile/UPDATE_PASSWORD_SUCCESS';

export const REFRESH_TOKEN = 'profile/REFRESH_TOKEN';

export const SET_JWT_DATA = 'profile/SET_JWT_DATA';

export const LOGOUT = 'profile/LOGOUT';

export const fetchProfile = (payload, promise: IPromiseCallback): IAction => ({
  payload,
  promise,
  type: FETCH_PROFILE,
});

export const updateProfile = (payload, promise: IPromiseCallback): IAction => ({
  payload,
  promise,
  type: UPDATE_PROFILE,
});

export const updatePhoto = (payload, promise: IPromiseCallback): IAction => ({
  payload,
  promise,
  type: UPDATE_PHOTO,
});

export const deletePhoto = (promise: IPromiseCallback): IAction => ({
  promise,
  type: DELETE_PHOTO,
});

export const updateEmail = (payload, promise: IPromiseCallback): IAction => ({
  payload,
  promise,
  type: UPDATE_EMAIL,
});

export const updatePassword = (
  payload,
  promise: IPromiseCallback
): IAction => ({
  payload,
  promise,
  type: UPDATE_PASSWORD,
});

export const refreshToken = (): IAction => ({
  type: REFRESH_TOKEN,
});

export const setJWTData = (data): IAction => ({
  type: SET_JWT_DATA,
  payload: data,
});

export const logout = (): IAction => ({
  type: LOGOUT,
});

const profile = handleActions(
  {
    [FETCH_PROFILE]: (state) => {
      return state.set('loading', true);
    },
    [FETCH_PROFILE_SUCCESS]: (state, action) => {
      return state
        .set('loading', false)
        .set('profile', Immutable.Map(action.payload));
    },
    [FETCH_PROFILE_FAILURE]: (state) => {
      return state.set('loading', false);
    },

    [SET_JWT_DATA]: (state, action) => {
      return state.set('jwtData', Immutable.Map(action.payload));
    },

    [LOGOUT]: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      return initialState;
    },

    [RESET_STORE]: () => {
      return initialState;
    },
  },
  initialState
);

export default profile;
