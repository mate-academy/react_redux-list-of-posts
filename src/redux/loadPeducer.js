import {
  START_LOADING,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
} from './actions';

const loadReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;

    case HANDLE_SUCCESS:
      return false;

    case HANDLE_ERROR:
      return false;

    default:
      return state;
  }
};

export default loadReducer;
