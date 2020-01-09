export const setPosts = newSetData => ({
  type: 'CHANGE_POSTS',
  posts: newSetData,
});

const postsReducer = (posts = [], action) => {
  switch(action.type) {
    case 'CHANGE_POSTS':
      return  action.posts;

    default:
      return posts;
  }
};

export default postsReducer;
