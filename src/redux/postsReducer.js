const ACTION_TYPE_SET_POSTS = 'SET_POSTS';
const ACTION_TYPE_DELETE_POST = 'DELETE_POST';
const ACTION_TYPE_DELETE_COMMENT = 'DELETE_COMMENT';

export const setPosts = posts => ({
  type: ACTION_TYPE_SET_POSTS,
  posts,
});

export const deletePost = idPost => ({
  type: ACTION_TYPE_DELETE_POST,
  idPost,
});

export const deleteComment = idComment => ({
  type: ACTION_TYPE_DELETE_COMMENT,
  idComment,
});

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_POSTS:
      return action.posts;
    case ACTION_TYPE_DELETE_POST:
      return posts.filter(post => post.id !== action.idPost);
    case ACTION_TYPE_DELETE_COMMENT:
      return posts.map(post => ({
        ...post,
        comments: post.comments
          .filter(comment => comment.id !== action.idComment),
      }));

    default:
      return posts;
  }
};

export default postsReducer;
