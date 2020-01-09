import { HANDLE_ERROR } from './actions';

const errorReducer = (state = false, action) => {
  switch (action.type) {
    case HANDLE_ERROR:
      return true;

    default:
      return state;
  }
};

export default errorReducer;
