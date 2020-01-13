import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getPosts } from './api/posts';
import { getUsers } from './api/users';
import { getComments } from './api/comments';

const LOADING = 'LOADING';
const LOADING_SUCCESS = 'LOADING_SUCCESS';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';
const SET_POST = 'SET_POST';

export const isLoading = value => ({
  type: LOADING, value,
});
export const loadingSuccess = postsWithUsers => ({
  type: LOADING_SUCCESS, postsWithUsers,
});
export const setPost = posts => ({
  type: SET_POST, posts,
});
export const deletePost = id => ({
  type: DELETE_POST, id,
});
export const deleteComment = id => ({
  type: DELETE_COMMENT, id,
});

export const loadData = () => async(dispatch) => {
  dispatch(isLoading(true));

  const [
    postsFromServer,
    usersFromServer,
    commentsFromServer,
  ] = await Promise.all([
    getPosts(),
    getUsers(),
    getComments(),
  ]);

  const postsWithUsers = (postsFromServer.map(
    post => ({
      ...post,
      user: usersFromServer.find(user => user.id === post.userId),
      comments: commentsFromServer
        .filter(comment => comment.postId === post.id),
    })
  ));

  dispatch(setPost(postsWithUsers));
  dispatch(isLoading(false));
};

const initialState = {
  postsWithUsers: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: action.value,
      };

    case LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case SET_POST:
      return {
        ...state,
        postsWithUsers: action.posts,
      };

    case DELETE_POST:
      return {
        ...state,
        postsWithUsers: state.postsWithUsers
          .filter(post => post.id !== action.id),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        postsWithUsers: state.postsWithUsers.map(post => ({
          ...post,
          comments: post.comments.filter(comment => comment.id !== action.id),
        })),

      };
    default:
      return state;
  }
};

// const rootReducer = combineReducers({
//   postsWithUsers: postsReducer,
//   isLoading: loadingReducer,
//   loadingSuccess: loadingSuccessReducer,
// });

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
