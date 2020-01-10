import { START_LOADING, HANDLE_SUCCESS } from '../actions';

const initReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return false;
    case HANDLE_SUCCESS:
      return true;
    default:
      return state;
  }
};

export default initReducer;
