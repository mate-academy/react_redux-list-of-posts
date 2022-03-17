import { createStore } from 'redux';
import { LOAD_POSTS, LOAD_USERS } from './actions';

const initialState: State = {
  posts: [],
  users: [],
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };

    case LOAD_USERS:
      return {
        ...state,
        users: [...action.payload],
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
