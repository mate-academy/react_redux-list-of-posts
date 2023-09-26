import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const createNewComment = createAsyncThunk(
  'comments/createNewComment',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(createNewComment.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = [...state.items, action.payload];
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  },
});

export const { remove } = commentsSlice.actions;
export default commentsSlice.reducer;
