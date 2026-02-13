/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { PostComment } from '../types/PostComment';

type PostState = {
  items: PostComment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
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
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadPostComments.rejected, state => {
        state.hasError = true;
        state.loaded = false;
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deletePostComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(createPostComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;
