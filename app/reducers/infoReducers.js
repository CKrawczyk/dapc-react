import * as actionTypes from '../constants';
import {valueReducer} from './common';

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

export const info = valueReducer(actionTypes.CHANGE_INFO, initialState);
