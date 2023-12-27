import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[] | null;
  isLoading: boolean;
  hasError: boolean;
  loaded: boolean;
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data : Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const removeCommentFromApi = createAsyncThunk<number, number>(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const initialState: CommentsState = {
  items: null,
  isLoading: false,
  hasError: false,
  loaded: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[] | null>) {
      state.items = action.payload;
    },

    removeComment(state, action: PayloadAction<number>) {
      if (state.items) {
        state.items = state.items?.filter(item => item.id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchComments.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })

      .addCase(addComment.pending, (state) => {
        state.hasError = false;
        state.loaded = true;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.items?.push(action.payload);
        state.loaded = false;
      })

      .addCase(addComment.rejected, (state) => {
        state.hasError = true;
        state.loaded = false;
      })

      .addCase(removeCommentFromApi.fulfilled, (state, action) => {
        if (state.items) {
          state.items = state.items?.filter(item => item.id !== action.payload);
        }
      });
  },
});

export default commentsSlice.reducer;

export const { setComments, removeComment } = commentsSlice.actions;
