import { AnyAction } from 'redux';

const IS_LOADING = 'IS_LOADING';

export const setLoading = (status: boolean) => ({ type: IS_LOADING, status });

const loadingReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADING:
      return action.status;

    default:
      return state;
  }
};

export default loadingReducer;
