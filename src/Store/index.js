import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import getDataFromServer from '../Api';

const API_URl = 'https://jsonplaceholder.typicode.com/';

const ACTION_TYPES = {
  FILTER_POSTS: 'POSTS::FILTER',
  RESET_POSTS: 'POSTS::RESET',
  SET_DATA_TO_STORE: 'POSTS::TO-STORE',
  ISLOADING_POSTS: 'POSTS::ISLOADING',
  DELETE_POST: 'POSTS::DELETE-ITEM',
  DELETE_COMMENT: 'COMMENT::DELETE',
};

export const resetPosts = () => ({
  type: ACTION_TYPES.RESET_POSTS,
});

export const filterPosts = value => ({
  type: ACTION_TYPES.FILTER_POSTS,
  payload: value,
});

export const deletePost = postId => ({
  type: ACTION_TYPES.DELETE_POST,
  payload: postId,
});

export const deleteComment = commentId => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  payload: commentId,
});

const addingUsers = (postList, usersList) => postList.map(post => (
  {
    ...post,
    user: usersList.find(user => (
      user.id === post.userId
    )),
  }
));

const setDataToStore = (postsData, commentsData, users) => ({
  type: ACTION_TYPES.SET_DATA_TO_STORE,
  payload: { postsData, commentsData, users },
});

const toogleLoadingMode = () => ({
  type: ACTION_TYPES.ISLOADING_POSTS,
});

export const getData = () => (dispatch) => {
  store.dispatch(toogleLoadingMode());
  Promise
    .all([
      getDataFromServer(`${API_URl}posts`),
      getDataFromServer(`${API_URl}users`),
      getDataFromServer(`${API_URl}comments`),
    ])
    .then(([posts, users, comments]) => {
      store.dispatch(
        setDataToStore(addingUsers(posts, users), comments, users)
      );
      store.dispatch(toogleLoadingMode());
    });
};

const initialState = {
  posts: [],
  originalPosts: [],
  comments: [],
  originalComments: [],
  users: [],
  isLoading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.FILTER_POSTS:
      return {
        ...state,
        posts: [...state.originalPosts]
          .filter(({ title }) => title.includes(action.payload)),
      };
    case ACTION_TYPES.RESET_POSTS:
      return {
        ...state,
        posts: [...state.originalPosts],
        comments: [...state.originalComments],
      };
    case ACTION_TYPES.ISLOADING_TODOS:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case ACTION_TYPES.SET_DATA_TO_STORE:
      return {
        ...state,
        posts: action.payload.postsData,
        originalPosts: action.payload.postsData,
        comments: action.payload.commentsData,
        originalComments: action.payload.commentsData,
        users: action.payload.users,
      };
    case ACTION_TYPES.DELETE_POST:
      return {
        ...state,
        posts: [...state.posts].filter(item => item.id !== action.payload),
      };
    case ACTION_TYPES.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
