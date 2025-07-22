import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: CommentData & { postId: number }) => createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

type CommentsState = {
  items: Comment[];
  loading: boolean;
  error: string | null;
  adding: boolean;
  isDeleting: boolean;
};

const initialState: CommentsState = {
  items: [],
  loading: false,
  error: null,
  adding: false,
  isDeleting: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //#region  for fetch
    builder.addCase(fetchComments.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loading = false;
        state.items = action.payload;
      },
    );

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Not found comments from server';
    });
    //#endregion

    //#region  for create comment

    builder.addCase(addComment.pending, state => {
      state.adding = true;
    });
    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.adding = false;
        state.items.push(action.payload);
      },
    );
    builder.addCase(addComment.rejected, state => {
      state.adding = false;
    });
    //#endregion

    //#region for delete comment
    builder.addCase(removeComment.pending, state => {
      state.isDeleting = true;
    });
    builder.addCase(
      removeComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.isDeleting = false;
        const removedId = action.payload;

        state.items = state.items.filter(comment => comment.id !== removedId);
      },
    );
    builder.addCase(removeComment.rejected, state => {
      state.isDeleting = false;
      state.error = 'Could not delete comment';
    });

    //#endregion
  },
});

export default commentsSlice.reducer;
