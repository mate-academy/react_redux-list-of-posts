import { AnyAction } from 'redux';
import { type } from '../actions';

const queryState: QueryState = {
  query: '',
};

export const queryReducer = (state = queryState, action: AnyAction): QueryState => {
  switch (action.type) {
    case type.SET_QUERY:
      return {
        query: action.query,
      };

    default:
      return state;
  }
};
