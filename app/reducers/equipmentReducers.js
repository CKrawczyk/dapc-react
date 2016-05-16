import * as actionTypes from '../constants';
import {topLevelReducer} from './common';

const initialState = '';

export const equipment = topLevelReducer(actionTypes.CHANGE_EQUIPMENT, initialState);
