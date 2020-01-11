const SET_IS_LOADING = 'isLoading';

export const setIsLoading = isLoading => ({
  type: SET_IS_LOADING,
  isLoading,
});

const isLoadingReducer = (isLoading = false, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.isLoading;
    default:
      return isLoading;
  }
};

export default isLoadingReducer;
