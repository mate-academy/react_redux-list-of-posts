import {
  createStore, AnyAction, applyMiddleware, Dispatch, Reducer
} from 'redux';
import thunk from 'redux-thunk';
import {
  getCommentsFromAPI, getUsersFromAPI, getPostsFromAPI
} from './util';

const initStore: StoragePosts = {
  posts: [] as PostWithComments[],
  isError: false,
  isLoading: false,
  query: '',
  filterQuery: '',
};

const TYPE_SET_POSTS = 'TYPE_SET_POSTS';
const TYPE_SET_ERROR = 'TYPE_SET_ERROR';
const TYPE_SET_LOADING = 'TYPE_SET_LOADING';
const TYPE_SET_QUERY = 'TYPE_SET_QUERY';
const TYPE_SET_FILTERED_QUERY = 'TYPE_SET_FILTERED_QUERY';
const TYPE_DELETE_POST = 'TYPE_DELETE_POST';
const TYPE_DELETE_COMMENT = 'TYPE_DELETE_COMMENT';


export const getPosts = (state: StoragePosts) => state.posts;
export const getError = (state: StoragePosts) => state.isError;
export const getLoading = (state: StoragePosts) => state.isLoading;
export const getQuery = (state: StoragePosts) => state.query;
export const getFilteredQuery = (state: StoragePosts) => state.filterQuery;

export const setPosts = (value: PostWithComments[]): AnyAction => ({ type: TYPE_SET_POSTS, value });
export const setError = (value: boolean): AnyAction => ({ type: TYPE_SET_ERROR, value });
export const setLoading = (value: boolean): AnyAction => ({ type: TYPE_SET_LOADING, value });
export const setQuery = (value: string): AnyAction => ({ type: TYPE_SET_QUERY, value });
export const setFilteredQuery = (value: string): AnyAction => ({
  type: TYPE_SET_FILTERED_QUERY, value,
});
export const deletePost = (value: number): AnyAction => ({ type: TYPE_DELETE_POST, value });
export const deleteComment = (postId: number, commentId: number): AnyAction => ({
  type: TYPE_DELETE_COMMENT, postId, commentId,
});


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
    case 'TYPE_DELETE_COMMENT': {
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

    case 'TYPE_DELETE_POST': {
      return { ...store, posts: store.posts.filter(item => item.id !== action.value) };
    }

    case 'TYPE_SET_POSTS': {
      return { ...store, posts: action.value };
    }

    case 'TYPE_SET_ERROR': {
      return { ...store, isError: action.value };
    }

    case 'TYPE_SET_LOADING': {
      return { ...store, isLoading: action.value };
    }

    case 'TYPE_SET_QUERY': {
      return { ...store, query: action.value };
    }

    case 'TYPE_SET_FILTERED_QUERY': {
      return { ...store, filterQuery: action.value };
    }

    default: {
      return store;
    }
  }
};

export const loadAllData = () => {
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
