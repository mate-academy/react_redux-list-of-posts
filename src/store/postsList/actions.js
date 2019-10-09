const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const ACTION_TYPES = {
  POSTS_LIST_FETCH_DATA_IS_LOADING: 'POSTS_FETCH_DATA_IS_LOADING',
  POSTS_LIST_FETCH_DATA_SUCCESS: 'POSTS_FETCH_DATA_SUCCESS',
  POSTS_LIST_FETCH_DATA_ERROR: 'POSTS_FETCH_DATA_ERROR',
  DELETE_POST: 'DELETE_POST',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

function postsListFetchDataIsLoading() {
  return {
    type: ACTION_TYPES.POSTS_LIST_FETCH_DATA_IS_LOADING,
    isLoading: true,
  };
}

function postsListFetchDataSuccess(posts) {
  return {
    type: ACTION_TYPES.POSTS_LIST_FETCH_DATA_SUCCESS,
    isLoading: false,
    payload: posts,
  };
}

function postsListFetchDataError(error) {
  return {
    type: ACTION_TYPES.POSTS_LIST_FETCH_DATA_ERROR,
    isLoading: false,
    payload: error,
  };
}

export function deletePost(id) {
  return {
    type: ACTION_TYPES.DELETE_POST,
    payload: id,
  };
}

export function deleteComment(id) {
  return {
    type: ACTION_TYPES.DELETE_COMMENT,
    payload: id,
  };
}

export function postsListFetchData() {
  return (dispatch) => {
    dispatch(postsListFetchDataIsLoading());

    Promise.all([
      fetch(POSTS_URL),
      fetch(USERS_URL),
      fetch(COMMENTS_URL),
    ])
      .then(([todosResponse, usersResponse, commentsResponse]) => {
        if (!todosResponse.ok) {
          throw new Error(todosResponse.statusText);
        }
        if (!usersResponse.ok) {
          throw new Error(usersResponse.statusText);
        }

        if (!commentsResponse.ok) {
          throw new Error(commentsResponse.statusText);
        }

        return Promise.all(
          [todosResponse.json(), usersResponse.json(), commentsResponse.json()]
        );
      })
      .then(([postsData, usersData, commentsData]) => {
        const postsList = postsData.map(post => ({
          ...post,
          user: usersData.find(user => user.id === post.userId),
          comments: commentsData.filter(comment => comment.postId === post.id),
        }));
        dispatch(postsListFetchDataSuccess(postsList));
      })
      .catch(error => (
        dispatch(postsListFetchDataError(`${error.message} data from API`))));
  };
}
