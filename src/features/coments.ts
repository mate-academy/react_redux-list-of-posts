import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

interface CommentsState {
  comments: Comment[];
  loader: boolean;
  error: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loader: false,
  error: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, data }: { postId: number; data: CommentData }) => {
    const newComment = await createComment({ ...data, postId });

    return newComment;
  },
);

export const deleteCommentThunk = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loader = true;
        state.error = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loader = false;
          state.comments = action.payload;
          state.error = false;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loader = false;
        state.error = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        },
      )
      .addCase(
        deleteCommentThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.comments = state.comments.filter(
            comment => comment.id !== action.payload,
          );
        },
      );
  },
});

// Export actions and reducer
export const { setComments } = commentSlice.actions;
export default commentSlice.reducer;
