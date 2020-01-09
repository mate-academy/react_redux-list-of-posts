import { LOADING, START_LOADING } from '../actions';

export const getLoading = state => state.loading;
export const getIsLoaded = state => state.isLoaded;

export const loadingReducer = (state = {
  loading: false,
  isLoaded: false,
}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoaded: true,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
