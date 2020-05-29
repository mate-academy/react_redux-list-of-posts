import { AnyAction } from 'redux';

const SET_ERROR = 'SET_ERROR';

export const setError = (value: boolean) => ({
  type: SET_ERROR,
  value,
});

const errorReducer = (error = false, action: AnyAction) => {
  switch (action.type) {
    case SET_ERROR:
      return action.value;
    default:
      return error;
  }
}

export default errorReducer;
