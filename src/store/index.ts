import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  POST_ID,
  USER_ID,
  LOAD_POSTS,
  LOAD_COMMENTS,
  LOAD_POST_DETAIL,
} from './actions';

const initialState: RootState = {
  posts: [],
  userId: 0,
  comments: [],
  postDetails: null,
  selectedPostId: 0,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, posts: action.payload };

    case USER_ID:
      return { ...state, userId: action.payload };

    case LOAD_COMMENTS:
      return { ...state, comments: action.payload };

    case LOAD_POST_DETAIL:
      return { ...state, postDetails: action.payload };

    case POST_ID:
      return { ...state, selectedPostId: action.payload };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
