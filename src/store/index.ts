import {
  applyMiddleware, combineReducers, createStore, Dispatch,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer, {
  PostsState,
  actions as postsActions,
  selectors as postsSelectors,
} from './posts';
import { getUserPosts } from '../api/posts';

import usersReducer, {
  UsersState,
  actions as usersActions,
  selectors as usersSelectors,
} from './users';
import { getUsers } from '../api/users';

type CombinedState = {
  posts: PostsState,
  users: UsersState,
};

export const loadPosts = (userId: number) => (dispatch: Dispatch) => {
  getUserPosts(userId)
    .then((posts) => {
      dispatch(postsActions.setPosts(posts));
    })
    .catch(() => {
      dispatch(postsActions.setLoadPostsError());
    });
};

export const loadUsers = () => (dispatch: Dispatch) => {
  getUsers()
    .then((users) => {
      dispatch(usersActions.setUsers(users));
    })
    .catch(() => {
      dispatch(usersActions.setLoadUsersError());
    });
};

export const changeSelectedUserId = (userId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(usersActions.setSelectedUserId(userId));
  };
};

export const selectors = {
  getPosts: (state: CombinedState) => postsSelectors.getPosts(state.posts),
  getLoadPostsError: (state: CombinedState) => {
    return postsSelectors.getLoadPostsError(state.posts);
  },
  getUsers: (state: CombinedState) => usersSelectors.getUsers(state.users),
  getLoadUsersError: (state: CombinedState) => {
    return usersSelectors.getLoadUsersError(state.users);
  },
  getSelectedUserId: (state: CombinedState) => {
    return usersSelectors.getSelectedUserId(state.users);
  },
};

const reducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
