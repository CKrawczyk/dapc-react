import * as actionTypes from '../constants';
import {reduceValueAction} from './common';

const initialState = {
  gender: '',
  age: '',
  name: '',
  class: '',
  race: '',
  level: '',
  xp: '',
  background: ''
};

export function info(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_INFO:
      return reduceValueAction(state, action);
    default:
      return state;
  }
}
