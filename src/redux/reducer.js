import {
  REQUESTED,
  DISPLAY_USERS,
  DISPLAY_COMMENTS,
  DISPLAY_POSTS,
  FILTER_CHANGED,
  REMOVE_POST_ITEM,
} from './actions';

const initialState = {
  requested: false,
  loadedUsers: false,
  loadedPosts: false,
  loadedComments: false,
  articles: null,
  users: null,
  posts: null,
  comments: null,
  postComponents: null,
};

const actionHandlers = {
  [REQUESTED]: state => ({
    ...state,
    requested: true,
  }),
  [DISPLAY_USERS]: (state, action) => ({
    ...state,
    loadedUsers: true,
    users: action.payload.users,
  }),
  [DISPLAY_COMMENTS]: (state, action) => ({
    ...state,
    loadedPosts: true,
    postComponents: action.payload.comments,
  }),
  [DISPLAY_POSTS]: (state, action) => {
    const { posts } = action.payload;
    return {
      ...state,
      loadedPosts: true,
      postComponents: posts,
      posts,
    };
  },
  [FILTER_CHANGED]: (state, action) => ({
    ...state,
    postComponents: state.posts.filter(post => post.title
      .includes(action.payload.target.value)),
  }),
  [REMOVE_POST_ITEM]: (state, action) => {
    const newTodos = state.todos.filter(
      (todo, index) => index !== action.payload
    );
    return {
      ...state,
      filteredTodos: newTodos,
      todos: newTodos,
    };
  },
};

export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler
    ? handler(state, action)
    : state;
};
