const API_COMMENTS_URL = 'https://mate.academy/students-api/comments';

export async function getComments(postId:number) {
  const response = await fetch(`${API_COMMENTS_URL}?postId=${postId}`);

  return response.json();
}

export async function deleteComment(commentId:number) {
  await fetch(`${API_COMMENTS_URL}/${commentId}`, {
    method: 'DELETE',
  });
}

export async function addComment(comment: newComment) {
  const response = await fetch(API_COMMENTS_URL, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}
