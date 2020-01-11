const SET_INITIALIZED = 'SET_INITIALIZED';

export const setInitialized = value => ({
  type: SET_INITIALIZED,
  value,
});

const initializedReducer = (isInitialized = false, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return action.value;
    default:
      return isInitialized;
  }
};

export default initializedReducer;
