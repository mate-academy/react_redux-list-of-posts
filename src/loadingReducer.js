export const SET_LOADING = 'SET_LOADING';

export const setLoadingAC = value => ({
  type: SET_LOADING, value,
});

const loadingReducer = (loading = false, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.value;
    default:
      return loading;
  }
};

export default loadingReducer;
