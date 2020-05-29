import { RootState } from './store';

export const isLoading = (state: RootState) => state.isLoading;
export const getPosts = (state: RootState) => state.posts;
export const getError = (state: RootState) => state.hasError;
export const getInitialized = (state: RootState) => state.isInitialized;
export const getQuery = (state: RootState) => state.query;
