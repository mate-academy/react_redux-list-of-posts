import { RootState } from './index';

export const getLoading = (state: RootState) => state.isLoading;
export const getPosts = (state: RootState) => state.posts;
export const getErrorState = (state: RootState) => state.hasError;
export const getInitialized = (state: RootState) => state.isInitialized;
