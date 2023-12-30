/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  error: boolean,
  loading: boolean,
}

const initialState: CommentsState = {
  comments: [],
  error: false,
  loading: false,
};

export const init = createAsyncThunk(
  'comments/fetchComments', (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(commnet => commnet.id !== action.payload);
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(init.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { deleteComment, setComments, addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
