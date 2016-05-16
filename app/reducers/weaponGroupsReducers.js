import * as actionTypes from '../constants';
import {reduceValueAction} from './common';
import Groups from '../lib/weaponGroups';

const initialState = {};
for (const g of Groups) {
  initialState[g.id] = false;
}

export function weaponGroups(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_WEAPONS_GROUP:
      return reduceValueAction(state, action);
    default:
      return state;
  }
}
