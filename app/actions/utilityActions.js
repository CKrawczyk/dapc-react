import {utilityActionTypes} from '../constants';
import {setTextAction} from './common';

export const utilityActions = {
  setDefense: setTextAction(utilityActionTypes.CHANGE_DEFENSE),
  setArmor: setTextAction(utilityActionTypes.CHANGE_ARMOR),
  setSpeed: setTextAction(utilityActionTypes.CHANGE_SPEED),
  setAP: setTextAction(utilityActionTypes.CHANGE_AP)
};
