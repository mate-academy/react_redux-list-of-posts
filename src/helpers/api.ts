export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);

  return response.json();
};

export const remove = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`, { method: 'DELETE' });

  return response.json();
};

export const post = async (url: string, data: unknown) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
