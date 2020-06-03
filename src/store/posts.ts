import { AnyAction } from 'redux';

// Action types
const SET_POSTS = 'SET_POSTS';

// Action creators
export const handleSuccess = (posts: PreparedPost[]) => (
  {
    type: SET_POSTS,
    posts,
  }
);

// message reducer receives only the `state.message` part, but not the entire Redux state
const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    default:
      return posts;
  }
};

export default reducer;
