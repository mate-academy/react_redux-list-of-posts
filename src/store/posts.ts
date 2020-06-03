import { AnyAction } from 'redux';

const SET_POSTS = 'SET_POSTS';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const setPosts = (posts: Post[]) => ({ type: SET_POSTS, posts });
export const deletePosts = (postId: number) => ({ type: DELETE_POST, postId });
export const deleteComment = (postId: number, commentId: number) => (
  { type: DELETE_COMMENT, postId, commentId });

const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case DELETE_POST:
      return posts.filter((post: Post) => post.id !== action.postId);
    case DELETE_COMMENT:
      return posts.map((post: Post) => {
        if (post.id === action.postId) {
          const userComments = post.userComments?.filter((comment: Comment) => (
            comment.id !== action.commentId));

          return {
            ...post,
            userComments,
          };
        }

        return post;
      });

    default:
      return posts;
  }
};

export default reducer;
