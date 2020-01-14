import { SET_ERROR } from '../constants';

export const setError = value => ({
  type: SET_ERROR,
  value,
});

const errorReducer = (hasError = false, action) => {
  if (action.type === SET_ERROR) {
    return action.value;
  }

  return hasError;
};

export default errorReducer;
