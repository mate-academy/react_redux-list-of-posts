const ACTION_TYPE_SET_POSTS = 'setPosts';
const ACTION_TYPE_DELETE_POST = 'deletePost';
const ACTION_TYPE_DELETE_COMMENT = 'deleteComment';

export const createActionSetPosts = payload => ({
  type: ACTION_TYPE_SET_POSTS,
  payload,
});

export const createActionDeletePost = payload => ({
  type: ACTION_TYPE_DELETE_POST,
  payload,
});

export const createActionDeleteComment = (postId, commentId) => ({
  type: ACTION_TYPE_DELETE_COMMENT,
  postId,
  commentId,
});

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_POSTS:
      return action.payload;

    case ACTION_TYPE_DELETE_POST:
      return posts.filter(post => post.id !== action.payload);

    case ACTION_TYPE_DELETE_COMMENT:
      return posts.map(post => post.id === action.postId
        ? {
          ...post,
          comments: post.comments.filter(comment => comment.id !== action.commentId),
        }
        : post);

    default:
      return posts;
  }
};

export default postsReducer;
