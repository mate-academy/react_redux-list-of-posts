import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createSelector } from 'reselect';
import getDataFromServer from '../api';

export const loadDataFromServer = () => (dispatch) => {
  dispatch(startLoad());
  return Promise.all([
    getDataFromServer('posts'),
    getDataFromServer('users'),
    getDataFromServer('comments'),
  ]).then((data) => {
    const [posts, users, comments] = data;

    const postsWithcomments = [...posts].map(post => (
      {
        ...post,
        user: users.find(person => person.id === post.userId),
        comments: comments
          .filter(comment => comment.postId === post.id)
          .map(item => ({
            ...item,
            user: users.find(person => person.email === item.email),
          })),
      }
    ));
    dispatch(finishLoad(postsWithcomments));
  }).catch(() => dispatch(errorOccur()));
};

const ACTION_TYPES = {
  DELETE_POST: 'DELETE_POST',
  DELETE_COMMENT: 'DELETE_COMMENT',
  FINISH_LOAD: 'FINISH_LOAD',
  START_LOAD: 'START_LOAD',
  SHOW_ERROR: 'SHOW_ERROR',
  CHANGE_FILTER: 'CHANGE_FILTER',
};

const finishLoad = posts => ({
  type: ACTION_TYPES.FINISH_LOAD,
  posts,
});

const startLoad = () => ({
  type: ACTION_TYPES.START_LOAD,
});

const errorOccur = () => ({
  type: ACTION_TYPES.SHOW_ERROR,
});

const initialState = {
  posts: [],
  isLoading: false,
  hasError: false,
  filter: '',
};

export const deletePost = id => ({
  type: ACTION_TYPES.DELETE_POST,
  deletedId: id,
});

export const deleteComment = id => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  deletedId: id,
});

export const changeFilter = text => ({
  type: ACTION_TYPES.CHANGE_FILTER,
  filter: text,
});

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.DELETE_COMMENT:
      return ({
        ...state,
        posts: [
          ...state.posts
            .map(item => (
              {
                ...item,
                comments: [
                  ...item.comments
                    .filter(comment => comment.id !== action.deletedId),
                ],
              })),
        ],
      });
    case ACTION_TYPES.DELETE_POST:
      return ({
        ...state,
        posts: [...state.posts.filter(item => item.id !== action.deletedId)],
      });
    case ACTION_TYPES.START_LOAD:
      return ({
        ...state,
        isLoading: true,
        hasError: false,
      });
    case ACTION_TYPES.FINISH_LOAD:
      return ({
        ...state,
        posts: [...action.posts],
        isLoading: false,
      });
    case ACTION_TYPES.SHOW_ERROR:
      return ({
        ...state,
        hasError: true,
        isLoading: false,
      });
    case ACTION_TYPES.CHANGE_FILTER:
      return ({
        ...state,
        filter: action.filter,
      });
    default:
      return state;
  }
}

const getPosts = state => state.posts;
const getFilter = state => state.filter;

export const getfilteredPosts = createSelector(
  [getPosts, getFilter],
  (posts, filter) => posts.filter(post => post.title.includes(filter))
);

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);
