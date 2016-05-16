import * as actionTypes from '../constants';
import {valueReducer} from './common';

const initialState = {
  languages_spoken: [],
  languages_written: []
};

export const language = valueReducer(actionTypes.CHANGE_LANGUAGE, initialState);
