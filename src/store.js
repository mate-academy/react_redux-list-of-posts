import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getPosts, getUsers, getComments } from './postsApi';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_POSTS = 'GET_POSTS';
const SET_USERS = 'GET_USERS';
const SET_COMMENTS = 'GET_COMMENTS';
const PREPARE_POSTS = 'PREPARE_POSTS';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';
const HANDLE_CHANGE = 'HANDLE_CHANGE';
const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const handleChange = eventValue => ({
  type: HANDLE_CHANGE,
  eventValue,
});

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const getSearchTermValue = searchTerm => ({
  type: SET_SEARCH_TERM,
  searchTerm,
});
export const getPostsFromServer = posts => ({
  type: SET_POSTS,
  posts,
});
export const getUsersFromServer = users => ({
  type: SET_USERS,
  users,
});
export const getCommentsFromServer = comments => ({
  type: SET_COMMENTS,
  comments,
});
export const preparePosts = preparedPosts => ({
  type: PREPARE_POSTS,
  preparedPosts,
});
export const deletePost = id => ({
  type: DELETE_POST,
  id,
});
export const deleteComment = id => ({
  type: DELETE_COMMENT,
  id,
});

export const getSearchTerm = state => state.searchTerm;
export const getIsloading = state => state.isLoading;
export const getisShown = state => state.isShown;
export const getPostsWithComments = state => state.preparedPosts
  .filter(post => post.title.toLowerCase()
    .includes(state.searchTerm)
|| post.body.toLowerCase()
  .includes(state.searchTerm));

export const loadPreparedPosts = () => async(dispatch) => {
  await dispatch(startLoading());

  const [posts, users, comments] = await Promise.all(
    [getPosts(), getUsers(), getComments()]
  );

  const preparedPosts = await posts.map((post) => {
    const user = users.find(person => person.id === post.userId);
    const postComments = comments.filter(comment => comment.postId === post.id);

    return {
      ...post,
      user,
      postComments,
    };
  });

  dispatch(getPostsFromServer(posts));
  dispatch(getUsersFromServer(users));
  dispatch(getCommentsFromServer(comments));
  dispatch(preparePosts(preparedPosts));
};

const initialState = {
  posts: [],
  users: [],
  comments: [],
  isLoading: false,
  isShown: true,
  preparedPosts: [],
  searchTerm: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
        isShown: false,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,

      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    case PREPARE_POSTS:
      return {
        ...state,
        preparedPosts: action.preparedPosts,
      };
    case DELETE_POST:
      return {
        ...state,
        preparedPosts: state.preparedPosts
          .filter(post => post.id !== action.id),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        preparedPosts: state.preparedPosts
          .map(post => ({
            ...post,
            postComments: post.postComments
              .filter(comment => comment.id !== action.id),
          })),
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        searchTerm: action.eventValue.trim().toLowerCase(),
      };
    default: return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
