import {combineReducers} from 'redux';
import info from './infoReducers';
import utility from './utilityReducers';
import health from './healthReducers';
import statValues from './statsReducers';

export const dapcApp = combineReducers({
  info,
  utility,
  health,
  statValues
});
