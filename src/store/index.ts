import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import { getUsers } from '../api/users';
import { getPostDetails, getUserPosts } from '../api/posts';
import { deleteComment, getComments } from '../api/comments';

const USERS = 'USERS';
const USER_ID = 'USER_ID';
const POSTS = 'POSTS';
const IS_LOAD = 'IS_LOAD';
const POST_ID = 'POST_ID';
const POST_DETAILS = 'POST_DETAILS';
const COMMENTS = 'COMMENTS';

export const selectors = {
  getUserId: (state: RootState) => state.userId,
  getUsers: (state: RootState) => state.users,
  getPosts: (state: RootState) => state.posts,
  getIsload: (state: RootState) => state.isLoad,
  getPostId: (state: RootState) => state.postId,
  getPost: (state: RootState) => state.postDetails,
  getComments: (state: RootState) => state.comments,
};

export const actions = {
  setIsLoad: (isLoad: boolean) => ({ type: IS_LOAD, isLoad }),
  setUsers: (users: User[]) => ({ type: USERS, users }),
  setUserId: (userId: number) => ({ type: USER_ID, userId }),
  setPosts: (posts: Post[]) => ({ type: POSTS, posts }),
  setPostId: (postId: number) => ({ type: POST_ID, postId }),
  setPostDetails: (postDetails: Post) => ({ type: POST_DETAILS, postDetails }),
  setComments: (comments: Comment[]) => ({ type: COMMENTS, comments }),
  loadPosts: (id: number) => (dispatch: Dispatch<unknown>) => {
    getUserPosts(id)
      .then((res) => dispatch(actions.setPosts(res)))
      .then(() => dispatch(actions.setIsLoad(false)));
  },
  loadUsers: () => (dispatch: Dispatch<unknown>) => {
    getUsers().then((res) => dispatch(actions.setUsers(res)));
  },
  loadPostDetails: (id: number) => (dispatch: Dispatch<unknown>) => {
    getPostDetails(id).then((res) => dispatch(actions.setPostDetails(res)));
  },
  loadComments: (id: number) => (dispatch: Dispatch<unknown>) => {
    getComments(id).then((res) => dispatch(actions.setComments(res)));
  },
  deleteComment: (id: number, postId: number) => (
    async (dispatch: Dispatch<unknown>) => {
      await deleteComment(id);
      getComments(postId).then((res) => dispatch(actions.setComments(res)));
    }),
};

type RootState = {
  users: User[];
  userId: number;
  posts: Post[];
  postId: number;
  postDetails: Post | null;
  comments: Comment[];
  isLoad: boolean;
};

const initialState: RootState = {
  users: [],
  userId: 0,
  posts: [],
  postId: 0,
  postDetails: null,
  comments: [],
  isLoad: true,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case USERS:
      return {
        ...state,
        users: action.users,
      };
    case USER_ID:
      return {
        ...state,
        userId: action.userId,
      };
    case POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case POST_ID:
      return {
        ...state,
        postId: action.postId,
      };
    case IS_LOAD:
      return {
        ...state,
        isLoad: action.isLoad,
      };
    case POST_DETAILS:
      return {
        ...state,
        postDetails: action.postDetails,
      };
    case COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
