import { AnyAction } from 'redux';
// import { useSelector } from 'react-redux';
// import { getPosts } from './index';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
// const x = useSelector(getPosts);
const reducer = (loading = false, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      // console.log(x)

      return true;

    case FINISH_LOADING:
      return false;

    default:
      return loading;
  }
};

export default reducer;
