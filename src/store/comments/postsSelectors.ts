import { RootState } from '../store';

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsError = (state: RootState) => state.comments.error;
export const selectSubmitting = (state: RootState) => state.comments.submitting;
