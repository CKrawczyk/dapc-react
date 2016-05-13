import {utilityActionTypes} from '../constants';
import {reduceTextAction} from './common';

const initialState = {
  defense: '',
  armor: '',
  speed: '',
  ap: ''
};

export function utility(state = initialState, action) {
  switch (action.type) {
    case utilityActionTypes.CHANGE_DEFENSE:
      return reduceTextAction(state, 'defense', action.value);
    case utilityActionTypes.CHANGE_ARMOR:
      return reduceTextAction(state, 'armor', action.value);
    case utilityActionTypes.CHANGE_SPEED:
      return reduceTextAction(state, 'speed', action.value);
    case utilityActionTypes.CHANGE_AP:
      return reduceTextAction(state, 'ap', action.value);
    default:
      return state;
  }
}
