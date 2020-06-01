import { AnyAction } from 'redux';

const SET_INITIALIZED = 'SET_INITIALIZED';

export const setInitialized = (value: boolean) => ({
  type: SET_INITIALIZED,
  value,
});

const initializedReducer = (error = false, action: AnyAction) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return action.value;
    default:
      return error;
  }
};

export default initializedReducer;
