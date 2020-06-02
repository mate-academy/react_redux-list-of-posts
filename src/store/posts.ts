import { AnyAction } from 'redux';


const GET_POSTS = 'GET_POSTS';
const DELETE_POST = 'DELETE_POST';

export const setPosts = (posts: Post[]) => ({ type: GET_POSTS, posts });
export const deletePost = (postId: number) => ({ type: DELETE_POST, postId });

const reducer = (posts: Post[] = [], action: AnyAction) => {
  switch (action.type) {
    case GET_POSTS:
      return action.posts;

    case DELETE_POST:
      return posts.filter(post => post.id !== action.postId);

    default:
      return posts;
  }
};

export default reducer;
