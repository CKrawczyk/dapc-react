import * as actionTypes from '../constants';
import {nestedReducer} from './common';
import TalentsList from '../lib/talents';

const initialState = {};
for (const t in TalentsList) {
  initialState[t] = {
    n: false,
    j: false,
    m: false
  };
}

export const talents = nestedReducer(actionTypes.CHANGE_TALENTS, initialState);
