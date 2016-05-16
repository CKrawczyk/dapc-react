import {combineReducers} from 'redux';
import info from './infoReducers';
import utility from './utilityReducers';
import health from './healthReducers';
import statValues from './statsReducers';
import weaponGroups from './weaponGroupsReducers';
import weapons from './weaponsReducers';

export const dapcApp = combineReducers({
  info,
  utility,
  health,
  statValues,
  weapon_groups: weaponGroups,
  weapons
});
