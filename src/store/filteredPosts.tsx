import { AnyAction } from 'redux';

const SET_FILTERED_POSTS = 'SET_FILTERED_POSTS';

export const setFilteredPosts = (posts: any, event: any) => ({
  type: SET_FILTERED_POSTS, posts, event,
});

const reducer = (filteredPosts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_FILTERED_POSTS:
      return action.posts
        .filter((item: any) => item.title.includes(action.event)
          || item.body.includes(action.event));

    default:
      return filteredPosts;
  }
};

export default reducer;
