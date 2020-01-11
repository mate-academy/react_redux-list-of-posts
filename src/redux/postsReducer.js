const ACTION_TYPE_SET_POSTS = 'setPosts';
const ACTION_TYPE_DELETE_POST = 'deletePost';
const ACTION_TYPE_DELETE_COMMENT = 'deleteComment';

export const setPosts = posts => ({
  type: ACTION_TYPE_SET_POSTS,
  posts,
});

export const deletePost = postId => ({
  type: ACTION_TYPE_DELETE_POST,
  postId,
});

export const deleteComment = (postId, commentId) => ({
  type: ACTION_TYPE_DELETE_COMMENT,
  postId,
  commentId,
});

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_POSTS:
      return action.posts;

    case ACTION_TYPE_DELETE_POST:
      return posts.filter(post => post.id !== action.postId);

    case ACTION_TYPE_DELETE_COMMENT:
      return posts.map(post => (post.id === action.postId
        ? {
          ...post,
          comments: post.comments
            .filter(comment => comment.id !== action.commentId),
        }
        : post));

    default:
      return posts;
  }
};

export default postsReducer;
