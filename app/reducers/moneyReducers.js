import * as actionTypes from '../constants';
import {valueReducer} from './common';

const initialState = {
  copper: '0',
  silver: '0',
  gold: '0'
};

export const money = valueReducer(actionTypes.CHANGE_MONEY, initialState);
