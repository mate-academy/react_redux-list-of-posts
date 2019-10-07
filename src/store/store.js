import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getData from '../utils/api';
import getPostsWithUsers from '../utils/getPostsWithUsers';
import getPostWithComments from '../utils/getPostWithComments';

const initialState = {
  postListFromServer: [],
  postList: [],
  filteredList: [],
  isLoading: false,
  isLoaded: false,
  isError: false,
  buttonText: 'Load',
};

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const FILTER_LIST = 'FILTER_LIST';
const DELETE_COMMENT = 'DELETE_COMMENT';
const DELETE_POST = 'DELETE_POST';
const RESET_LIST = 'RESET_LIST';

const startLoading = () => ({ type: START_LOADING });

const handleSuccess = postsWithComments => ({
  type: HANDLE_SUCCESS,
  postsWithComments,
});

const handleError = () => ({ type: HANDLE_ERROR });

export const loadData = () => (dispatch) => {
  dispatch(startLoading());
  Promise.all([
    getData('comments'),
    getData('posts'),
    getData('users'),
  ])
    .then(([comments, posts, users]) => {
      const postsWithComments = getPostWithComments(
        getPostsWithUsers(posts, users), comments
      );
      dispatch(handleSuccess(postsWithComments));
    })
    .catch(() => dispatch(handleError()));
};

export const filterListOfPosts = searchStr => ({
  type: FILTER_LIST,
  searchStr,
});

export const deleteComment = (postId, commentId) => ({
  type: DELETE_COMMENT,
  postId,
  commentId,
});

export const deletePost = postId => ({
  type: DELETE_POST,
  postId,
});

export const resetListOfPosts = () => ({
  type: RESET_LIST,
});

const findElemIndex = (list, elemId) => (
  list.findIndex(elem => elem.id === elemId)
);

const delPostFromState = (listOfPosts, postId) => {
  const foundPostIndex = findElemIndex(listOfPosts, postId);
  return [
    ...listOfPosts.slice(0, foundPostIndex),
    ...listOfPosts.slice(foundPostIndex + 1),
  ];
};

const delCommentFromState = (listOfPosts, postId, commentId) => {
  const foundPostIndex = findElemIndex(listOfPosts, postId);
  const foundCommentIndex = findElemIndex(
    listOfPosts[foundPostIndex].comments,
    commentId
  );

  return [
    ...listOfPosts.slice(0, foundPostIndex),

    {
      ...listOfPosts[foundPostIndex],
      comments: [
        ...listOfPosts[foundPostIndex]
          .comments.slice(0, foundCommentIndex),

        ...listOfPosts[foundPostIndex]
          .comments.slice(foundCommentIndex + 1),
      ],
    },

    ...listOfPosts.slice(foundPostIndex + 1),
  ];
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        buttonText: 'loading...',
        isLoading: true,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        postListFromServer: action.postsWithComments,
        postList: action.postsWithComments,
        filteredList: action.postsWithComments,
        isLoaded: true,
        isLoading: false,
        isError: false,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        buttonText: 'try again',
        isLoaded: false,
        isLoading: false,
        isError: true,
      };

    case FILTER_LIST:
      return {
        ...state,
        filteredList: action.searchStr
          ? state.postList
            .filter(post => (
              (post.title.indexOf(action.searchStr) >= 0)
            || (post.body.indexOf(action.searchStr) >= 0)
            ))
          : [...state.postList],
      };

    case DELETE_COMMENT:
      return {
        ...state,
        postList: delCommentFromState(
          state.postList, action.postId, action.commentId
        ),
        filteredList: delCommentFromState(
          state.filteredList, action.postId, action.commentId
        ),
      };

    case DELETE_POST:
      return {
        ...state,
        postList: delPostFromState(state.postList, action.postId),
        filteredList: delPostFromState(state.filteredList, action.postId),
      };

    case RESET_LIST:
      return {
        ...state,
        postList: [...state.postListFromServer],
        filteredList: [...state.postListFromServer],
      };

    default: return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
