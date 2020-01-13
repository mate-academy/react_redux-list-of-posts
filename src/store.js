import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { getComments } from './api/comments';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';

const ACTION_TYPES = {
  ADD_DATA: 'ADD_DATA',
  LOAD_DATA: 'LOAD_DATA',
  DELETE_DATA: 'DELETE_DATA',
};

const loadData = data => ({
  type: ACTION_TYPES.LOAD_DATA,
  payload: data,
});

export const addData = data => ({
  type: ACTION_TYPES.ADD_DATA,
  payload: data,
});

export const handleDelete = idItem => ({
  type: ACTION_TYPES.DELETE_DATA,
  payload: idItem,
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

    case ACTION_TYPES.DELETE_DATA: {
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload),
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
