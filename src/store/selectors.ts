import { RootState } from './index';

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getUserId = (state: RootState) => state.userId;
export const getPostId = (state: RootState) => state.postId;
