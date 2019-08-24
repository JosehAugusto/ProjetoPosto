import {
  GET_POSTOS,
  ADD_POSTO,
  UPDATE_POSTO,
  DELETE_POSTO,
  SET_CURRENT_POSTO,
  CLEAR_CURRENT_POSTO,
  SEARCH_POSTOS,
  CLEAR_SEARCHED_POSTOS,
  POSTO_ERROR
} from '../actions/types';

const initialState = {
  postos: null,
  current_posto: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTOS:
      return {
        ...state,
        postos: action.payload
      };
    case ADD_POSTO:
      return {
        ...state,
        postos: [...state.postos, action.payload]
      };
    case POSTO_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
