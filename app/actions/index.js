import {setValueAction, setStatsAction} from './common';
import * as actionTypes from '../constants';

export const actions = {
  setInfo: setValueAction(actionTypes.CHANGE_INFO),
  setUtility: setValueAction(actionTypes.CHANGE_UTILITY),
  setHealthMana: setValueAction(actionTypes.CHANGE_HEALTH_MANA),
  setStat: setStatsAction(actionTypes.CHANGE_STAT),
  setWeaponGroups: setValueAction(actionTypes.CHANGE_WEAPONS_GROUP)
};
