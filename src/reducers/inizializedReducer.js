import { SET_INITIALIZED } from '../constants';

export const setInitialized = value => ({
  type: SET_INITIALIZED,
  value,
});

const initializedReducer = (isInitialized = false, action) => {
  if (action.type === SET_INITIALIZED) {
    return action.value;
  }

  return isInitialized;
};

export default initializedReducer;
