/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[],
  isLoading: boolean,
  isError: boolean,
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  isError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },

    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    delete: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
