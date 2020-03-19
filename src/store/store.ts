import {
  createStore, AnyAction, applyMiddleware, Dispatch, Reducer
} from 'redux';
import thunk from 'redux-thunk';
import {
  getCommentsFromAPI, getUsersFromAPI, getPostsFromAPI
} from '../util';

import { ActionTypes } from './actionTypes'
import {
  setLoading,
  setError,
  setPosts
} from './actionCreators'

const initStore: StoragePosts = {
  posts: [] as PostWithComments[],
  isError: false,
  isLoading: false,
  query: '',
  filterQuery: '',
};

export const reducer: Reducer = (store: StoragePosts = initStore, action: AnyAction): StoragePosts => {
  if (store === undefined) {
    return {
      posts: [] as PostWithComments[],
      isError: false,
      isLoading: false,
      query: '',
      filterQuery: '',
    };
  }

  switch (action.type) {
    case ActionTypes.TYPE_DELETE_COMMENT: {
      return {
        ...store,
        posts: store.posts.map(post => {
          if (post.id !== action.postId) {
            return { ...post };
          }

          return {
            ...post,
            comments: post.comments.filter(comment => (
              comment.id !== action.commentId
            )),
          };
        }),
      };
    }

    case ActionTypes.TYPE_DELETE_POST: {
      return {
        ...store,
        posts: store.posts.filter(item => item.id !== action.value) };
    }

    case ActionTypes.TYPE_SET_POSTS: {
      return { ...store, posts: action.value };
    }

    case ActionTypes.TYPE_SET_ERROR: {
      return { ...store, isError: action.value };
    }

    case ActionTypes.TYPE_SET_LOADING: {
      return { ...store, isLoading: action.value };
    }

    case ActionTypes.TYPE_SET_QUERY: {
      return { ...store, query: action.value };
    }

    case ActionTypes.TYPE_SET_FILTERED_QUERY: {
      return { ...store, filterQuery: action.value };
    }

    default: {
      return store;
    }
  }
};

export const loadData = () => {
  return (dispatch: Dispatch) => {
    dispatch(setError(false));
    dispatch(setLoading(true));

    return Promise.all([
      getUsersFromAPI(),
      getPostsFromAPI(),
      getCommentsFromAPI(),
    ]).then(([usersFromApi, postsFromApi, commentsFromApi]) => {
      dispatch(setLoading(false));
      const newPosts = postsFromApi.map(post => {
        return {
          ...post,
          user: (usersFromApi.find(item => item.id === post.userId) as User),
          comments: commentsFromApi.filter(item => item.postId === post.id),
        };
      });
      dispatch(setPosts(newPosts));
    }).catch(() => {
      dispatch(setError(true));
      dispatch(setLoading(false));
    });
  };
};

export const store = createStore(reducer, initStore, applyMiddleware(thunk));
