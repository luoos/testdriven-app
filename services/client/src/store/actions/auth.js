import * as actionTypes from './actionTypes';
import axios from '../../axios-users';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authToken: token,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const auth = (email, password, isSignup, username) => {
  return dispatch => {
    dispatch(authStart());
    let data = {
      email: email,
      password: password
    }
    let url = '/api/v1/auth/login'
    if (isSignup) {
      data.username = username;
      url = '/api/v1/auth/register'
    }
    axios.post(url, data)
      .then((res => {
        console.log(res.data);
        dispatch(authSuccess(res.data.auth_token, res.data.user_id))
        localStorage.setItem('authToken', res.data.auth_token);
        localStorage.setItem('userId', res.data.user_id);
      }))
      .catch(err => console.log(err))
  }
}

export const authCheckState = () => {
  return dispatch => {
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (!authToken) {
      dispatch(authLogout());
    } else {
      // TODO: check expiration
      dispatch(authSuccess(authToken, userId));
    }
  }
}