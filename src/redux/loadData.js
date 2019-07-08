export async function loadData() {
  const url = 'https://jsonplaceholder.typicode.com/';
  const postsPromise = fetch(`${url}posts`);
  const usersPromise = fetch(`${url}users`);
  const commentsPromise = fetch(`${url}comments`);
  const [
    postsResponse,
    usersResponse,
    commentsResponse,
  ] = await Promise.all([
    postsPromise,
    usersPromise,
    commentsPromise,
  ]);

  const posts = await postsResponse.json();
  const users = await usersResponse.json();
  const comments = await commentsResponse.json();

  const payloadPosts = {
    postsLoaded: true,
    filteredPosts: posts,
    posts,
  };

  const payloadUsers = {
    usersLoaded: true,
    users,
  };

  const payloadComments = {
    commentsLoaded: true,
    comments,
  };

  return {
    payloadPosts,
    payloadUsers,
    payloadComments,
  };
}
