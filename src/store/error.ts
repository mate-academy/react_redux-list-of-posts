import { AnyAction } from "redux";

const SET_ERROR = 'SET_ERROR';

export const setError = (error: string) => {
  return {
    type: SET_ERROR,
    error
  }
};

const reducer = (error = '', action: AnyAction) => {
  switch (action.type) {
    case SET_ERROR:
      return action.error;

    default:
      return error;
  }
};

export default reducer;
