/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsType = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsType = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (comments, { payload }: PayloadAction<Comment[]>) => {
      comments.items = [...payload];
    },
    addCurrentComment: (comments, { payload }: PayloadAction<Comment>) => {
      comments.items.push(payload);
    },
    deleteCurrentComment: (comments, { payload }: PayloadAction<number>) => {
      comments.items = comments.items.filter(item => item.id !== payload);
    },
    setLoaded: (comments, { payload }: PayloadAction<boolean>) => {
      comments.loaded = payload;
    },
    setError: (comments, { payload }: PayloadAction<boolean>) => {
      comments.hasError = payload;
    },
  },
});

export default commentsSlice.reducer;
export const {
  setComments,
  addCurrentComment,
  deleteCurrentComment,
  setError,
  setLoaded,
} = commentsSlice.actions;
