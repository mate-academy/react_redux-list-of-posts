import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getCommentsByPostId } from '../api/comments';

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  postId: number | null;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  postId: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getCommentsByPostId(postId);

    return { postId, comments };
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetComments: state => {
      state.items = []; // eslint-disable-line no-param-reassign
      state.loaded = false; // eslint-disable-line no-param-reassign
      state.hasError = false; // eslint-disable-line no-param-reassign
      state.postId = null; // eslint-disable-line no-param-reassign
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    updateComment: (state, action: PayloadAction<Comment>) => {
      const index = state.items.findIndex(c => c.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload; // eslint-disable-line no-param-reassign
      }
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(c => c.id !== action.payload); // eslint-disable-line no-param-reassign
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false; // eslint-disable-line no-param-reassign
        state.hasError = false; // eslint-disable-line no-param-reassign
      })
      .addCase(
        fetchComments.fulfilled,
        (
          state,
          action: PayloadAction<{ postId: number; comments: Comment[] }>,
        ) => {
          state.items = action.payload.comments; // eslint-disable-line no-param-reassign
          state.postId = action.payload.postId; // eslint-disable-line no-param-reassign
          state.loaded = true; // eslint-disable-line no-param-reassign
          state.hasError = false; // eslint-disable-line no-param-reassign
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.hasError = true; // eslint-disable-line no-param-reassign
      });
  },
});

export const { resetComments, addComment, updateComment, deleteComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
