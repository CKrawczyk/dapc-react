import {combineReducers} from 'redux';
import * as actionTypes from '../constants';
import {info} from './infoReducers';
import {utility} from './utilityReducers';
import {health} from './healthReducers';
import {statValues} from './statsReducers';
import {weaponGroups} from './weaponGroupsReducers';
import {weapons} from './weaponsReducers';
import {money} from './moneyReducers';
import {language} from './languageReducers';
import {equipment} from './equipmentReducers';
import {notes} from './noteReducers';
import {potasp} from './PoTaSpReducers';
import {spells} from './spellReducers';

const dapcApp = combineReducers({
  info,
  utility,
  health,
  statValues,
  weapon_groups: weaponGroups,
  weapons,
  money,
  language,
  equipment,
  notes,
  potasp,
  spells
});

export function dapcAppWrapper(state, action) {
  switch (action.type) {
    case actionTypes.LOAD_DATA:
      const newState = Object.assign({}, action.value);
      if (newState.health.health_adjust === undefined) {
        newState.health.health_adjust = '0';
      }
      if (newState.health.mana_adjust === undefined) {
        newState.health.mana_adjust = '0';
      }
      return newState;
    default:
      return dapcApp(state, action);
  }
}
