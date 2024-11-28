import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  err: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  err: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        item => item.id !== action.payload,
      );
    },
    enableErr: state => {
      state.err = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loading = false;
    });
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loading = true;
        state.comments = action.payload;
      },
    );
    builder.addCase(fetchComments.rejected, state => {
      state.loading = true;
      state.err = true;
    });
  },
});

export default commentsSlice.reducer;
export const { add, remove, enableErr } = commentsSlice.actions;
