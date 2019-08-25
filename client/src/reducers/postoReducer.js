import {
  GET_POSTOS,
  ADD_POSTO,
  UPDATE_POSTO,
  DELETE_POSTO,
  SET_CURRENT_POSTO,
  CLEAR_CURRENT_POSTO,
  SEARCH_POSTOS,
  CLEAR_SEARCHED_POSTOS,
  POSTO_ERROR,
  SET_CURRENT_DAY_AVGS
} from '../actions/types';

const initialState = {
  postos: null,
  current_posto: null,
  searched_postos: null,
  current_posto: null,
  current_avg: {comun: 4, aditivada: 5, alcool: 2, diesel: 3, gnv: 2, etanol: 6}
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
    case DELETE_POSTO:
      return {
        ...state,
        postos: state.postos.filter(
          posto => posto._id !== action.payload
        ),
        searched_postos: null
      };
    case POSTO_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    case SEARCH_POSTOS:
      return {
        ...state,
        searched_postos: state.postos.filter(posto => posto.name.toLowerCase().includes(action.payload.toLowerCase()) || posto.address.toLowerCase().includes(action.payload.toLowerCase()))
      };
    case UPDATE_POSTO:
      return {
        ...state,
        postos: state.postos.map(posto =>
          posto._id === action.payload._id ? action.payload : posto
        ),
        current_posto: null,
        searched_postos: null
      };
    case CLEAR_SEARCHED_POSTOS:
      return {
        ...state,
        searched_postos: null
      };
    case SET_CURRENT_POSTO:
      return {
        ...state,
        current_posto: action.payload
      };
    case CLEAR_CURRENT_POSTO:
      return {
        ...state,
        current_posto: null
      };
    case SET_CURRENT_DAY_AVGS:
      return {
        ...state,
        current_avg: action.payload
      };
    default:
      return state;
  }
};
