export const  fetchPostsFromServer = url => (
  fetch(url).then(res => res.json()))
