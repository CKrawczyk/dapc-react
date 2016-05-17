import {combineReducers} from 'redux';
import {classPowers} from './classPowersReducers';
import {talents} from './talentsReducers';
import {specializations} from './specialReducers';

export const potasp = combineReducers({
  class_powers: classPowers,
  talents,
  specializations
});
