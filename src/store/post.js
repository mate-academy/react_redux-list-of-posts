export const setPosts = posts => ({
  type: 'CHANGE_POST',
  posts: posts
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
