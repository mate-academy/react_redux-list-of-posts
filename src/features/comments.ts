import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type commentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: commentsState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
      },
    );
    builder.addCase(init.rejected, state => {
      state.loaded = false;
    });
  },
});
