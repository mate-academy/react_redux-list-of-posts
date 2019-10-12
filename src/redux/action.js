export const LOAD_DATA = 'load_data';
export const DISPLAY = 'display';
export const REMOVE_POST = 'remove_post';
export const FIND_POST  = 'find_post';
export const REMOVE_COMMENT = 'remove_comment';

export function findAction(value) {
  return {
    type: FIND_POST,
    value
  }
}

export function removeAction(id) {
  return {
    type: REMOVE_POST,
    id
  }
};

export function removeCommentAction(id) {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export function loadAction() {
  return (dispatch) => {
    dispatch({
      type: LOAD_DATA
    });
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/comments')
    ])
      .then(([postsResponse, usersResponse, commentsResponse]) => {
        Promise.all([
          postsResponse.json(),
          usersResponse.json(),
          commentsResponse.json()
        ])
          .then(data => dispatch(displayAction(data)));
      });
  };
};

function displayAction(data) {
  return {
    type: DISPLAY,
    data
  }
}