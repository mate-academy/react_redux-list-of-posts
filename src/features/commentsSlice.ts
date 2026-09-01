import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (id: number) => {
    return getPostComments(id);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

// Renamed from removeComments to removeComment for clarity
export const removeComment = createAsyncThunk(
  'comments/remove',
  (id: number) => {
    return deleteComment(id);
  },
);

const initialState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.comments = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchComments.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.comments.push(action.payload);
      })
      .addCase(removeComment.pending, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.comments = state.comments.filter(
          comment => comment.id !== action.meta.arg,
        );
      });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
