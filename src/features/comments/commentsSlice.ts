import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (state, action: PayloadAction<Comment[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },

    clear: state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchCommentsByPost.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
