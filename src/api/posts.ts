import { addPostsAction, addUsersAction, loadSelectedPostAction } from '../store';

export function getUsers() {
  const url = 'https://mate.academy/students-api/users/';

  return function (dispatch: any) {
    fetch(url)
      .then(response => response.json())
      .then(json => dispatch(addUsersAction(json)));
  };
}

export function getPosts(userId: number) {
  let url = 'https://mate.academy/students-api/posts';

  if (userId) {
    url += `?userId=${userId}`;
  }

  return function (dispatch: any) {
    fetch(url)
      .then(response => response.json())
      .then(json => dispatch(addPostsAction(json)));
  };
}

export function deletePost(postId: number) {
  return fetch(`https://mate.academy/students-api/posts/${postId}`, {
    method: 'DELETE',
  });
}

export function getSelectedPost(id: number) {
  return function (dispatch: any) {
    fetch(`https://mate.academy/students-api/posts/${id}`)
      .then(response => response.json())
      .then(json => dispatch(loadSelectedPostAction(json)));
  };
}
