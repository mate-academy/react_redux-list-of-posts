import { loadData } from './loadData';

export const REQUESTED = 'requested';
export const DISPLAY_USERS = 'users_ready';
export const DISPLAY_COMMENTS = 'comments_ready';
export const DISPLAY_POSTS = 'posts_ready';
export const FILTER_CHANGED = 'new_filter';
export const POST_ITEM_REMOVE = 'post_remove';
export const COMMENT_ITEM_REMOVE = 'comment_remove';

// const url = 'https://jsonplaceholder.typicode.com/';

export function loadTodos() {
  return (dispatch) => {
    dispatch({
      type: 'requested',
    });

    const resultResponse = loadData();
    dispatch(displayUsers(resultResponse.payloadUsers));
    dispatch(displayPosts(resultResponse.payloadPosts));
    dispatch(displayComments(resultResponse.payloadComments));

    // const respUsers = displayUsers();
    // const respPost = displayPosts();
    // const respCom = displayComments()
    //
    // dispatch(respUsers);
    // dispatch(respPost);
    // dispatch(respCom);

    // loadData();
    // async function loadData() {
    //   const url = 'https://jsonplaceholder.typicode.com/';
    //   const postsPromise = fetch(`${url}posts`);
    //   const usersPromise = fetch(`${url}users`);
    //   const commentsPromise = fetch(`${url}comments`);
    //   const [
    //     postsResponse,
    //     usersResponse,
    //     commentsResponse,
    //   ] = await Promise.all([
    //     postsPromise,
    //     usersPromise,
    //     commentsPromise,
    //   ]);
    //
    //   const posts = await postsResponse.json();
    //   const users = await usersResponse.json();
    //   const comments = await commentsResponse.json();
    //
    //   const payloadPosts = {
    //     postsLoaded: true,
    //     filteredPosts: posts,
    //     posts,
    //   };
    //
    //   const payloadUsers = {
    //     usersLoaded: true,
    //     users,
    //   };
    //
    //   const payloadComments = {
    //     commentsLoaded: true,
    //     comments,
    //   };
    //   dispatch(displayUsers(payloadUsers));
    //   dispatch(displayPosts(payloadPosts));
    //   dispatch(displayComments(payloadComments));
    // }
  };
}

export function displayUsers(payload) {

  return {
    type: DISPLAY_USERS,
    payload,
  };
}

export function displayPosts(payload) {
  return {
    type: DISPLAY_POSTS,
    payload,
  };
}

export async function displayComments(payload) {
  return {
    type: DISPLAY_COMMENTS,
    payload,
  };
}

export function filterChanged(payload) {
  return {
    type: FILTER_CHANGED,
    payload,
  };
}

export function removePost(index) {
  return {
    type: POST_ITEM_REMOVE,
    payload: index,
  };
}

export function removeComment(id) {
  return {
    type: COMMENT_ITEM_REMOVE,
    payload: id,
  };
}
