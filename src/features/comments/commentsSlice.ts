/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface InitialState {
  comments: Comment[];
  isLoading: boolean;
  error: string;
}

const initialState: InitialState = {
  comments: [],
  isLoading: false,
  error: '',
};

export const init = createAsyncThunk(
  'comments/fetch', (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action) => {
      state.comments.push(action.payload);
    },
    delete: (state, action) => {
      state.comments = state.comments.filter(({ id }) => id !== action.payload);
    },
    clear: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.error = 'something went wrong';
      state.isLoading = false;
    });
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
