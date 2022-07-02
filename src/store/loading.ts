const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

// Action creators
export type LoadingAction = {
  type: string,
};

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });

const reducer = (loading = false, action: LoadingAction) => {
  switch (action.type) {
    case START_LOADING:
      return true;

    case FINISH_LOADING:
      return false;

    default:
      return loading;
  }
};

export default reducer;
