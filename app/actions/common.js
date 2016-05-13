function setTextAction(actionType) {
  return function (newValue) {
    return {
      type: actionType,
      value: newValue
    };
  };
}

export const commonActions = {
  setTextAction
};
