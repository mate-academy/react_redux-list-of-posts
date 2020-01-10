import { getPosts, getUsers, getComments } from '../postsApi';

const PREPARE_POSTS = 'PREPARE_POSTS';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const preparePosts = preparedPosts => ({
  type: PREPARE_POSTS,
  preparedPosts,
});

export const deletePost = id => ({
  type: DELETE_POST,
  id,
});
export const deleteComment = id => ({
  type: DELETE_COMMENT,
  id,
});

export const loadPreparedPosts = () => async(dispatch) => {
  const [posts, users, comments] = await Promise.all(
    [getPosts(), getUsers(), getComments()]
  );

  const preparedPosts = await posts.map((post) => {
    const user = users.find(person => person.id === post.userId);
    const postComments = comments.filter(comment => comment.postId === post.id);

    return {
      ...post,
      user,
      postComments,
    };
  });

  dispatch(preparePosts(preparedPosts));
};

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case PREPARE_POSTS:
      return action.preparedPosts;
    case DELETE_POST:
      return state
        .filter(post => post.id !== action.id);
    case DELETE_COMMENT:
      return state
        .map(post => ({
          ...post,
          postComments: post.postComments
            .filter(comment => comment.id !== action.id),
        }));
    default: return state;
  }
};

export default postsReducer;
