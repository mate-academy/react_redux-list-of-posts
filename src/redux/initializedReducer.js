const ACTION_TYPE_SET_INITIALIZED = 'setInitialized';

export const setInitialized = value => ({
  type: ACTION_TYPE_SET_INITIALIZED,
  value,
});

const initializedReducer = (isInitialized = false, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_INITIALIZED:
      return action.value;
    default:
      return isInitialized;
  }
};

export default initializedReducer;
