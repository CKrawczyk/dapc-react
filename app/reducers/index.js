import {combineReducers} from 'redux';
import info from './infoReducers';
import utility from './utilityReducers';

export const dapcApp = combineReducers({
  info,
  utility
});
