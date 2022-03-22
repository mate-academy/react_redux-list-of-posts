const BASE_URL = 'https://mate.academy/students-api';

export async function fetchPosts() {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
}

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
}

export async function getUserPosts(userId: number) {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  return response.json();
}

export async function getPostDetails(postId: number) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
}

export async function getPostComments(postId: number) {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
}

export const removePostComment = async (commentId: number) => {
  const postComment = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });

  return postComment.json();
};

export const addPostComment = async (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  const newComment = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });

  return newComment.json();
};
