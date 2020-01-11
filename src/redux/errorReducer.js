const SET_ERROR = 'SET_ERROR';

export const setError = value => ({
  type: SET_ERROR,
  value,
});

const errorReducer = (hasError = false, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.value;
    default:
      return hasError;
  }
};

export default errorReducer;
