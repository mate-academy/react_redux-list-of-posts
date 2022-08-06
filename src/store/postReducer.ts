import { AnyAction } from 'redux';

const defaultState = {
  posts: [],
  selectedPost: {},
};

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
};

type RootState = {
  posts: Post[],
};

export const GET_POSTS = 'get_posts';

export const postsReducer = (
  state: RootState = defaultState, action: AnyAction,
) => {
  switch (action.type) {
    case GET_POSTS:
      return { posts: action.payload };

    default:
      return state;
  }
};
