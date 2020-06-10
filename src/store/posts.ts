import { AnyAction } from 'redux';

const SET_POSTS = 'SET_POSTS';
const DELETE_POST = 'DELETE_POST';

export const setPosts = (posts: PostType[]) => ({ type: SET_POSTS, posts });
export const setDeletePost = (id: number) => ({ type: DELETE_POST, id });

export const postsReducer = (posts: PostType[] = [], action: AnyAction): PostType[] => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case DELETE_POST:
      return posts.filter(post => post.id !== action.value);
    default:
      return posts;
  }
};
