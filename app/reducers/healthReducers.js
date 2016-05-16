import * as actionTypes from '../constants';
import {reduceValueAction} from './common';

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
    case actionTypes.CHANGE_HEALTH_MANA:
      return reduceValueAction(state, action);
    default:
      return state;
  }
}
