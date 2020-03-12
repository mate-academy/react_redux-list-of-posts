const URL = 'https://jsonplaceholder.typicode.com/';

export async function dataDownload<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => response.json());
}

export async function getUsersFromAPI(): Promise<User[]> {
  return fetch(`${URL}users`)
    .then(response => response.json());
}

export async function getPostsFromAPI(): Promise<Post[]> {
  return fetch(`${URL}posts`)
    .then(response => response.json());
}

export async function getCommentsFromAPI(): Promise<Comment[]> {
  return fetch(`${URL}comments`)
    .then(response => response.json());
}
