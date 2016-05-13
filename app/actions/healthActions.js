import {healthActionTypes} from '../constants';
import {setTextAction} from './common';

export const healthActions = {
  setMaxHealth: setTextAction(healthActionTypes.CHANGE_MAX_HEALTH),
  setCurrentHealth: setTextAction(healthActionTypes.CHANGE_CURRENT_HEALTH),
  setAdjustHealth: setTextAction(healthActionTypes.CHANGE_ADJUST_HEALTH),
  setMaxMana: setTextAction(healthActionTypes.CHANGE_MAX_MANA),
  setCurrentMana: setTextAction(healthActionTypes.CHANGE_CURRENT_MANA),
  setAdjustMana: setTextAction(healthActionTypes.CHANGE_ADJUST_MANA)
};
