import * as actionTypes from '../constants';
import {reduceValueAction} from './common';

const initialState = {
  defense: '',
  armor: '',
  speed: '',
  ap: ''
};

export function utility(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_UTILITY:
      return reduceValueAction(state, action);
    default:
      return state;
  }
}
