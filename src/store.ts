import {AnyAction, applyMiddleware, createStore, Dispatch} from 'redux';
import thunk from 'redux-thunk';
import { PostsWithUserAndComments, State } from './constants/types';
import {getPostsWithUserAndComments} from "./utils/api";

const initialState: State = {
  posts: [],
  isLoading: false,
  query: '',
};

// types
export const SET_POSTS = 'SET_POSTS';
export const SET_LOADING = 'SET_LOADING';
export const DELETE_POST = 'DELETE_POST';
export const SET_QUERY = 'SET_QUERY';

// actions
export const setPosts = (value: PostsWithUserAndComments[]) => ({ type: SET_POSTS, value });
export const setLoading = (value: boolean) => ({ type: SET_LOADING, value });
export const deletePost = (value: number) => ({ type: DELETE_POST, value });
export const setQuery = (value: string) => ({ type: SET_QUERY, value });

// selectors
export const getPosts = (state: State) => state.posts;
export const getLoading = (state: State) => state.isLoading;
export const getQuery = (state: State) => state.query;

// thunk
export const loadData = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      const filteredPosts = await getPostsWithUserAndComments();

      dispatch(setPosts(filteredPosts));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.value,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.value,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts].filter(item => item.id !== action.value),
      };
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);
