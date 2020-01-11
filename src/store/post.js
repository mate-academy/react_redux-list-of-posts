export const setPost = newpost => ({
  type: 'CHANGE_POST',
  post: newpost,
});

const postReducer = (post = [], action) => {
  switch(action.type) {
    case 'CHANGE_POST':
      return  action.post;

    default:
      return post;
  }
};

export default postReducer;
