import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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

export const ACTION_TYPES = {
  DELETE_POST: 'DELETE_POST',
  DELETE_COMMENT: 'DELETE_COMMENT',
  FINISH_LOAD: 'FINISH_LOAD',
  START_LOAD: 'START_LOAD',
  HAS_ERROR: 'HAS_ERROR',
};

const finishLoad = posts => ({
  type: ACTION_TYPES.FINISH_LOAD,
  posts,
});

const startLoad = () => ({
  type: ACTION_TYPES.START_LOAD,
});

const errorOccur = () => ({
  type: ACTION_TYPES.HAS_ERROR,
});

const initialState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

export const deletePost = id => ({
  type: ACTION_TYPES.DELETE_POST,
  deleleId: id,
});

export const deleteComment = id => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  deleteId: id,
});

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.DELETE_COMMENT:
      return ({
        ...state,
        posts: [...state.posts.map(item => ({ ...item, comments: item.comments.filter(comment => comment.id !== action.deleteId) }))],
      });
    case ACTION_TYPES.DELETE_POST:
      return ({
        ...state,
        posts: [...state.posts.filter(item => item.id !== action.deleleId)],
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
    case ACTION_TYPES.HAS_ERROR:
      return ({
        hasError: true,
        isLoading: false,
      });
    default:
      return state;
  }
}

export const getPosts = state => state.posts;

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);
