const CHANGE_LOADING = 'CHANGE_LOADING';

export const changeLoading = value => ({
  type: CHANGE_LOADING, value,
});

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case CHANGE_LOADING:
      return action.value;
    default:
      return state;
  }
};

export default loadingReducer;
