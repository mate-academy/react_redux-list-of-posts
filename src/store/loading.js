export const setIsLoading = newSetLoading => ({
  type: 'CHANGE_LOADING',
  loading: newSetLoading,
});

const loadingReducer = (loading = false, action) => {
  switch(action.type) {
    case 'CHANGE_LOADING':
      return  action.loading;

    default:
      return loading;
  }
};

export default loadingReducer;
