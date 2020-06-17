import { Action } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

type StartLoading = Action<typeof START_LOADING>;
type FinishLoading = Action<typeof FINISH_LOADING>;
type LoadingStatus = StartLoading | FinishLoading;

export const startLoading = (): StartLoading => ({ type: START_LOADING });
export const finishLoading = (): FinishLoading => ({ type: FINISH_LOADING });

const loadingReducer = (loading = false, action: LoadingStatus) => {
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
