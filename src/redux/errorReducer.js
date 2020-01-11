const ACTION_TYPE_SET_ERROR = 'setError';

export const setError = value => ({
  type: ACTION_TYPE_SET_ERROR,
  value,
});

const errorReducer = (hasError = false, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_ERROR:
      return action.value;
    default:
      return hasError;
  }
};

export default errorReducer;
