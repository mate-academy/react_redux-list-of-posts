/* eslint-disable max-len */
import { Comment } from '../../types/Comment';
import { RootState } from '../store';

export const getComments = (store: RootState): Comment[] => store.comments.items;
export const getLoaded = (store: RootState): boolean => store.comments.loading;
export const getHasError = (store: RootState): boolean => store.comments.hasError;
