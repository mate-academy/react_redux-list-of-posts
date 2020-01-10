import { SEARCH_POST } from '../actions';

const queryReducer = (state = '', action) => {
  switch (action.type) {
    case SEARCH_POST:
      return action.value;
    default:
      return state;
  }
};

export default queryReducer;
