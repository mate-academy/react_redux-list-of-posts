export const SET_POSTS = 'SET_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const setPostsAC = value => ({
  type: SET_POSTS, value,
});
export const deletePostAC = value => ({
  type: DELETE_POST, value,
});
export const deleteCommentAC = value => ({
  type: DELETE_COMMENT, value,
});

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.value;
    case DELETE_POST:
      return [...posts].filter(post => post.id !== action.value);
    case DELETE_COMMENT:
      return [...posts].map(post => ({
        ...post,
        comments: post.comments
          .filter(comment => comment.id !== action.value),
      }));
    default:
      return posts;
  }
};

export default postsReducer;
