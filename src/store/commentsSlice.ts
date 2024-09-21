import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, { payload }: PayloadAction<Comment[]>) {
      state.comments = payload;
    },
    addComment(state, { payload }: PayloadAction<Comment>) {
      state.comments.push(payload);
    },
    deleteComment(state, { payload }: PayloadAction<number>) {
      state.comments = state.comments.filter(comment => comment.id !== payload);
    },
    setLoaded(state, { payload }: PayloadAction<boolean>) {
      state.loaded = payload;
    },
    setError(state, { payload }: PayloadAction<boolean>) {
      state.hasError = payload;
    },
  },
});

export default commentsSlice.reducer;
