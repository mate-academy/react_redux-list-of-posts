import { HANDLE_SUCCESS } from './actions';

const initializingReducer = (state = false, action) => {
  switch (action.type) {
    case HANDLE_SUCCESS:
      return true;

    default:
      return state;
  }
};

export default initializingReducer;
