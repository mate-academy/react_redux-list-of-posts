export const LOAD = 'load';
export const POSTS_RECEIVED = 'posts_received';
export const USERS_RECEIVED = 'users_received';
export const COMMENTS_RECEIVED = 'comments_received';
export const CHECK_DATA = 'check_data';
export const REMOVE_POST = 'remove_post';


const serverUrl = 'https://jsonplaceholder.typicode.com/';

function loadData(dispatch) {
  sendRequest(`${serverUrl}posts`, requestPostsHandler, dispatch);
  sendRequest(`${serverUrl}users`, requestUsersHandler, dispatch);
  sendRequest(`${serverUrl}comments`, requestCommentsHandler, dispatch);
}

function sendRequest(url, handler, dispatch) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', handler(request, dispatch));
  request.send();
}

const requestPostsHandler = (request, dispatch) => () => {
  const parsePosts = JSON.parse(request.responseText);
  dispatch(postsReceived(parsePosts));
}

const requestUsersHandler = (request, dispatch) => () => {
  const parseUsers = JSON.parse(request.responseText);
  dispatch(usersReceived(parseUsers));
}

const requestCommentsHandler = (request, dispatch) => () => {
  const parseComments = JSON.parse(request.responseText);
  dispatch(commentsReceived(parseComments));
}

export function load() {
  return (dispatch) => {
    dispatch({
        type: LOAD
    });
    loadData(dispatch);
  };
}

export function postsReceived(posts) {
  return (dispatch) => {
    dispatch({
      type: POSTS_RECEIVED,
      posts
    });
    dispatch(checkData());
  }
}

export function usersReceived(users) {
  return (dispatch) => {
    dispatch({
      type: USERS_RECEIVED,
      users
    });
    dispatch(checkData());
  }
}

export function commentsReceived(comments) {
  return (dispatch) => {
    dispatch({
      type: COMMENTS_RECEIVED,
      comments
    });
    dispatch(checkData());
  }
}

export function checkData() {
  return {
    type: CHECK_DATA
  };
}

function isLoading(state) {
  return !state.posts || !state.users || !state.comments;
}

export function mapData(state) {
  if (isLoading(state)) return null;
  const postsListMap = state.posts.map(post => ({...post,
    user: state.users.find(user => user.id === post.userId),
    postComments: state.comments.filter(comment => comment.postId === post.id) }));
  return postsListMap;
}

export function removePost(id) {
  return {
    type: REMOVE_POST,
    removePostId: id
  };
}
