import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { getData } from '../api/data';

// action types
const ACTION_TYPES = {
  LOAD_POSTS_REQUEST: 'LOAD_POSTS_REQUEST',
  LOAD_POSTS_SUCCESS: 'LOAD_POSTS_SUCCESS',
  GET_DATA: 'GET_DATA',
};

// action creators
export const loading = () => ({
  type: ACTION_TYPES.LOAD_POSTS_REQUEST,
});

export const loaded = () => ({
  type: ACTION_TYPES.LOAD_POSTS_SUCCESS,
});

export const getPostsWithUsers = (posts, users, comments) => ({
  type: ACTION_TYPES.GET_DATA,
  posts,
  comments,
  users,
});

export const getDataFromApi = () => (dispatch) => {
  dispatch(loading());
  Promise.all(
    [getData('posts'),
      getData('users'),
      getData('comments')]
  ).then(([posts, users, comments]) => {
    dispatch(loading());
    dispatch(getPostsWithUsers(posts, users, comments));
    dispatch(loaded());
  });
};

const initialState = {
  posts: [],
  isLoading: false,
  isLoaded: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.LOAD_POSTS_REQUEST: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    case ACTION_TYPES.LOAD_POSTS_SUCCESS: {
      return {
        ...state,
        isLoaded: !state.isLoaded,
      };
    }
    case ACTION_TYPES.GET_DATA: {
      return {
        ...state,
        posts: action.posts.map(post => ({
          ...post,
          users: action.users.find(item => item.id === post.userId),
          comments: action.comments.filter(comment => comment.postId === post.id),
        })),
      };
    }
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);
