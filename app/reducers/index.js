import {combineReducers} from 'redux';
import info from './infoReducers';
import utility from './utilityReducers';
import health from './healthReducers';

export const dapcApp = combineReducers({
  info,
  utility,
  health
});
