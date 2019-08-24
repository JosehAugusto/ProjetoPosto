import { combineReducers } from 'redux';
import postoReducer from './postoReducer';

export default combineReducers({
  posto: postoReducer
});