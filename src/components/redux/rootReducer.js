import { ACTION_TYPES } from './actions';

const initialState = {
  isLoading: false,
  error: false,
  preparedPosts: [],
  filter: '',
};

function prepare(preparedPosts) {
  const [posts, users, comments] = preparedPosts;

  if (posts && users && comments) {
    return posts.map(post => ({
      ...post,
      user: users.find(user => post.userId === user.id),
      comments: comments.filter(comment => comment.postId === post.id),
    }));
  }

  return [];
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SAVE: {
      const { payload } = action;

      return {
        ...state,
        error: false,
        preparedPosts: prepare(payload),
      };
    }

    case ACTION_TYPES.SET_LOAD_ERROR: {
      return {
        ...state,
        error: true,
        preparedPosts: [],
      };
    }

    case ACTION_TYPES.START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ACTION_TYPES.STOP_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case ACTION_TYPES.DELETE_POST: {
      const { postId } = action;

      return {
        ...state,
        preparedPosts: state.preparedPosts.filter(({ id }) => id !== postId),
      };
    }

    case ACTION_TYPES.DELETE_COMMENT: {
      const { commentId } = action;

      return {
        ...state,
        preparedPosts: state.preparedPosts.map(post => ({
          ...post,
          comments: post.comments.filter(({ id }) => id !== commentId),
        })),
      };
    }

    case ACTION_TYPES.FILTER: {
      const { payload } = action;

      return {
        ...state,
        filter: payload,
      };
    }

    case ACTION_TYPES.FILTER_BUTTON: {
      const { payload } = action;

      switch (payload) {
        case 'Post Text':
          return {
            ...state,
            preparedPosts:
              state.preparedPosts.filter(
                ({ body }) => body.includes(state.filter)
              ),
          };
        case 'Post Title':
          return {
            ...state,
            preparedPosts: state.preparedPosts.filter(
              ({ title }) => title.includes(state.filter)
            ),
          };
        default:
          return {
            ...state,
            preparedPosts: state.preparedPosts,
          };
      }
    }

    default:
      return state;
  }
}
