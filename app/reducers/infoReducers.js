import {infoActionTypes} from '../constants';

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

function reduceAction(state, name, value) {
  return {
    ...state,
    [name]: value
  };
}

export function info(state = initialState, action) {
  switch (action.type) {
    case infoActionTypes.CHANGE_GENDER:
      return reduceAction(state, 'gender', action.value);
    case infoActionTypes.CHANGE_AGE:
      return reduceAction(state, 'age', action.value);
    case infoActionTypes.CHANGE_NAME:
      return reduceAction(state, 'name', action.value);
    case infoActionTypes.CHANGE_CLASS:
      return reduceAction(state, 'class', action.value);
    case infoActionTypes.CHANGE_RACE:
      return reduceAction(state, 'race', action.value);
    case infoActionTypes.CHANGE_LEVEL:
      return reduceAction(state, 'level', action.value);
    case infoActionTypes.CHANGE_XP:
      return reduceAction(state, 'xp', action.value);
    case infoActionTypes.CHANGE_BACKGROUND:
      return reduceAction(state, 'background', action.value);
    default:
      return state;
  }
}
