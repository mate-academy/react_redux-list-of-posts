import { RootState } from '../app/store';

export const authorSelector = (state: RootState) => state.author;
export const selectedPostSelector = (state: RootState) => state.selectedPost;
export const commentsSelector = (state: RootState) => state.comments;
