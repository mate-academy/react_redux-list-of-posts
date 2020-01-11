const ACTION_TYPE_SET_LOADING = 'setLoading';

export const setLoading = value => ({
  type: ACTION_TYPE_SET_LOADING,
  value,
});

const loadingReducer = (isLoading = false, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_LOADING:
      return action.value;
    default:
      return isLoading;
  }
};

export default loadingReducer;
