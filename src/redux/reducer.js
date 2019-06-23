import {
  REQUESTED,
  DISPLAY_USERS,
  DISPLAY_COMMENTS,
  DISPLAY_POSTS,
  FILTER_CHANGED,
  POST_ITEM_REMOVE,
  COMMENT_ITEM_REMOVE,
} from './actions';

const initialState = {
  requested: false,
  usersLoaded: false,
  postsLoaded: false,
  commentsLoaded: false,
  usersMap: null,
  posts: null,
  comments: null,
  filteredPosts: null,
};

const actionHandlers = {
  [REQUESTED]: state => ({
    ...state,
    requested: true,
  }),
  [DISPLAY_USERS]: (state, action) => ({
    ...state,
    usersLoaded: true,
    usersMap: action.payload.users
      .reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
  }),
  [DISPLAY_COMMENTS]: (state, action) => ({
    ...state,
    commentsLoaded: true,
    comments: action.payload.comments,
  }),
  [DISPLAY_POSTS]: (state, action) => {
    const { posts } = action.payload;
    return {
      ...state,
      postsLoaded: true,
      filteredPosts: posts,
      posts,
    };
  },
  [FILTER_CHANGED]: (state, action) => ({
    ...state,
    filteredPosts: state.posts.filter(post => post.title
      .includes(action.payload.target.value)),
  }),
  [POST_ITEM_REMOVE]: (state, action) => ({
    ...state,
    posts: state.posts.filter((todo, index) => index !== action.payload),
    filteredPosts: state.posts
      .filter((todo, index) => index !== action.payload),
  }),
  [COMMENT_ITEM_REMOVE]: (state, action) => ({
    ...state,
    comments: state.comments.filter(todo => todo.id !== action.payload),
  }),
};

export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler
    ? handler(state, action)
    : state;
};
