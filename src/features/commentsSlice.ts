import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export const initFetch = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const initAdd = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/add',
  async data => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const initDelete = createAsyncThunk<number, number>(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

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

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // #region initFetch
    builder.addCase(initFetch.pending, state => {
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(
      initFetch.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = false;
      },
    );
    builder.addCase(initFetch.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
    // #endregion
    // #region initAdd
    builder.addCase(
      initAdd.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items = [...state.items, action.payload];
      },
    );
    builder.addCase(initAdd.rejected, state => {
      state.hasError = true;
    });
    // #endregion
    // #region initDelete
    builder.addCase(initDelete.pending, (state, action) => {
      const commentId = action.meta.arg;

      state.items = state.items.filter(comment => comment.id !== commentId);
    });
    builder.addCase(initDelete.rejected, state => {
      state.hasError = true;
    });
    // #endregion
  },
});

export default commentsSlice.reducer;
