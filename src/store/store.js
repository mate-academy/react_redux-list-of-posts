import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const ACTION_TYPES = {
  GET_POSTS: 'GET::POSTS',
  TOGGLE_LOADING: 'TOGGLE::LOADING',
  FILTER: 'FILTER',
  DELETE_POST: 'DELETE::POST',
  DELETE_COMMENT: 'DELETE::COMMENT',
  RESET: 'RESET',
  HANDLE_INPUT: 'HANDLE::INPUT',
};

const initialState = {
  posts: [],
  filteredPosts: [],
  isLoading: false,
  isLoaded: false,
  isFiltered: false,
  searchWord: '',
};

export const addPosts = posts => ({
  type: ACTION_TYPES.GET_POSTS,
  payload: posts,
});

export const toggleLoading = isLoading => ({
  type: ACTION_TYPES.TOGGLE_LOADING,
  payload: isLoading,
});

export const filterPosts = () => ({
  type: ACTION_TYPES.FILTER,
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
  type: ACTION_TYPES.RESET,
  payload: '',
});

export const getPosts = () => (dispatch) => {
  dispatch(toggleLoading(true));

  Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts'),
    fetch('https://jsonplaceholder.typicode.com/users'),
    fetch('https://jsonplaceholder.typicode.com/comments'),
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

    case ACTION_TYPES.FILTER: {
      return {
        ...state,
        filteredPosts: state.posts
          .filter(el => el.title.includes(state.searchWord)
            || el.body.includes(state.searchWord)),
        isFiltered: state.searchWord !== '',
        searchWord: '',
      };
    }

    case ACTION_TYPES.DELETE_POST: {
      const posts = state.posts.filter(el => el.id !== action.payload);
      const filteredPosts = state.filteredPosts
        .filter(el => el.id !== action.payload);

      return {
        ...state,
        posts,
        filteredPosts,
      };
    }

    case ACTION_TYPES.DELETE_COMMENT: {
      const posts = state.posts.map(el => ({
        ...el,
        comments: el.comments.filter(elem => elem.id !== action.payload),
      }));
      const filteredPosts = state.filteredPosts.map(el => ({
        ...el,
        comments: el.comments.filter(elem => elem.id !== action.payload),
      }));

      return {
        ...state,
        posts,
        filteredPosts,
      };
    }

    case ACTION_TYPES.RESET: {
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
