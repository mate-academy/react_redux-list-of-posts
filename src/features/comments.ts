import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);
export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);
export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setPostComments(state, action: PayloadAction<Comment[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = null;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })

      .addCase(fetchComments.rejected, (state, action) => {
        state.loaded = true;
        state.hasError = action.error.message || 'Щось пішло не так';
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export const { setPostComments } = commentsSlice.actions;
export default commentsSlice.reducer;
