function reduceValueAction(state, action) {
  return {
    ...state,
    [action.id]: action.value
  };
}

export const commonReducers = {
  reduceValueAction
};
