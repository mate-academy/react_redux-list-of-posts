import { AnyAction } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });

const inititalState = { loading: false, loaded: false };

const reducer = (state = inititalState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      }

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        loaded: true,
      };

    default:
      return state;
  }
};

export default reducer;
