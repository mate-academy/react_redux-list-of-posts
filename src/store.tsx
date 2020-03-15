import {
  Reducer,
  createStore,
  applyMiddleware,
  Dispatch,
} from 'redux';
import thunk from 'redux-thunk';
import { Actions } from './actionTypes';

import { getPosts, getUsers, getComments } from './api/api';

const LOAD_POSTS = 'LOAD_POSTS';
const SET_LOADING = 'SET_LOADING';
const SET_STARTED = 'SET_STARTED';
const SET_QUERY = 'SET_QUERY';
const SET_FILTER_QUERY = 'SET_FILTER_QUERY';
const REMOVE_POST = 'REMOVE_POST';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

const initialState: State = {
  posts: [],
  isLoading: false,
  isStarted: true,
  query: '',
  filterQuery: '',
};

export const setPosts = (payload: PostWithComments[]) => ({
  type: LOAD_POSTS,
  payload,
});

export const setLoading = (payload: boolean) => ({
  type: SET_LOADING,
  payload,
});

export const setStarted = (payload: boolean) => ({
  type: SET_STARTED,
  payload,
});

export const setQuery = (payload: string) => ({
  type: SET_QUERY,
  payload,
});

export const setFilterQuery = (payload: string) => ({
  type: SET_FILTER_QUERY,
  payload,
});

export const removePost = (payload: number) => ({
  type: REMOVE_POST,
  payload,
});

export const removeComment = (payload: number) => ({
  type: REMOVE_COMMENT,
  payload,
});

export const loadPosts = () => {
  return (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    Promise.all([getPosts(), getUsers(), getComments()])
      .then(([postsFromApi, usersFromApi, commentsFromApi]) => {
        const preparedPosts = postsFromApi.map(post => ({
          ...post,
          user: usersFromApi.find(person => post.userId === person.id) as User,
          comments: commentsFromApi.filter(comment => post.id === comment.postId) as Comments,
        }));

        dispatch(setPosts(preparedPosts));
        dispatch(setLoading(false));
        dispatch(setStarted(false));
      });
  };
};

export const handleInputChange = (value: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setQuery(value));
  };
};

const todosReducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_STARTED:
      return {
        ...state,
        isStarted: action.payload,
      };

    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case SET_FILTER_QUERY:
      return {
        ...state,
        filterQuery: action.payload,
      };

    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };

    case REMOVE_COMMENT:
      return {
        ...state,
        posts: (state.posts as PostWithComments[]).map((post: PostWithComments) => ({
          ...post,
          comments: post.comments.filter(comment => comment.id !== action.payload),
        })),
      };

    default:
      return state;
  }
};

export const store = createStore(todosReducer, initialState, applyMiddleware(thunk));
