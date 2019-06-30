export const REQUESTED = 'requested';
export const DISPLAY_USERS = 'users_ready';
export const DISPLAY_COMMENTS = 'comments_ready';
export const DISPLAY_POSTS = 'posts_ready';
export const FILTER_CHANGED = 'new_filter';
export const POST_ITEM_REMOVE = 'post_remove';
export const COMMENT_ITEM_REMOVE = 'comment_remove';
const url = 'https://jsonplaceholder.typicode.com/';

export function loadTodos() {
  return (dispatch) => {
    dispatch({
      type: 'requested',
    });

    dispatch(displayUsers());
    dispatch(displayPosts());
    dispatch(displayComments());

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

export async function displayUsers() {
  const usersPromise = fetch(`${url}users`);
  const usersResponse = await usersPromise;
  const users = await usersResponse.json();
  return {
    type: DISPLAY_USERS,
    payload: {
      usersLoaded: true,
      users,
    },
  };
}

export async function displayPosts() {
  const postsPromise = fetch(`${url}posts`);
  const postsResponse = await postsPromise;
  const posts = await postsResponse.json();
  return {
    type: DISPLAY_POSTS,
    payload: {
      postsLoaded: true,
      filteredPosts: posts,
      posts,
    },
  };
}

export async function displayComments() {
  const commentsPromise = fetch(`${url}comments`);
  const commentsResponse = await commentsPromise;
  const comments = await commentsResponse.json();

  return {
    type: DISPLAY_COMMENTS,
    payload: {
      commentsLoaded: true,
      comments,
    },
  };
}

export function filterChanged(eventTarget) {
  return {
    type: FILTER_CHANGED,
    payload: eventTarget,
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
