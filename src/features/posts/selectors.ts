import { RootState } from '../../app/store';

export const selectorPosts = (state:RootState) => state.posts.listPosts;
export const selectPostsLoad = (state:RootState) => state.posts.loader;
