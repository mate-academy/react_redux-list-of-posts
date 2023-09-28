import { Post } from '../../types/Post';
import { RootState } from '../store';

export const getPosts = (store: RootState): Post[] => store.posts.items;
export const getLoaded = (store: RootState): boolean => store.posts.loading;
export const getHasError = (store: RootState): boolean => store.posts.hasError;
