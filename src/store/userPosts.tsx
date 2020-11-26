import { AnyAction } from 'redux';
import { Post } from '../helpers/interfaces';

const USER_POSTS = 'USER_POSTS';
const REMOVE_POST = 'REMOVE_POST';

export const setUserPosts = (userPosts: Post[]) => ({ type: USER_POSTS, userPosts });
export const removePost = (postId: number) => ({ type: REMOVE_POST, postId});

const reducer = (userPosts = [], action: AnyAction) => {
  switch (action.type) {
    case USER_POSTS:
      return action.userPosts;
    case REMOVE_POST:
      return userPosts.filter((post: any) => post.id !== action.postId);

    default:
      return userPosts;
  }
};

export default reducer;
