import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import message from './message';
import users from './users';
import posts from './posts';
import comments from './comments';
import filterField from './filterField';
import filteredPosts from './filteredPosts';
import { LoadingFinishProps } from '../types';

export const LOADING_FINISH = 'LOADING_FINISH';

export const loadingFinish = ({ users, comments, posts, message }: LoadingFinishProps) =>
  ({ type: LOADING_FINISH, users, comments, posts, message })

const rootReducer = combineReducers({
  message,
  users,
  comments,
  posts,
  filterField,
  filteredPosts,
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

const initialState = {
  message: 'Press for start loading',
  users: [],
  comments: [],
  posts: [],
  filterField: '',
  filteredPosts: [],
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
