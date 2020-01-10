const POSTS_LOADED = 'POSTS_LOADED';

export const postsLoaded = () => ({ type: POSTS_LOADED });

const postsLoadedReducer = (state = false, action) => {
  switch (action.type) {
    case POSTS_LOADED:
      return true;
    default: return state;
  }
};

export default postsLoadedReducer;
