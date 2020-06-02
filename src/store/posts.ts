import { AnyAction } from 'redux';

const SET_POSTS = 'SET_POSTS';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const setPosts = (posts: Post[]) => ({
  type: SET_POSTS,
  posts,
});

export const deleteComment = (postId: number, commentId: number) => ({
  type: DELETE_COMMENT,
  postId,
  commentId,
});

const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    case DELETE_COMMENT:
      return posts.map((post: Post) => {
        if (post.id === action.postId) {
          return {
            ...post,
            comments: post.comments?.filter(comment => comment.id !== action.commentId),
          };
        }

        return post;
      });

    default:
      return posts;
  }
};

export default reducer;
