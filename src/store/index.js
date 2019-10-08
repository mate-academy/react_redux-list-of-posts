import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const ACTION_TYPES = {
  ADD_POSTS: 'POSTS::ADD',
  SWITCH_LOADING: 'LOADING::SWITCH',
  IS_INITIALIZED: 'INITIALIZED::IS',
  HAS_ERROR: 'ERROR::HAS',
  IS_SORT: 'IS::SORT',
  ADD_SORTED_POSTS: 'SORTED_POSTS::ADD',
  DELETE_POST: 'POST::DELETE',
  ADD_TEXT: 'TEXT::ADD',
  POSTS_SORT: 'POST::SORT',
  RESET_FILTER: 'RESET::FILTER',
  DELETE_COMMENT: 'DELETE::COMMENT',
};

export const deletePost = idPost => ({
  type: ACTION_TYPES.DELETE_POST,
  payload: idPost,
});

export const deleteComment = (idComment, idPost) => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  payload: idComment,
  idPost,
});

export const addPosts = posts => ({
  type: ACTION_TYPES.ADD_POSTS,
  payload: posts,
});

export const resetFilter = () => ({
  type: ACTION_TYPES.RESET_FILTER,
});

export const addTextForFilter = text => ({
  type: ACTION_TYPES.ADD_TEXT,
  payload: text,
});

export const sortPosts = (event) => {
  event.preventDefault();

  return {
    type: ACTION_TYPES.POSTS_SORT,
  };
};

export const addSortedPosts = postsSorted => ({
  type: ACTION_TYPES.ADD_SORTED_POSTS,
  payload: postsSorted,
});

export const switchLoading = isLoading => ({
  type: ACTION_TYPES.SWITCH_LOADING,
  payload: isLoading,
});

export const initialized = isInitialized => ({
  type: ACTION_TYPES.IS_INITIALIZED,
  payload: isInitialized,
});

export const errorPosts = hasError => ({
  type: ACTION_TYPES.HAS_ERROR,
  payload: hasError,
});

export const receivePosts = () => (dispatch) => {
  dispatch(switchLoading(true));
  dispatch(initialized(true));
  dispatch(errorPosts(false));

  Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts'),
    fetch('https://jsonplaceholder.typicode.com/users'),
    fetch('https://jsonplaceholder.typicode.com/comments'),
  ])
    .then(([responsePosts, responseUsers, responseComments]) => Promise
      .all([
        responsePosts.json(),
        responseUsers.json(),
        responseComments.json(),
      ]))
    .then(([posts, users, comments]) => {
      const usersMapApi = users
        .reduce((acum, user) => ({ ...acum, [user.id]: user }), {});

      function getFullPosts(postsArg, commentsArg, usersMapApiArg) {
        return postsArg.map(post => ({
          ...post,
          comments: commentsArg.filter(comment => comment.postId === post.id),
          user: usersMapApiArg[post.userId],
        }));
      }

      const preparedPosts = getFullPosts(posts, comments, usersMapApi);
      const sortedPosts = getFullPosts(posts, comments, usersMapApi);

      dispatch(switchLoading(false));
      dispatch(addPosts(preparedPosts));
      dispatch(addSortedPosts(sortedPosts));
    })
    .catch(() => {
      dispatch(errorPosts(true));
      dispatch(switchLoading(false));
    });
};

const initialState = {
  posts: [],
  postsSorted: [],
  isLoading: false,
  isInitialized: false,
  hasError: false,
  isSorted: false,
  templateForFilter: '',
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.ADD_POSTS: {
      return {
        ...state,
        posts: [...action.payload],
      };
    }

    case ACTION_TYPES.POSTS_SORT: {
      return {
        ...state,
        postsSorted: state.posts
          .filter(post => post.title.includes(state.templateForFilter)
        || post.body.includes(state.templateForFilter)),
        templateForFilter: '',
      };
    }

    case ACTION_TYPES.RESET_FILTER: {
      return {
        ...state,
        postsSorted: [...state.posts],
      };
    }

    case ACTION_TYPES.ADD_TEXT: {
      return {
        ...state,
        templateForFilter: action.payload,
      };
    }

    case ACTION_TYPES.DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        postsSorted: state.postsSorted
          .filter(post => post.id !== action.payload),
      };
    }

    case ACTION_TYPES.DELETE_COMMENT: {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.idPost) {
            return {
              ...post,
              comments: post.comments
                .filter(comment => comment.id !== action.payload),
            };
          }

          return post;
        }),
        postsSorted: state.postsSorted.map((post) => {
          if (post.id === action.idPost) {
            return {
              ...post,
              comments: post.comments
                .filter(comment => comment.id !== action.payload),
            };
          }

          return post;
        }),
      };
    }

    case ACTION_TYPES.ADD_SORTED_POSTS: {
      return {
        ...state,
        postsSorted: [...action.payload],
      };
    }

    case ACTION_TYPES.SWITCH_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case ACTION_TYPES.IS_INITIALIZED: {
      return {
        ...state,
        isInitialized: action.payload,
      };
    }

    case ACTION_TYPES.HAS_ERROR: {
      return {
        ...state,
        hasError: action.payload,
      };
    }

    case ACTION_TYPES.IS_SORT: {
      return {
        ...state,
        isSorted: !state.isSorted,
      };
    }

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
