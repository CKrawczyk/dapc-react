import * as actionTypes from '../constants';
import {valueReducer} from './common';

const initialState = {
  max_health: '0',
  health: '0',
  health_adjust: '0',
  max_mana: '0',
  mana: '0',
  mana_adjust: '0'
};

export const health = valueReducer(actionTypes.CHANGE_HEALTH_MANA, initialState);
