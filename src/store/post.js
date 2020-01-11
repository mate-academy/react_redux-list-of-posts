export const setPost = post => ({
  type: 'CHANGE_POST',
  postArray: post
});

const postReducer = (postArray = [], action) => {
  switch(action.type) {
    case 'CHANGE_POST':
      return  action.postArray;

    default:
      return postArray;
  }
};

export default postReducer;
