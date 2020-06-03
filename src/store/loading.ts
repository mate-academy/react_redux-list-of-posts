import { AnyAction } from 'redux';

// Action types

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';


// Action creators

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
// export const handleError = () => ({ type: HANDLE_ERROR });


const reducer = (loading = false, action: AnyAction) => {
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
