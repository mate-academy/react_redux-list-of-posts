import { UPDATE_QUERY } from './actions';

const queryReducer = (state = '', action) => {
  switch (action.type) {
    case UPDATE_QUERY:
      return action.query;

    default:
      return state;
  }
};

export default queryReducer;
