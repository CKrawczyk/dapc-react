import {infoActionTypes} from '../constants';
import {setTextAction} from './common';

export const infoActions = {
  setGender: setTextAction(infoActionTypes.CHANGE_GENDER),
  setAge: setTextAction(infoActionTypes.CHANGE_AGE),
  setName: setTextAction(infoActionTypes.CHANGE_NAME),
  setClass: setTextAction(infoActionTypes.CHANGE_CLASS),
  setRace: setTextAction(infoActionTypes.CHANGE_RACE),
  setLevel: setTextAction(infoActionTypes.CHANGE_LEVEL),
  setXP: setTextAction(infoActionTypes.CHANGE_XP),
  setBackground: setTextAction(infoActionTypes.CHANGE_BACKGROUND)
};
