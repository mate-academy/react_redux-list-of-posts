import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

type CommentState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentState = {
  loaded: true,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(c => c.id !== action.payload);
    },

    setError: state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      })
      .addCase(loadComments.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      });
  },
});

export const { addComment, removeComment, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
