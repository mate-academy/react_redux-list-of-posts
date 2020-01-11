import { getPostsFromServer, getUsers, getComments } from '../ArrsAPI';
import { changeLoading } from './LoadingReducer';
import { changeLoaded } from './LoadedReducer';
import { postLoadingError } from './ErrorReducer';

const SET_POSTS = 'SET_POSTS';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const setPosts = value => ({
  type: SET_POSTS, value,
});
export const deletePost = value => ({
  type: DELETE_POST, value,
});
export const deleteComment = (postId, commentId) => ({
  type: DELETE_COMMENT, postId, commentId,
});

const modifyPosts = async() => {
  const [posts, users, comments] = await Promise
    .all([getPostsFromServer(), getUsers(), getComments()]);

  return posts.map((post) => {
    const currentUser = users.find(user => user.id === post.userId);
    const userComment = comments
      .filter(comment => comment.postId === post.id);

    return {
      ...post,
      user: currentUser,
      comments: userComment,
    };
  });
};

export const loadPosts = () => async(dispatch) => {
  try {
    dispatch(changeLoading(true));

    const postsFromServer = await modifyPosts();

    dispatch(setPosts(postsFromServer));
    dispatch(changeLoading(false));
    dispatch(changeLoaded(true));
    dispatch(postLoadingError(false));
  } catch (e) {
    dispatch(postLoadingError(true));
  }
};

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.value;

    case DELETE_POST:
      return state
        .filter(post => post.id !== action.value);

    case DELETE_COMMENT:
      return state
        .map(post => (post.id === action.postId
          ? {
            ...post,
            comments: post.comments
              .filter(comment => comment.id !== action.commentId),
          }
          : post));
    default:
      return state;
  }
};

export default postsReducer;
