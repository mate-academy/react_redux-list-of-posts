import { AnyAction } from 'redux';

const SET_SORTED_POSTS = 'SET_SORTED_POSTS';

export const setSortedPosts = (posts: any, event: any) => ({
  type: SET_SORTED_POSTS, posts, event,
});

const reducer = (sortedPosts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_SORTED_POSTS:
      return action.posts
        .filter((item: any) => item.title.includes(action.event)
          || item.body.includes(action.event));

    default:
      return sortedPosts;
  }
};

export default reducer;
