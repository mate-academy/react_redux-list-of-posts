import { RootState } from '../../app/store';

export const selectSelectedPost = (state: RootState) => state.selectedPost.post;
