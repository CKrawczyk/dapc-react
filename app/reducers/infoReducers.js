import {infoActionTypes} from '../constants';
import {reduceTextAction} from './common';

const initialState = {
  gender: '',
  age: '',
  name: '',
  class: '',
  race: '',
  level: '',
  xp: '',
  background: ''
};

export function info(state = initialState, action) {
  switch (action.type) {
    case infoActionTypes.CHANGE_GENDER:
      return reduceTextAction(state, 'gender', action.value);
    case infoActionTypes.CHANGE_AGE:
      return reduceTextAction(state, 'age', action.value);
    case infoActionTypes.CHANGE_NAME:
      return reduceTextAction(state, 'name', action.value);
    case infoActionTypes.CHANGE_CLASS:
      return reduceTextAction(state, 'class', action.value);
    case infoActionTypes.CHANGE_RACE:
      return reduceTextAction(state, 'race', action.value);
    case infoActionTypes.CHANGE_LEVEL:
      return reduceTextAction(state, 'level', action.value);
    case infoActionTypes.CHANGE_XP:
      return reduceTextAction(state, 'xp', action.value);
    case infoActionTypes.CHANGE_BACKGROUND:
      return reduceTextAction(state, 'background', action.value);
    default:
      return state;
  }
}
