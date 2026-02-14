/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';

export interface CommentState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const commentAsync = createAsyncThunk(
  'comment/fetchAllComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (
      state: CommentState,
      action: PayloadAction<Comment | null>,
    ) => {
      if (action.payload) {
        state.items.push(action.payload);
      }
    },

    removeComment: (state: CommentState, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(commentAsync.pending, state => {
        state.loaded = false;
      })

      .addCase(
        commentAsync.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )

      .addCase(commentAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const comments = (state: RootState) => state.comments;
export const { setComments, removeComment } = commentSlice.actions;
export default commentSlice.reducer;
