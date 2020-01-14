const SET_ERROR = 'SET_ERROR';

export const setError = value => ({
  type: SET_ERROR,
  value,
});

const errorReducer = (error = false,action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.value;
    default:
      return error;
  }
}

export default errorReducer;
