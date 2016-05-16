/* eslint func-names:0 */

function setValueAction(actionType) {
  return function (newValue) {
    return {
      type: actionType,
      id: newValue.id,
      value: newValue.value
    };
  };
}

function setStatsAction(actionType) {
  return function (newStat) {
    return {
      type: actionType,
      stat: newStat.stat,
      id: newStat.id,
      value: newStat.value
    };
  };
}

export const commonActions = {
  setValueAction,
  setStatsAction
};
