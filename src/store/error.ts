import { AnyAction } from 'redux';

// Action types
const IS_ERROR = 'IS_ERROR';
const NOT_ERROR = 'NOT_ERROR';

// Action creators
export const setError = () => ({ type: IS_ERROR });
export const notError = () => ({ type: NOT_ERROR });

const errorReducer = (error = false, action: AnyAction) => {
  switch (action.type) {
    case IS_ERROR:
      return true;
    case NOT_ERROR:
      return false;
    default:
      return error;
  }
};

export default errorReducer;
