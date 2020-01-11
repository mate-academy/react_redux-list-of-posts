export const setPosts = post => ({
  type: 'CHANGE_POST',
  posts: post
});

const postReducer = (posts = [], action) => {
  switch(action.type) {
    case 'CHANGE_POST':
      return  action.posts;

    default:
      return posts;
  }
};

export default postReducer;
