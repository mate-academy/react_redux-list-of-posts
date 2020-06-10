import { AnyAction } from 'redux';

const SET_POSTS = 'SET_POSTS';

export const setPosts = (posts: any) => ({ type: SET_POSTS, posts });

const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    default:
      return posts;
  }
};

export default reducer;
