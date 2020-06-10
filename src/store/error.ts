import { AnyAction } from 'redux';

const IS_ERROR = 'IS_ERROR';

export const setError = () => ({ type: IS_ERROR });

export const errorReducer = (error = false, action: AnyAction) => {
  switch (action.type) {
    case IS_ERROR:
      return true;
    default:
      return error;
  }
};
