const SET_POSTS = 'SET_POSTS';

export const setPosts = posts => ({
  type: SET_POSTS,
  posts,
});

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    default:
      return posts;
  }
};

export default postsReducer;
