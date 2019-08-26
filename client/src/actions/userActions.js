import {
  ADD_USER,
  USER_ERROR,
  GET_USER,
  LOG_USER,
  LOGIN_ERROR
} from './types';

import axios from 'axios';

// Add new User
export const addUser = user => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/users', user, config);
    dispatch({
      type: ADD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.response.msg
    });
  }
};

// log a User
export const logUser = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/auth', {
      email: email,
      password: password
    }, config);

    dispatch({
      type: LOG_USER,
      payload: res.data
    });
  } catch (err) {
    
    dispatch({
      type: LOGIN_ERROR,
      payload: err.response.msg
    });
  }
};

// Get a User info
export const getUser = (user_token) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': user_token
    }
  };

  try {
    const res = await axios.get('/api/auth', config);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
      payload: err.response.msg
    });
  }
};