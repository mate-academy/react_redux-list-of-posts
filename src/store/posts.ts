import { AnyAction } from "redux";

const SET_POSTS = 'SET_POSTS';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const setPosts = (posts: Post[]) => {
  return {
    type: SET_POSTS,
    posts
  }
}

export const deletePost = (id: number) => ({
  type: DELETE_POST,
  id
});

export const deleteComment = (postId: number, commentId: number) => ({
  type: DELETE_COMMENT,
  postId,
  commentId
});

const reducer = (posts: Post[] = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    case DELETE_POST:
      return posts.filter(post => post.id !== action.id);

    case DELETE_COMMENT:
      return posts.map(post => (
        post.id === action.postId
          ? {
            ...post,
            comments: post.comments
              .filter(comment => comment.id !== action.commentId)
          } : post));

    default:
      return posts;
  }
}

export default reducer;
