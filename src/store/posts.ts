import { AnyAction, Dispatch } from 'redux';
import { getUserPosts, removePost } from '../api/posts';

const POSTS = 'POSTS';

export const actions = {
  setPosts: (posts: Post[]) => ({ type: POSTS, posts }),
  removePost: (id: number) => async (dispatch: Dispatch<AnyAction>) => {
    await removePost(id);
    const posts = await getUserPosts();

    dispatch(actions.setPosts(posts));
  },
};

export const postsReducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case POSTS:
      return action.posts;
    default:
      return posts;
  }
};
