import { AnyAction } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (posts: PostWithUser[]) => ({ type: FINISH_LOADING, posts });

const loadingReducer = (loading = false, action: AnyAction): boolean => {
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
