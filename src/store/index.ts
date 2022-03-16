import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { postsReducer } from './reducers/postsReducer';
import { usersReducer } from './reducers/usersReducer';

export const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));
