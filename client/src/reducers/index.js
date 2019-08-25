import { combineReducers } from 'redux';
import postoReducer from './postoReducer';
import userReducer from './userReducer';

export default combineReducers({
  posto: postoReducer,
  user: userReducer
});