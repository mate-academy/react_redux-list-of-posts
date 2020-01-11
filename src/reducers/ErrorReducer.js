const CHANGE_ERROR = 'CHANGE_ERROR';

export const postLoadingError = value => ({
  type: CHANGE_ERROR, value,
});

const errorReducer = (state = false, action) => {
  switch (action.type) {
    case CHANGE_ERROR:
      return action.value;
    default:
      return state;
  }
};

export default errorReducer;
