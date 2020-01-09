import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getUsersFromServer,
  getPostsFromServer,
  getCommentsFromServer } from '../api/FetchData';

const START_LOAD = 'START_LOAD';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_DELETE = 'HANDLE_DELETE';
const HANDLE_SEARCH = 'HANDLE_SEARCH';

export const startLoad = () => ({ type: START_LOAD });

export const handleSuccess = postsList => ({
  type: HANDLE_SUCCESS, postsList,
});

export const handleDelete = payload => ({
  type: HANDLE_DELETE, payload,
});

export const handleSearch = value => ({
  type: HANDLE_SEARCH, value,
});

export const loadPosts = () => async(dispatch) => {
  dispatch(startLoad());

  const [postsData, usersData, commentsData] = await Promise.all([
    getPostsFromServer(),
    getUsersFromServer(),
    getCommentsFromServer(),
  ]);

  const allData = postsData.map(
    post => ({
      ...post,
      user: usersData.find(
        user => post.userId === user.id
      ),
      comments: commentsData.filter(
        comment => post.id === comment.postId
      ),
    })
  );

  dispatch(handleSuccess(allData));
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOAD:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        postsList: action.postsList,
        isLoading: true,
      };

    case HANDLE_DELETE:
      return {
        ...state,
        postsList: state.postsList.filter(item => item.id !== action.payload),
        mixedPosts: state.postsList.filter(item => item.id !== action.payload),
      };

    case HANDLE_SEARCH:
      return {
        ...state,
        mixedPosts: state.postsList.filter(({ title, body }) => (
          (title + body).toLowerCase().includes(action.value))),
      };

    default:
      return state;
  }
};

const initialState = {
  postsList: [],
  mixedPosts: null,
  isLoaded: false,
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
