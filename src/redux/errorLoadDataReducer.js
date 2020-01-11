import {
  START_LOADING,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
} from './actions';

const errorLoadDataReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return false;

    case HANDLE_SUCCESS:
      return false;

    case HANDLE_ERROR:
      return true;

    default:
      return state;
  }
};

export default errorLoadDataReducer;
