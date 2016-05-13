import {statsActionTypes} from '../constants';
import {reduceTextAction} from './common';
import StatFocus from '../lib/focus';

const initalStatState = {
  focus: [],
  primary: false,
  value: 0
};

function innerStat(state = initalStatState, action) {
  switch (action.type) {
    case statsActionTypes.CHANGE_FOCUS:
      return reduceTextAction(state, 'focus', action.value);
    case statsActionTypes.CHANGE_PRIMARY_STATS:
      return reduceTextAction(state, 'primary', action.value);
    case statsActionTypes.CHANGE_STAT_VALUE:
      return reduceTextAction(state, 'value', action.value);
    default:
      return state;
  }
}

const initialState = {};
for (const f of StatFocus) {
  initialState[f.name] = innerStat();
}

export function statValues(state = initialState, action) {
  let newState;
  if (action.stat) {
    newState = {
      ...state,
      [action.stat]: innerStat(state[action.stat], action)
    };
  } else {
    newState = state;
  }
  return newState;
}
