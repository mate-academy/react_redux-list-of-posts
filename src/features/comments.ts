/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
};

export const commentsLoaded = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const commentAdd = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    const value = await createComment(data);

    return value;
  },
);

export const commentDelete = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(commentsLoaded.pending, state => {
      state.loading = true;
    });
    builder.addCase(commentsLoaded.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.error = '';
      state.loading = false;
    });
    builder.addCase(commentsLoaded.rejected, state => {
      state.error = 'Something went wrong';
      state.loading = false;
    });

    builder.addCase(commentAdd.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(commentAdd.rejected, state => {
      state.error = 'Something went wrong';
    });

    builder.addCase(commentDelete.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
    builder.addCase(commentDelete.rejected, state => {
      state.error = 'Something went wrong';
    });
  },
});

export default commentsSlice.reducer;
