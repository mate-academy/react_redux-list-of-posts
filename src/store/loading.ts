import { AnyAction } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });

type LoadingState = {
  isLoading: boolean;
  isVisible: boolean;
};

const initialState = {
  isLoading: false,
  isVisible: false,
};

const reducer = (state = initialState, action: AnyAction): LoadingState => {
  switch (action.type) {
    case START_LOADING:
      return {
        isVisible: false,
        isLoading: true,
      };

    case FINISH_LOADING:
      return {
        isLoading: false,
        isVisible: true,
      };

    default:
      return state;
  }
};

export default reducer;
