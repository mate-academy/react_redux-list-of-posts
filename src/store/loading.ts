import { AnyAction } from 'redux';

const LOADING = 'LOADING';

export const setLoading = (status: boolean) => ({ type: LOADING, status });

const loadingReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case LOADING:
      return action.status;

    default:
      return state;
  }
};

export default loadingReducer;
