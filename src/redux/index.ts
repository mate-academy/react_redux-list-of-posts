import {
  AnyAction,
  applyMiddleware, combineReducers, createStore, Dispatch,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getUserPosts, getAllUsers, deletePost } from '../api/api';
import {
  createComments,
  deleteCommentHandler,
  getPostComments,
} from '../api/comments';
import postsReducer, {
  actions as postActions,
  PostsState,
  selectors as postsSelectors,
} from './posts';
import commentsReducer, {
  actions as commentsActions,
  CommentsState,
  selectors as commentsSelectors,
} from './comments';

type CombinedState = {
  posts: PostsState,
  comments: CommentsState,
};

export const selectors = {
  getSelectedPostId: (
    state: CombinedState,
  ) => commentsSelectors.getSelectedPostId(state.comments),
  getPostDetails: (state: CombinedState) => commentsSelectors
    .getPostDetails(state.comments),
  getPostComments: (state: CombinedState) => commentsSelectors
    .getPostComments(state.comments),
  getPosts: (state: CombinedState) => postsSelectors.getPosts(state.posts),
  getUserList: (state: CombinedState) => postsSelectors
    .getUserList(state.posts),
  getLoadingStatus: (state: CombinedState) => postsSelectors
    .getLoadingStatus(state.posts),
  getUserId: (state: CombinedState) => postsSelectors.getUserId(state.posts),
};

export const loadComments = (selectedPostId: number) => (
  dispatch: Dispatch,
) => {
  getPostComments(selectedPostId).then(
    (postComments: Comments[]) => {
      dispatch(commentsActions.setPostComments(postComments));
    },
  );
};

export const setPostDetails = (
  selectedPostId: number,
) => (
  dispatch: ThunkDispatch<CombinedState, undefined, AnyAction>,
  getState: () => CombinedState,
) => {
  const posts: Post[] = selectors.getPosts(getState());

  const postDetails = posts.find(post => post.id === selectedPostId);

  dispatch(commentsActions.setPostDetails(postDetails));
  dispatch(commentsActions.setSelectPostId(selectedPostId));
  dispatch(loadComments(selectedPostId));
};

export const loadPosts = () => (
  dispatch: Dispatch, getState: () => CombinedState,
) => {
  dispatch(postActions.setLoading(true));
  const userId = selectors.getUserId(getState());

  getUserPosts(String(userId)).then((posts: Post[]) => {
    dispatch(postActions.setPosts(posts));
    dispatch(postActions.setLoading(false));
  });
};

export const setUserId = (userId: number) => (
  dispatch: ThunkDispatch<CombinedState, undefined, AnyAction>,
) => {
  dispatch(postActions.setUserId(userId));
  dispatch(loadPosts());
};

export const loadUsersList = () => (dispatch: Dispatch) => {
  getAllUsers().then(
    (usersList: User[]) => {
      dispatch(postActions.setUsersList(usersList));
    },
  );
};

export const deleteComment = (id: number) => (
  dispatch: ThunkDispatch<CombinedState, undefined, AnyAction>,
  getState: () => CombinedState,
) => {
  deleteCommentHandler(id).then(
    () => {
      const postId: number = selectors.getSelectedPostId(getState());

      dispatch(loadComments(postId));
    },
  );
};

export const createComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
) => (dispatch: ThunkDispatch<CombinedState, undefined, AnyAction>) => {
  createComments(postId, name, email, body).then(
    () => {
      dispatch(loadComments(postId));
    },
  );
};

export const deleteUserPost = (postId: number) => (
  dispatch: ThunkDispatch<CombinedState, undefined, AnyAction>,
) => {
  deletePost(postId).then(
    () => {
      dispatch(loadPosts());
    },
  );
};

const reducer = combineReducers({
  comments: commentsReducer,
  posts: postsReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
