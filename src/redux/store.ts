import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { CommentType } from '../types/CommentType';
import { Details } from '../types/Details';
import { Post } from '../types/Post';
import rootReducer from './reducers';

export interface RootState {
  posts: {
    postsList: Post[],
    activePost: number | null,
    comments: CommentType[],
    details: Details
  }
}

// eslint-disable-next-line
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
