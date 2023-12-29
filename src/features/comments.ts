/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
