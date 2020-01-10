import { LOADING } from '../actions';

export const getLoading = state => state.loading;

export const loadingReducer = ( loading = false, action) => {
  switch (action.type) {
    case LOADING:
      return true;
    default:
      return loading;
  }
};
