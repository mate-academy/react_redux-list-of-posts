import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { getComments } from './api/comments';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';

const ACTION_TYPES = {
  ADD_DATA: 'ADD_DATA',
  LOAD_DATA: 'LOAD_DATA',
  DELETE_POST: 'DELETE_POST',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const loadData = data => ({
  type: ACTION_TYPES.LOAD_DATA,
  payload: data,
});

export const addData = data => ({
  type: ACTION_TYPES.ADD_DATA,
  payload: data,
});

export const handleDeletePost = postId => ({
  type: ACTION_TYPES.DELETE_POST,
  payload: postId,
});

export const handleDeleteComment = (postId, commentId) => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  postId,
  commentId,
});

const initialState = {
  data: [],
  isLoading: false,
  isReady: true,
};

export const getData = () => (dispatch) => {
  store.dispatch(loadData());

  Promise.all([getPosts(), getComments(), getUsers()])
    .then(([listOfPosts, listOfComments, listOfUsers]) => dispatch(
      addData(listOfPosts.map(post => (
        {
          ...post,
          user: listOfUsers
            .find(user => user.id === post.userId),
          comments: listOfComments
            .filter(comment => comment.postId === post.id),
        }
      ))),
      store.dispatch(loadData())
    ));
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case ACTION_TYPES.LOAD_DATA: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }

    case ACTION_TYPES.DELETE_POST: {
      return {
        ...state,
        data: state.data.filter(post => post.id !== action.payload),
      };
    }

    case ACTION_TYPES.DELETE_COMMENT: {
      return {
        ...state,
        data: state.data.map(post => (post.id === action.postId
          ? {
            ...post,
            comments: post.comments
              .filter(comment => comment.id !== action.commentId),
          }
          : post)),
      };
    }

    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
