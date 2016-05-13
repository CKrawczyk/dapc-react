import {healthActionTypes} from '../constants';
import {reduceTextAction} from './common';

const initialState = {
  max_health: '0',
  health: '0',
  health_adjust: '0',
  max_mana: '0',
  mana: '0',
  mana_adjust: '0'
};

export function health(state = initialState, action) {
  switch (action.type) {
    case healthActionTypes.CHANGE_MAX_HEALTH:
      return reduceTextAction(state, 'max_health', action);
    case healthActionTypes.CHANGE_CURRENT_HEALTH:
      return reduceTextAction(state, 'health', action);
    case healthActionTypes.CHANGE_ADJUST_HEALTH:
      return reduceTextAction(state, 'health_adjust', action);
    case healthActionTypes.CHANGE_MAX_MANA:
      return reduceTextAction(state, 'max_mana', action);
    case healthActionTypes.CHANGE_CURRENT_MANA:
      return reduceTextAction(state, 'mana', action);
    case healthActionTypes.CHANGE_ADJUST_MANA:
      return reduceTextAction(state, 'mana_adjust', action);
    default:
      return state;
  }
}
