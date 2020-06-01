const GENERAL_LINK = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

const getData = async (url: string) => {
  const getInfo = await fetch(`${GENERAL_LINK}${url}.json`);
  const infoToJson = getInfo.json();

  return infoToJson;
};

export const preparedDatas = async () => {
  const [posts, users, comments] = await Promise.all([
    getData('posts'),
    getData('users'),
    getData('comments'),
  ]);

  const preparedPosts = posts.map((post: Post) => {
    const user = users.find((ownerPost: User) => ownerPost.id === post.userId);
    const postsComments = comments.filter((comment: Comments) => comment.postId === post.id);

    return {
      ...post,
      user,
      comments: postsComments,
    };
  });

  return preparedPosts;
};
