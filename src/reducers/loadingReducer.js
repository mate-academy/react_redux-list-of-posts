export const START_LOADING = 'START_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });

const loadingReducer = (loading = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case FINISH_LOADING:
      return false;
    default:
      return loading;
  }
};

export default loadingReducer;
