import { getPosts, getUsers, getComments } from './api/loadApi';

export const START_LOADING = 'START_LOADING';
export const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LOADING = 'LOADING';
export const CHANGE_QUERY = 'CHANGE_QUERY';

const startLoading = () => ({ type: START_LOADING });
const loadingProcess = () => ({ type: LOADING });
const handleSuccess = posts => ({
  type: HANDLE_SUCCESS, posts,
});

export const loadPosts = () => async(dispatch) => {
  dispatch(loadingProcess());

  const [
    postsFromServer,
    usersFromServer,
    commentsFromServer,
  ] = await Promise.all([
    getPosts(),
    getUsers(),
    getComments(),
  ]);

  dispatch(handleSuccess(postsFromServer.map(post => (
    {
      ...post,
      user: usersFromServer.find(person => person.id === post.userId),
      comments: commentsFromServer
        .filter(comment => comment.postId === post.id),
    }))));

  dispatch(startLoading());
};

export const changeQuery = query => ({
  type: CHANGE_QUERY, query,
});

export const deletePost = id => ({
  type: DELETE_POST, id,
});

export const deleteComment = id => ({
  type: DELETE_COMMENT, id,
});
