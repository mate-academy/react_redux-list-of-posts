export const POSTS_LOAD = 'posts_load';
export const USERS_LOAD = 'users_load';
export const COMMENTS_LOAD = 'comments_load';

export const POSTS_RECEIVED = 'posts_received';
export const USERS_RECEIVED = 'users_received';
export const COMMENTS_RECEIVED = 'comments_received';

export const REMOVE_POST = 'remove_post';


const serverUrl = 'https://jsonplaceholder.typicode.com/';

export const setLoadPosts = () => {
  return {
    type: POSTS_LOAD
  }
}

export const setLoadUsers = () => {
  return {
    type: USERS_LOAD
  }
}

export const setLoadComments = () => {
  return {
    type: COMMENTS_LOAD
  }
}

export const loadPosts = () => (dispatch) => {
  dispatch(setLoadPosts());
  fetch(`${serverUrl}posts`)
    .then(response => response.json())
    .then(postList => {
      dispatch(receivePosts(postList))
    })
};

export const loadUsers = () => (dispatch) => {
  dispatch(setLoadUsers());
  fetch(`${serverUrl}users`)
    .then(response => response.json())
    .then(userList => {
      dispatch(receiveUsers(userList))
    })
};

export const loadComments = () => (dispatch) => {
  dispatch(setLoadComments());
  fetch(`${serverUrl}comments`)
    .then(response => response.json())
    .then(commentList => {
      dispatch(receiveComments(commentList))
    })
};

export const receivePosts = (postList) => {
  return {
    type: POSTS_RECEIVED,
    payload: postList
  }
}

export const receiveUsers = (userList) => {
  return {
    type: USERS_RECEIVED,
    payload: userList
  }
}

export const receiveComments = (commentList) => {
  return {
    type: COMMENTS_RECEIVED,
    payload: commentList
  }
}

export function removePost(id) {
  return {
    type: REMOVE_POST,
    removePostId: id
  };
}
