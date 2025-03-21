import { NewComment } from '../types/Comment';

export const createComment = async (comment: NewComment) => {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error('Failed to create comment');
  }

  return response.json();
};

const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  return response.json() as Promise<T>;
};

// Export fetchClient as an object containing utility functions
export const fetchClient = {
  createComment,
  get,
};
