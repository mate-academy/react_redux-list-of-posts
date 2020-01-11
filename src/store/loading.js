const SET_ISLOADING = 'SET_ISLOADING';

export const setIsLoading = isLoading => ({
  type: SET_ISLOADING,
  isLoading,
});

const isLoadingReducer = (isLoading = false, action) => {
  switch (action.type) {
    case SET_ISLOADING:
      return action.isLoading;
    default:
      return isLoading;
  }
};

export default isLoadingReducer;
