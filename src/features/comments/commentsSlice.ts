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
      state.items = action.payload;
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(comment => comment.id !== action.payload);
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },

    clear: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCommentsByPost.pending, state => {
      state.loaded = false;
      state.hasError = false;
    })
    .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    })
    .addCase(fetchCommentsByPost.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    })
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
