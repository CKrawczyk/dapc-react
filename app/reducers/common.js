export function reduceValueAction(state, action) {
  return {
    ...state,
    [action.id]: action.value
  };
}

/* eslint func-names:0 */
export function valueReducer(actionType, initialState) {
  return function (state = initialState, action) {
    switch (action.type) {
      case actionType:
        return reduceValueAction(state, action);
      default:
        return state;
    }
  };
}

export function topLevelReducer(actionType, initialState) {
  return function (state = initialState, action) {
    switch (action.type) {
      case actionType:
        return action.value;
      default:
        return state;
    }
  };
}

export function nestedReducer(actionType, initialState) {
  return function (state = initialState, action) {
    switch (action.type) {
      case actionType:
        return {
          ...state,
          [action.idx]: reduceValueAction(state[action.idx], action)
        };
      default:
        return state;
    }
  };
}
