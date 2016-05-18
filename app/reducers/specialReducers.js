import * as actionTypes from '../constants';
import {nestedReducer} from './common';
import SpecialList from '../lib/specializations';

const initialState = {};
for (const t in SpecialList) {
  initialState[t] = {
    n: false,
    j: false,
    m: false
  };
}

export const specializations = nestedReducer(actionTypes.CHANGE_SPECIAL, initialState);
