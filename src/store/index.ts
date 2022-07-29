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
import { getPostDetails, getUserPosts } from '../api/posts';

import usersReducer, {
  UsersState,
  actions as usersActions,
  selectors as usersSelectors,
} from './users';

import commentsReducer, {
  CommentsState,
  actions as commentsActions,
  selectors as commsntsSelectors,
} from './comments';
import { getUsers } from '../api/users';
import { getPostComments } from '../api/comments';

type CombinedState = {
  posts: PostsState,
  users: UsersState,
  comments: CommentsState,
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

export const loadPostDetails = (postId: number) => (dispatch: Dispatch) => {
  getPostDetails(postId)
    .then((post) => {
      dispatch(postsActions.setPostsDetails(post));
    })
    .catch(() => {
      dispatch(postsActions.setLoadDetailsError());
    });
};

export const loadComments = (postId: number) => (dispatch: Dispatch) => {
  getPostComments(postId)
    .then((comments) => {
      dispatch(commentsActions.setComments(comments));
    })
    .catch(() => {
      dispatch(commentsActions.setLoadCommentsError());
    });
};

export const changeSelectedUserId = (userId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(usersActions.setSelectedUserId(userId));
  };
};

export const changeSelectedPostId = (postId: number | null) => {
  return (dispatch: Dispatch) => {
    dispatch(postsActions.setSelectedPostId(postId));
  };
};

export const selectors = {
  getPosts: (state: CombinedState) => postsSelectors.getPosts(state.posts),

  getLoadPostsError: (state: CombinedState) => {
    return postsSelectors.getLoadPostsError(state.posts);
  },

  getSelectedPostId: (state: CombinedState) => {
    return postsSelectors.getSelectedPostId(state.posts);
  },

  getPostDetails: (state: CombinedState) => {
    return postsSelectors.getPostDetails(state.posts);
  },

  getLoadDetailsError: (state: CombinedState) => {
    return postsSelectors.getLoadDetailsError(state.posts);
  },

  getUsers: (state: CombinedState) => usersSelectors.getUsers(state.users),

  getLoadUsersError: (state: CombinedState) => {
    return usersSelectors.getLoadUsersError(state.users);
  },

  getSelectedUserId: (state: CombinedState) => {
    return usersSelectors.getSelectedUserId(state.users);
  },

  getComments: (state: CombinedState) => {
    return commsntsSelectors.getComments(state.comments);
  },

  getLoadCommentsError: (state: CombinedState) => {
    return commsntsSelectors.getLoadCommentsError(state.comments);
  },
};

const reducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  comments: commentsReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
