/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface UsersState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  comments: [],
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'comments/fetchComments',
  (id: number) => {
    return getPostComments(id);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectedComments = (state: RootState) => state.comments.comments;

export default commentsSlice.reducer;
export const { add, remove } = commentsSlice.actions;
