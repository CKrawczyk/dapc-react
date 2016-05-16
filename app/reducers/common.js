function reduceValueAction(state, action) {
  return {
    ...state,
    [action.id]: action.value
  };
}

/* eslint func-names:0 */
function valueReducer(actionType, initialState) {
  return function (state = initialState, action) {
    switch (action.type) {
      case actionType:
        return reduceValueAction(state, action);
      default:
        return state;
    }
  };
}

export const commonReducers = {
  reduceValueAction,
  valueReducer
};
