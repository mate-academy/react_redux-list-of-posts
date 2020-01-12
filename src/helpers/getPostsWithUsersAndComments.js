export const getPostsWithUsersAndComments = (postsArr, usersArr, commentsArr) => (
  postsArr.map(post => (
    {
      ...post,
      user: usersArr.find(user => user.id === post.userId),
      comments: commentsArr.filter(comment => comment.postId === post.id),
    }
  ))
);
