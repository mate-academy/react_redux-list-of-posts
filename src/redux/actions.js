export const DELETE_POST = 'delete_post';
export const DELETE_COMMENT = 'delete_comment';
export const LOAD_DATA = 'load_data';
export const DISPLAY = 'display';
export const UPDATE_INPUT = 'update_input';

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id,
  };
}

export function deleteComment(id, postId) {
  return {
    type: DELETE_COMMENT,
    postId,
    id,
  };
}

export function loadData() {
  return (dispatch) => {
    dispatch({
      type: LOAD_DATA,
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json()),
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json()),
      fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
    ]).then(([posts, users, comments]) => {
      posts.map((post) => {
        post.user = users.find(user => user.id === post.userId);
        post.comments = comments.filter(comment => comment.postId === post.id);
      });
      dispatch(display(posts));
    });
  };
}

export function display(data) {
  return {
    type: DISPLAY,
    data,
  };
}

export function updateInput(value) {
  return {
    type: UPDATE_INPUT,
    value,
  };
}
