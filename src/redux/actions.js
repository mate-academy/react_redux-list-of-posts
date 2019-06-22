export const REQUESTED = 'requested';
export const DISPLAY_USERS = 'users_ready';
export const DISPLAY_COMMENTS = 'comments_ready';
export const DISPLAY_POSTS = 'posts_ready';
export const FILTER_CHANGED = 'new_filter';
export const REMOVE_POST_ITEM = 'remove_Item';

export function handleClick() {
  return (dispatch) => {
    dispatch({
      type: 'requested',
    });

    loadData();
    async function loadData() {
      const url = 'https://jsonplaceholder.typicode.com/';
      const postsPromise = fetch(`${url}posts`);
      const usersPromise = fetch(`${url}users`);
      const commentsPromise = fetch(`${url}comments`);
      const [
        postsResponse,
        usersResponse,
        commentsResponse,
      ] = await Promise.all([
        postsPromise,
        usersPromise,
        commentsPromise,
      ]);

      const posts = await postsResponse.json();
      const users = await usersResponse.json();
      const comments = await commentsResponse.json();

      const payloadPosts = {
        loadedPosts: true,
        filteredPosts: posts,
        posts,
      };

      const payloadUsers = {
        loadedUsers: true,
        users,
      };

      const payloadComments = {
        loadedComments: true,
        comments,
      };
      dispatch(displayUsers(payloadUsers));
      dispatch(displayPosts(payloadPosts));
      dispatch(displayComments(payloadComments));
    }
  };
}

export function displayUsers(payloadUsers) {
  return {
    type: DISPLAY_USERS,
    payload: payloadUsers,
  };
}

export function displayPosts(payloadPosts) {
  return {
    type: DISPLAY_POSTS,
    payload: payloadPosts,
  };
}

export function displayComments(payloadComments) {
  return {
    type: DISPLAY_COMMENTS,
    payload: payloadComments,
  };
}

export function filterChanged(payload) {
  return {
    type: FILTER_CHANGED,
    payload,
  };
}

// export function removePostItem(payload) {
//   return {
//     type: REMOVE_POST_ITEM,
//     payload,
//   };
// }
