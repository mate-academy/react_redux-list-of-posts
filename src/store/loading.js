import { START_LOADING, HANDLE_SUCCESS, HANDLE_ERROR } from './actions';

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case HANDLE_ERROR:
    case HANDLE_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
