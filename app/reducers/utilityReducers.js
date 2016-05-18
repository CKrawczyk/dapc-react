import * as actionTypes from '../constants';
import {valueReducer} from './common';

const initialState = {
  defense: '',
  armor: '',
  speed: '',
  ap: ''
};

export const utility = valueReducer(actionTypes.CHANGE_UTILITY, initialState);
