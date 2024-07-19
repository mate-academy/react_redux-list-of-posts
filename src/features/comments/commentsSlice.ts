/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { fetchComments } from './fetchComments';

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchComments.pending, state => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as boolean;
    });
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export const { name: commentsSliceName } = commentsSlice;
export const { reducer: commentsReducer } = commentsSlice;
