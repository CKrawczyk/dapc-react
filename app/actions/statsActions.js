import {statsActionTypes} from '../constants';
import {setStatsAction} from './common';

export const statsActions = {
  setFocus: setStatsAction(statsActionTypes.CHANGE_FOCUS),
  setPrimary: setStatsAction(statsActionTypes.CHANGE_PRIMARY_STATS),
  setStat: setStatsAction(statsActionTypes.CHANGE_STAT_VALUE)
};
