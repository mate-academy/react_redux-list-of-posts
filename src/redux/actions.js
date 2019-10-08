export const LOAD_DATA = 'load_data';
export const FILL_DATA = 'fill_data';
export const REMOVE_POST = 'remove_post';
export const REMOVE_COMMENT = 'remove_comment';
export const SEARCH_POSTS = 'search_posts';

export function load() {
  return dispatch => {
    dispatch({
        type: LOAD_DATA
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json())
    ])
    .then(([posts, users, comments]) => {
      const postsData = posts.map((post) => ({
        ...post,
        user: users.find(user => post.userId === user.id),
        // comments: comments.filter(comment => comment.postId === post.id)
      }))
      const commentsData = comments;
      dispatch(fillData(postsData, commentsData));
    })
  }
}

export function fillData(data, commentsData) {
  return {
    type: FILL_DATA,
    data,
    commentsData
  }
}

export function removePost(id) {
  return {
    type: REMOVE_POST,
    id
  }
}

export function removeComment(id) {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export function searchPosts(inputValue) {
  return {
    type: SEARCH_POSTS,
    inputValue
  }
}
