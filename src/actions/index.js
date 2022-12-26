import { decrypt, encrypt } from '../utils/passwordEncryption';
import {
  getDataFromJson,
  setDataToJson,
  getOrgById,
  getEventById,
} from '../services';
import Cookies from 'js-cookie';
import history from '../history';

// *********** login action ********* //

export const loginData = (loginData) => async (dispatch) => {
  const { data } = await getDataFromJson('loginCredentials/');

  const decrypted = await decrypt(data.password);
  let payload;

  if (
    loginData.userName === data.userName &&
    loginData.password === decrypted
  ) {
    payload = true;
    Cookies.set('login', true);
  } else {
    payload = false;
  }
  dispatch({
    type: 'IS_LOGIN',
    payload,
  });
  if (payload === true) {
    return history.push('dashboard/');
  } else {
    alert('INVALID login credentials');
  }
};

export const logout = () => (dispatch) => {
  Cookies.remove('login');
  dispatch({
    type: 'LOGOUT',
    payload: null,
  });
  history.push('/');
};

// ******** Change password ******** //
export const passwordChange = (details) => async (dispatch) => {
  const { data } = await getDataFromJson('/loginCredentials');
  const decrypted = await decrypt(data.password);
  if (decrypted === details.oldPswd) {
    let encryptPswd = encrypt(details.newPswd);
    let userName = data.userName;
    const query = setDataToJson('/loginCredentials', {
      userName,
      password: encryptPswd,
    });
    console.log({ userName, encryptPswd });
  } else {
    alert('Current Password is wrong');
  }
  history.push('/dashboard');
};

//====== Organisation Actions =====//
// *********** getOrganisation details ********* //
export const getOrgDetails = (payload) => async (dispatch) => {
  const { data } = await getDataFromJson('/organisation', payload);
  dispatch({
    type: 'GET_ORGANISATION',
    payload: data,
  });
};
//  ********** getOrg data by id ********** //
export const getOrgDataByid = (id) => async (dispatch) => {
  const { data } = await getOrgById(id);
  dispatch({
    type: 'GET_ORGANISATION_BY_ID',
    payload: data,
  });
};

//====== Event Actions =====//
// ******** getEvent Details ********* //
export const getEventDetails = (payload) => async (dispatch) => {
  const { data } = await getDataFromJson('/event', payload);
  console.log(data);
  dispatch({
    type: 'GET_EVENTS',
    payload: data,
  });
};
// ******* get event details by id ********//
export const getEventDataByid = (id) => async (dispatch) => {
  const { data } = await getEventById(id);
  dispatch({
    type: 'GET_EVENT_BY_ID',
    payload: data,
  });
};

//****** get invities *******/
export const getInvities = (payload) => async (dispatch) => {
  const { data } = await getDataFromJson('/invities', payload);
  console.log(data);
  dispatch({
    type: 'GET_INVITIES',
    payload: data,
  });
};
