/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { creatNewComment } from './newCommentSlice';

const initialState = {
  loading: false,
  comments: [] as Comment[],
  error: '',
};

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    // await delay(3000);
    const comments = await getPostComments(postId);

    return comments;
  },
);
export const loadRemoveComment = createAsyncThunk(
  'comments/delet',
  async (commentsId: number) => {
    // await delay(3000);
    await deleteComment(commentsId);

    return commentsId;
  },
);
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(loadComments.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
    builder.addCase(creatNewComment.fulfilled, (state, action) => {
      state.comments.push(action.payload); // тут payload це Comment
    });
    builder.addCase(loadRemoveComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export default commentsSlice.reducer;
