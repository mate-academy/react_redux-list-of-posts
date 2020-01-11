const SET_POSTS = 'SET_POSTS';
const DEL_POST = 'DEL_POST';
const DEL_COMMENT = 'DEL_COMMENT';

export const setPosts = posts => ({
  type: SET_POSTS,
  posts,
});

export const delPost = post => ({
  type: DEL_POST,
  post,
});

export const delComment = (post, comment) => ({
  type: DEL_COMMENT,
  post,
  comment,
});

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case DEL_POST:
      return posts.filter(post => post.id !== action.post);
    case DEL_COMMENT:
      return posts.map(post => (
        post.id === action.post
          ? ({
            ...post,
            comments: post.comments.filter(
              comment => comment.id !== action.comment
            ),
          })
          : post
      ));
    default:
      return posts;
  }
};

export default postsReducer;
