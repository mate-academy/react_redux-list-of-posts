import { Action } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

type StartLoadingAction = Action<typeof START_LOADING>;
type FinishLoadingAction = Action<typeof FINISH_LOADING>;

export const startLoading = (): StartLoadingAction => ({
  type: START_LOADING
});
export const finishLoading = (): FinishLoadingAction => ({
  type: FINISH_LOADING
});

type LoadingState = {
  loading: boolean,
  loaded: boolean
};

const defaultLoadingState: LoadingState = {
  loading: false,
  loaded: false
};

type AllowedActions = StartLoadingAction | FinishLoadingAction;

const reducer = (loadingState = defaultLoadingState, action: AllowedActions) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...loadingState,
        loading: true,
      }

    case FINISH_LOADING:
      return {
        loading: false,
        loaded: true,
      };

    default:
      return loadingState;
  }
};

export default reducer;
