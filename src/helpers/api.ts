

export function fetchMessage(): Promise<string> {
  // this is just a fake promise resolved in 2 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Message from server');
    }, 2000);
  });
}
const baseURL = "https://mate-academy.github.io/react_dynamic-list-of-posts/api/"
export const getPosts = () => {
  return fetch(baseURL + "posts.json")
    .then(responce => responce.json())
    .then(posts => posts)
}
export const getUsers = () => {
  return fetch(baseURL + "users.json")
    .then(responce => responce.json())
    .then(users => users)
}
export const getComments = () => {
  return fetch(baseURL + "comments.json")
    .then(responce => responce.json())
    .then(comments => comments)
}

export const getAllData = () => {
  return Promise.all([getPosts(), getUsers(), getComments()])
}
