import { RootState } from '../../app/store';

export const selectLoaded = (state: RootState) => state.comments.loader;
export const selectComments = (state:RootState) => state.comments.comments;
export const selectorError = (state:RootState) => state.comments.error;
