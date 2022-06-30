const BASE_URL = 'https://mate.academy/students-api';

export const request = async (specify : string) => {
  const result = await fetch(`${BASE_URL}/${specify}`);

  return result.json();
};

export function deleteRequest(specify : string) : Promise<Response> {
  const result = fetch(`${BASE_URL}/${specify}`, { method: 'DELETE' });

  return result;
}

export async function postComment(
  name : string, email : string, body : string, postId: number,
) {
  await fetch(`${BASE_URL}/comments`, {
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
}
