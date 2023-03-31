import { RootState } from '../../app/store';

export const selectorPosts = (state:RootState) => state.posts.listPosts;
