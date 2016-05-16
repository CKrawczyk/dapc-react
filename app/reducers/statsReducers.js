import * as actionTypes from '../constants';
import {reduceValueAction} from './common';
import StatFocus from '../lib/focus';

const initialState = {};
for (const f of StatFocus) {
  initialState[f.name] = {
    focus: [],
    primary: false,
    value: 0
  };
}

export function statValues(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_STAT:
      return {
        ...state,
        [action.stat]: reduceValueAction(state[action.stat], action)
      };
    default:
      return state;
  }
}
