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
  [DISPLAY_USERS]: (state, action) => {
    const usersMap = action.payload.users
      .reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
    return {
      ...state,
      loadedUsers: true,
      usersMap,
    };
  },
  [DISPLAY_COMMENTS]: (state, action) => ({
    ...state,
    loadedComments: true,
    comments: action.payload.comments,
  }),
  [DISPLAY_POSTS]: (state, action) => {
    const { posts } = action.payload;
    return {
      ...state,
      loadedPosts: true,
      filteredPosts: posts,
      posts,
    };
  },
  [FILTER_CHANGED]: (state, action) => ({
    ...state,
    filteredPosts: state.posts.filter(post => post.title
      .includes(action.payload.target.value)),
  }),
  // [REMOVE_POST_ITEM]: (state, action) => {
  //   const newTodos = state.todos.filter(
  //     (todo, index) => index !== action.payload
  //   );
  //   return {
  //     ...state,
  //     filteredTodos: newTodos,
  //     todos: newTodos,
  //   };
  // },
};

export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler
    ? handler(state, action)
    : state;
};
