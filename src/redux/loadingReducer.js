const SET_LOADING = 'SET_LOADING';

export const setLoading = value => ({
  type: SET_LOADING,
  value,
});

const loadingReducer = (isLoading = false, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.value;
    default:
      return isLoading;
  }
};

export default loadingReducer;
