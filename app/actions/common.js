/* eslint func-names:0 */

function setTextAction(actionType) {
  return function (newValue) {
    return {
      type: actionType,
      value: newValue
    };
  };
}

function setStatsAction(actionType) {
  return function (newStat) {
    return {
      type: actionType,
      stat: newStat.stat,
      value: newStat.value
    };
  };
}

export const commonActions = {
  setTextAction,
  setStatsAction
};
