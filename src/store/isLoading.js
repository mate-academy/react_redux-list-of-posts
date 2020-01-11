const ACTION_TYPE_SET_LOADING = 'setLoading';

export const createActionSetLoading = payload => ({
  type: ACTION_TYPE_SET_LOADING,
  payload,
});

const isLoadingReducer = (isLoading = false, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_LOADING:
      return action.payload;

    default:
      return isLoading;
  }
};

export default isLoadingReducer;
