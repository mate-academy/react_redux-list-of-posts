const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

export async function getData<T>(url: string): Promise<T[]> {
  const response = await fetch(`${API_URL}/${url}`);
  const json = await response.json();

  return json;
}
