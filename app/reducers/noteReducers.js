import * as actionTypes from '../constants';
import {topLevelReducer} from './common';

const initialState = '';

export const notes = topLevelReducer(actionTypes.CHANGE_NOTE, initialState);
