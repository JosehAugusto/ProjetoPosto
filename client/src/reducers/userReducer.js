import {
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
    USER_ERROR,
    GET_USER,
    LOG_USER,
    LOGIN_ERROR
  } from '../actions/types';

  const initialState = {
    user: null,
    login_token: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case LOG_USER:
        return {
          ...state,
          login_token: action.payload
        };
        case GET_USER:
        return {
          ...state,
          user: action.payload
        };
      case ADD_USER:
        return {
          ...state,
          login_token: [...state.login_token, action.payload]
        };
      case USER_ERROR:
        console.error(action.payload);
        return {
          ...state,
          user_error: action.payload
        };
      case LOGIN_ERROR:
        console.error(action.payload);
        return {
          ...state,
          login_error: action.payload
        };
      default:
        return state;
    }
  };