import { SET_LOADING } from '../constants';

export const setLoading = value => ({
  type: SET_LOADING,
  value,
});

const loadingReducer = (isLoading = false, action) => {
  if (action.type === SET_LOADING) {
    return action.value;
  }

  return isLoading;
};

export default loadingReducer;
