/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { PostComment } from '../types/PostComment';

type PostState = {
  comments: PostComment[];
  loading: boolean;
  error: boolean;
};

const initialState: PostState = {
  comments: [],
  loading: false,
  error: false,
};

export const loadPostComments = createAsyncThunk(
  'comments/fetch',
  async (id: number, { rejectWithValue }) => {
    try {
      const comments = await getPostComments(id);

      return comments;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deletePostComment = createAsyncThunk(
  'comments/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteComment(id);

      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

/* eslint-disable */
export const createPostComment = createAsyncThunk<
  PostComment,
  Omit<PostComment, 'id'>
>('comments/create', async (data, { rejectWithValue }) => {
  try {
    const response = await createComment(data);

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(loadPostComments.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deletePostComment.rejected, state => {
        state.error = true;
      })
      .addCase(createPostComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
