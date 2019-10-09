import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const ACTION_TYPES = {
  START_LOADING: 'START_LOADING',
  HANDLE_SUCCESS: 'HANDLE_SUCCESS',
  HANDLE_ERROR: 'HANDLE_ERROR',
  DELETE_POST: 'DELETE_POST',
  DELETE_COMMENT: 'DELETE_COMMENT',
  SEARCH_POST: 'SEARCH_POST',
};

export const startLoading = () => ({
  type: ACTION_TYPES.START_LOADING,
});

export const addData = data => ({
  type: ACTION_TYPES.HANDLE_SUCCESS,
  payload: data,
});

export const handleError = () => ({
  type: ACTION_TYPES.HANDLE_ERROR,
});

export const deletePost = id => ({
  type: ACTION_TYPES.DELETE_POST,
  payload: id,
});

export const deleteComment = id => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  payload: id,
});

export const searchPost = value => ({
  type: ACTION_TYPES.SEARCH_POST,
  payload: value,
});

export const loadPosts = () => (dispatch) => {
  dispatch(startLoading());

  Promise.all([
    fetch(`${BASE_URL}/posts`),
    fetch(`${BASE_URL}/users`),
    fetch(`${BASE_URL}/comments`),
  ])
    .then(([posts, users, comments]) => Promise.all([
      posts.json(),
      users.json(),
      comments.json(),
    ]))
    .then(([posts, users, comments]) => {
      const postsWithComments = posts.map(post => ({
        ...post,
        user: users.find(user => user.id === post.userId),
        comments: comments.filter(comment => comment.postId === post.id),
      }));

      dispatch(addData(postsWithComments));
    })
    .catch(() => dispatch(handleError()));
};

const initialState = {
  posts: [],
  originalPosts: [],
  isLoaded: false,
  isLoading: false,
  hasError: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.START_LOADING: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }

    case ACTION_TYPES.HANDLE_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
        originalPosts: action.payload,
        isLoaded: true,
        isLoading: false,
      };
    }

    case ACTION_TYPES.HANDLE_ERROR: {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    }

    case ACTION_TYPES.DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        originalPosts: state.originalPosts
          .filter(post => post.id !== action.payload),
      };
    }

    case ACTION_TYPES.DELETE_COMMENT: {
      const filterComments = (array, id) => (
        array
          .map(item => ({
            ...item,
            comments: item.comments
              .filter(comment => comment.id !== id),
          }))
      );

      return {
        ...state,
        posts: filterComments(state.posts, action.payload),
        originalPosts: filterComments(state.originalPosts, action.payload),
      };
    }

    case ACTION_TYPES.SEARCH_POST: {
      return {
        ...state,
        posts: state.originalPosts.filter(post => (
          (
            post.title.includes(action.payload)
          ) || (
            post.body.includes(action.payload)
          )
        )),
      };
    }

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
