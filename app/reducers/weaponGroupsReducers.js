import * as actionTypes from '../constants';
import {valueReducer} from './common';
import Groups from '../lib/weaponGroups';

const initialState = {};
for (const g of Groups) {
  initialState[g.id] = false;
}

export const weaponGroups = valueReducer(actionTypes.CHANGE_WEAPONS_GROUP, initialState);
