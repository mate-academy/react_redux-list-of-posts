import { getPostsFromServer } from '../api/posts';
import { getUsersFromServer } from '../api/users';
import { getCommentsFromServer } from '../api/comments';

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const START_LOADING = 'START_LOADING';
export const HANDLE_ERROR = 'HANDLE_ERROR';
export const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
export const HANDLE_REMOVE = 'HANDLE_REMOVE';

export const startLoading = () => ({ type: START_LOADING });
export const handleError = () => ({ type: HANDLE_ERROR });
export const updateQuery = query => ({
  type: UPDATE_QUERY,
  query,
});
export const handleSuccess = posts => ({
  type: HANDLE_SUCCESS,
  posts,
});

export const handleRemove = id => ({
  type: HANDLE_REMOVE,
  id,
});

export const loadList = () => async(dispatch) => {
  dispatch(startLoading());

  try {
    const [
      postsFromServer,
      usersFromServer,
      commentsFromServer] = await Promise.all([
      getPostsFromServer(),
      getUsersFromServer(),
      getCommentsFromServer(),
    ]);

    const preparedPosts = postsFromServer.map((post) => {
      const user = usersFromServer.find(person => person.id === post.userId);
      const commentList = commentsFromServer
        .filter(comment => comment.postId === post.id);

      return {
        ...post, user, commentList,
      };
    });

    dispatch(handleSuccess(preparedPosts));
  } catch {
    dispatch(handleError());
  }
};
