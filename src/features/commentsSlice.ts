/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { Error } from '../types/Error';

type State = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: State = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  async (id: number, { rejectWithValue }) => {
    const response: Comment[] | Error = await getPostComments(id);

    return Array.isArray(response) ? response : rejectWithValue('error');
  },
);

export const addComments = createAsyncThunk(
  'comments/add',
  (comment: CommentData) => createComment(comment),
);

export const deleteComments = createAsyncThunk(
  'comments/delete',
  (id: number) => {
    deleteComment(id);

    return id;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initComments.pending, (state) => {
        state.loaded = true;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.loaded = false;
        state.comments = action.payload;
      })
      .addCase(initComments.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(addComments.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addComments.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
