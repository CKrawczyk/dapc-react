import * as actionTypes from '../constants';
import {valueReducer} from './common';
import PowersList from '../lib/powers';

const initialState = {};
for (const c of ['mage', 'rogue', 'warrior']) {
  for (const p of PowersList[c]) {
    initialState[`${c} ${p.level}`] = false;
  }
}

export const classPowers = valueReducer(actionTypes.CHANGE_CLASS_POWERS, initialState);
