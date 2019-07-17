export const LOAD = 'load';
export const DISPLAY = 'display';
export const REMOVE_POST = 'remove_post';
export const REMOVE_COMMENT = 'remove_comment';
export const GET_INPUT_VALUE = 'get_input_value';

export function load() {
  return (dispatch) => {
    dispatch({
      type: LOAD,
    });
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json()),
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json()),
      fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json()),
    ]).then(([posts, users, comments]) => {
      const postsData = posts.map((todo) => {
        const person = users.find(user => user.id === todo.userId);
        const commentsData = comments.filter((comment) => {
          return comment.postId === todo.id;
        });
        return {
          ...todo,
          user: person,
          comments: commentsData,
        };
      });
      dispatch(display(postsData));
    });
  };
}

export function display(data) {
  return {
    type: DISPLAY,
    data,
  };
}

export function removePost(index, data) {
  const newPosts = [...data];
  return {
    type: REMOVE_POST,
    data: newPosts.filter(item => item.id !== index),
  };
}

export function removeComment(index, posts, postIndex) {
  return {
    type: REMOVE_COMMENT,
    data: posts.map((post) => {
      if (post.id !== postIndex) {
        return post;
      }
      return {
        ...post,
        comments: post.comments.filter(comment => comment.id !== index),
      };
    }),
  };
}

export function getInputValue(value) {
  return {
    type: GET_INPUT_VALUE,
    value,
  };
}
