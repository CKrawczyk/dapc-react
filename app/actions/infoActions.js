import {infoActionTypes} from '../constants';

function setAction(actionType) {
  return function (newValue) {
    return {
      type: actionType,
      value: newValue
    };
  };
}

export const infoActions = {
  setGender: setAction(infoActionTypes.CHANGE_GENDER),
  setAge: setAction(infoActionTypes.CHANGE_AGE),
  setName: setAction(infoActionTypes.CHANGE_NAME),
  setClass: setAction(infoActionTypes.CHANGE_CLASS),
  setRace: setAction(infoActionTypes.CHANGE_RACE),
  setLevel: setAction(infoActionTypes.CHANGE_LEVEL),
  setXP: setAction(infoActionTypes.CHANGE_XP),
  setBackground: setAction(infoActionTypes.CHANGE_BACKGROUND)
};
