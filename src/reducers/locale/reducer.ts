import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = Immutable.fromJS({
  defaultLang: 'en',
  lang: localStorage.getItem('lang'),
});

export const CHANGE_LANG = 'locale/CHANGE_LANG';

export const changeLang = (lang): IAction => {
  localStorage.setItem('lang', lang);

  return {
    payload: lang,
    type: CHANGE_LANG,
  };
};

export default handleActions(
  {
    [CHANGE_LANG]: (state, action) => {
      return state.set('lang', action.payload);
    },
  },
  initialState
);
