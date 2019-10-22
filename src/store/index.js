import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getComments } from '../api/getComments';
import { getPosts } from '../api/getPosts';
import { getUsers } from '../api/getUsers';

const ACTION_TYPES = {
  SEARCH_POST: 'SEARCH_POST',
  SWITCH_LOADING_STATE: 'SWITCH_LOADING_STATE',
  GET_DATA: 'GET_DATA',
};

export const loading = () => ({
  type: ACTION_TYPES.SWITCH_LOADING_STATE,
});

export const getData = (users, posts, comments) => ({
  type: ACTION_TYPES.GET_DATA,
  payload: {
    users,
    posts,
    comments,
  },
});

export const loadData = () => (dispatch) => {
  store.dispatch(loading());
  Promise.all([getComments(), getUsers(), getPosts()]).then(
    ([comments, users, posts]) => {
      store.dispatch(getData(users, UserToPosts(posts, users), comments));
      store.dispatch(loading());
    }
  );
};

export const searchPost = ({ target }) => ({
  type: ACTION_TYPES.SEARCH_POST,
  payload: target,
});

function UserToPosts(listPost, listUser) {
  return listPost.map(post => ({
    ...post,
    user: listUser.find(user => user.id === post.userId),
  }));
}

const initialState = {
  preparedPosts: [],
  originalPosts: [],
  users: [],
  comments: [],
  isLoading: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.SWITCH_LOADING_STATE:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case ACTION_TYPES.GET_DATA:
      return {
        ...state,
        preparedPosts: action.payload.posts,
        originalPosts: action.payload.posts,
        comments: action.payload.comments,
        users: action.payload.users,
      };
    case ACTION_TYPES.SEARCH_POST:
      return {
        ...state,
        preparedPosts: state.originalPosts.filter(
          post => post.title
            .toLowerCase()
            .includes(action.payload.value.toLowerCase())
            || post.body.toLowerCase().includes(action.payload.value.toLowerCase())
        ),
      };
    default:
      return state;
  }
}

export const store = createStore(reducer, applyMiddleware(thunk));
