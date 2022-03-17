import { createStore } from 'redux';
import { LOAD_POSTS } from './actions';

const initialState: State = {
  posts: [],
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
