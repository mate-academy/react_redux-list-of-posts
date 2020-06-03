import { AnyAction } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });

type LoadingState = {
  loading: boolean;
  visible: boolean;
};

const initialState = {
  loading: false,
  visible: false,
};

const reducer = (state = initialState, action: AnyAction): LoadingState => {
  switch (action.type) {
    case START_LOADING:
      return {
        visible: false,
        loading: true,
      };

    case FINISH_LOADING:
      return {
        loading: false,
        visible: true,
      };

    default:
      return state;
  }
};

export default reducer;
