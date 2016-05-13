function reduceTextAction(state, name, value) {
  return {
    ...state,
    [name]: value
  };
}

export const commonReducers = {
  reduceTextAction
};
