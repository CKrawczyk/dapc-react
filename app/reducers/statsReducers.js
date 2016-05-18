import * as actionTypes from '../constants';
import {nestedReducer} from './common';
import StatFocus from '../lib/focus';

const initialState = {};
for (const f of StatFocus) {
  initialState[f.name] = {
    focus: [],
    primary: false,
    value: 0
  };
}

export const statValues = nestedReducer(actionTypes.CHANGE_STAT, initialState);
