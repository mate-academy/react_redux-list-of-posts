import { createStore, AnyAction, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Dispatch } from 'react';
import thunk from 'redux-thunk';
import { getPreparedPosts } from '../helpers/api';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_POSTS = 'SET_POSTS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const SET_QUERY = 'SET_QUERY';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const setPosts = (posts: Post[]) => ({ type: SET_POSTS, posts });
export const handleError = (errorMessage: string) => ({
  type: HANDLE_ERROR,
  errorMessage,
});
export const deletePost = (postId: number) => ({
  type: DELETE_POST,
  postId,
});

export const deleteComment = (commentId: number) => ({
  type: DELETE_COMMENT,
  commentId,
});

export const setQuery = (query: string) => (
  {
    type: SET_QUERY,
    query,
  }
);

export const getIsLoading = (state: RootState) => state.isLoading;
export const getQuery = (state: RootState) => state.query;
export const getError = (state: RootState) => state.errorMessage;
export const getVisiblePosts = (state: RootState) => {
  return state.posts
    .filter((post: Post) => (
      (post.title + post.body)
        .toLowerCase().includes(state.query.trim().toLowerCase())
    ));
};

export type RootState = {
  posts: Post[];
  query: string;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: RootState = {
  posts: [],
  query: '',
  isLoading: false,
  errorMessage: '',
};

const rootReducer = (state = initialState, action: AnyAction): RootState => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };

    case SET_POSTS:
      return {
        ...state,
        posts: [...action.posts],
      };

    case HANDLE_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
      };

    case FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts].filter(post => post.id !== action.postId),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        posts: [...state.posts].map(post => ({
          ...post,
          comments: post.comments.filter(comment => comment.id !== action.commentId),
        })),
      };

    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      };


    default: return state;
  }
};

export const loadPosts = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(startLoading());
    try {
      const postsFromServer = await getPreparedPosts();

      dispatch(setPosts(postsFromServer));
    } catch (error) {
      dispatch(handleError('Error '));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
