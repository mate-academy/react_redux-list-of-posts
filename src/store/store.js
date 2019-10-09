import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const ACTION_TYPES = {
  GET_POSTS: 'POSTS::GET',
  TOGGLE_LOADING: 'TOGGLE::LOADING',
  FILTER_POSTS: 'POSTS::FILTER',
  DELETE_POST: 'POST::DELETE',
  DELETE_COMMENT: 'COMMENT::DELETE',
  RESET_FILTER: 'FILTER::RESET',
  HANDLE_INPUT: 'INPUT::HANDLE',
};

const initialState = {
  posts: [],
  filteredPosts: [],
  isLoading: false,
  isLoaded: false,
  isFiltered: false,
  searchWord: '',
};

const baseURL = 'https://jsonplaceholder.typicode.com/';

export const addPosts = posts => ({
  type: ACTION_TYPES.GET_POSTS,
  payload: posts,
});

export const toggleLoading = isLoading => ({
  type: ACTION_TYPES.TOGGLE_LOADING,
  payload: isLoading,
});

export const filterPosts = () => ({
  type: ACTION_TYPES.FILTER_POSTS,
});

export const deletePost = id => ({
  type: ACTION_TYPES.DELETE_POST,
  payload: id,
});

export const deleteComment = id => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  payload: id,
});

export const handleSearchInputChange = value => ({
  type: ACTION_TYPES.HANDLE_INPUT,
  payload: value,
});

export const resetPostsFiltering = () => ({
  type: ACTION_TYPES.RESET_FILTER,
  payload: '',
});

export const getPosts = () => (dispatch) => {
  dispatch(toggleLoading(true));

  Promise.all([
    fetch(`${baseURL}posts`),
    fetch(`${baseURL}users`),
    fetch(`${baseURL}comments`),
  ])
    .then(([posts, users, comments]) => Promise
      .all([posts.json(), users.json(), comments.json()]))
    .then(([posts, users, comments]) => {
      const usersMap = users
        .reduce((acc, currentUser) => ({
          ...acc,
          [currentUser.id]: currentUser.name,
        }), {});

      const preparedPosts = posts.map(post => ({
        ...post,
        user: usersMap[post.userId],
        comments: comments.filter(el => el.postId === post.id),
      }));

      dispatch(addPosts(preparedPosts));
      dispatch(toggleLoading('loaded'));
    });
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.GET_POSTS: {
      return {
        ...state,
        posts: [
          ...action.payload,
        ],
        filteredPosts: [
          ...action.payload,
        ],
      };
    }

    case ACTION_TYPES.TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: true,
        isLoaded: action.payload === 'loaded',
      };
    }

    case ACTION_TYPES.FILTER_POSTS: {
      return {
        ...state,
        filteredPosts: state.posts
          .filter(el => el.body.includes(state.searchWord)),
        isFiltered: state.searchWord !== '',
        searchWord: '',
      };
    }

    case ACTION_TYPES.DELETE_POST: {
      const callback = el => el.id !== action.payload;
      const posts = state.posts.filter(callback);
      const filteredPosts = state.filteredPosts.filter(callback);

      return {
        ...state,
        posts,
        filteredPosts,
      };
    }

    case ACTION_TYPES.DELETE_COMMENT: {
      const callback = el => ({
        ...el,
        comments: el.comments.filter(elem => elem.id !== action.payload),
      });
      const posts = state.posts.map(callback);
      const filteredPosts = state.filteredPosts.map(callback);

      return {
        ...state,
        posts,
        filteredPosts,
      };
    }

    case ACTION_TYPES.RESET_FILTER: {
      return {
        ...state,
        filteredPosts: state.posts,
        isFiltered: false,
      };
    }

    case ACTION_TYPES.HANDLE_INPUT: {
      return {
        ...state,
        searchWord: action.payload,
      }
    }

    default:
      return state;
  }
}

export const store = createStore(reducer, applyMiddleware(thunk));
