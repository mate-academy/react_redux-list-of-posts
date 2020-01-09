export const setOriginalPost = newOriginalPost => ({
  type: 'CHANGE_ORIGINAL_POST',
  originalPost: newOriginalPost,
});

const originalPostReducer = (originalPost = [], action) => {
  switch(action.type) {
    case 'CHANGE_ORIGINAL_POST':
      return  action.originalPost;

    default:
      return originalPost;
  }
};

export default originalPostReducer;
