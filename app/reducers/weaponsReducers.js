import * as actionTypes from '../constants';
import {reduceValueAction} from './common';

const innerState = {
  attack: '',
  damage: '',
  range_max: '',
  range_min: '',
  weapon: ''
};

const initialState = [
  Object.assign({}, innerState)
];

export function weapons(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_WEAPONS_LIST:
      return [
        ...state,
        Object.assign({}, innerState)
      ];
    case actionTypes.REMOVE_WEAPONS_LIST:
      return [...state.slice(0, state.length - 1)];
    case actionTypes.CHANGE_WEAPONS:
      return state.map((w, idx) => {
        if (idx === parseInt(action.idx, 10)) {
          return reduceValueAction(w, action);
        }
        return w;
      });
    default:
      return state;
  }
}
