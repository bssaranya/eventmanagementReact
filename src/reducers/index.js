import { combineReducers } from 'redux';
import Cookies from 'js-cookie';

const initialState = {
  islogin: Cookies.get('login') ? Cookies.get('login') : null,
  orgData: [],
  eventData: [],
  editEventDatas: [],
  editOrgDatas: [],
  invities: [],
};

// ======= oauth reducer part ========//
const oauthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'IS_LOGIN':
      return {
        ...state,
        islogin: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        islogin: action.payload,
      };
    default:
      return state;
  }
};

// ===== form reducers part ======//
const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORGANISATION':
      return {
        ...state,
        orgData: action.payload,
      };
    case 'GET_ORGANISATION_BY_ID':
      return {
        ...state,
        editOrgDatas: action.payload,
      };
    case 'GET_EVENTS':
      return {
        ...state,
        eventData: action.payload,
      };
    case 'GET_EVENT_BY_ID':
      return {
        ...state,
        editEventDatas: action.payload,
      };
    case 'GET_INVITIES':
      return {
        ...state,
        invities: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  oauthReducer,
  formReducer,
});
