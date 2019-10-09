import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const START_LOADING = 'START_LOADING';
const HANDLE_SECCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERORR';
const SORT_BY_TITLE = 'SORT_BY_TITLE';
const SORT_BY_TITLE_REVERSE = 'SORT_BY_TITLE_REVERSE';
const REMOVE_POST = 'REMOVE_POST';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

const startLoading = () => ({
  type: START_LOADING,
});

const handleSeccess = posts => ({
  type: HANDLE_SECCESS,
  posts,
});

const handleError = () => ({
  type: HANDLE_ERROR,
});

export const sortByTitle = () => ({
  type: SORT_BY_TITLE,
});

export const sortByTitleReverse = () => ({
  type: SORT_BY_TITLE_REVERSE,
});

export const removePost = postId => ({
  type: REMOVE_POST,
  payload: postId,
});

export const removeComment = commentId => ({
  type: REMOVE_COMMENT,
  payload: commentId,
});

export const loadData = () => (dispatch) => {
  dispatch(startLoading());

  return Promise.all([
    fetch(`${BASE_URL}posts`),
    fetch(`${BASE_URL}users`),
    fetch(`${BASE_URL}comments`),
  ])
    .then(responses => Promise.all(responses.map(respons => respons.json())))
    .then(([postsDate, usersDate, commentsDate]) => {
      const posts = postsDate.map(
        post => ({
          ...post,
          user: usersDate.find(user => user.id === post.userId),
          comments: commentsDate.filter(
            comment => comment.postId === post.id
          ),
        })
      );
      console.log(posts);
      dispatch(handleSeccess(posts));
    })
    .catch(() => dispatch(handleError()));
};

const initialState = {
  listWithUsersCommentsPosts: [],
  filteredList: [],
  isLoading: false,
  isLoaded: false,
  hasError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case HANDLE_SECCESS:
      return {
        ...state,
        hasError: false,
        isLoaded: true,
        isLoading: false,
        listWithUsersCommentsPosts: action.posts,
        filteredList: action.posts,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case SORT_BY_TITLE:
      return {
        ...state,
        filteredList: [...state.listWithUsersCommentsPosts]
          .sort((a, b) => (a.title > b.title ? 1 : -1)),
      };
    case SORT_BY_TITLE_REVERSE:
      return {
        ...state,
        filteredList: [...state.listWithUsersCommentsPosts]
          .sort((a, b) => (a.title > b.title ? 1 : -1)).reverse(),
      };
    case REMOVE_POST:
      return {
        ...state,
        listWithUsersCommentsPosts: [...state.listWithUsersCommentsPosts]
          .filter(item => item.id !== action.payload),
        filteredList: [...state.filteredList]
          .filter(item => item.id !== action.payload),
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        listWithUsersCommentsPosts: [...state.listWithUsersCommentsPosts]
          .map(post => ({
            ...post,
            comments: [...post.comments]
              .filter(comment => comment.id !== action.payload),
          })),
        filteredList: [...state.filteredList]
          .map(post => ({
            ...post,
            comments: [...post.comments]
              .filter(comment => comment.id !== action.payload),
          })),
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
