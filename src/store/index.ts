import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import changePostsReducer from './changePosts';
import selectUserReducer from './selectUser';
import selectPostReducer from './selectPost';
import showPostDetailsReducer from './showPostDetails';
import showCommentsReducer from './showComments';

const rootReducer = combineReducers({
  changePosts: changePostsReducer,
  selectUser: selectUserReducer,
  selectPost: selectPostReducer,
  showPostDetails: showPostDetailsReducer,
  showComments: showCommentsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
