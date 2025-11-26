import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { RootState } from '../../app/store';

export interface CommentsState {
  comments: Comment[];
  selectedComment: Comment | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  selectedComment: null,
  loading: true,
  error: null,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const fetchComment = createAsyncThunk(
  'comments/fetchComment',
  async (data: Omit<Comment, 'id'>) => {
    const response = await createComment(data);

    return response;
  },
);

export const fetchDeleteComment = createAsyncThunk(
  'comments/fetchDeleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setSelectedComment(state, action: PayloadAction<Comment | null>) {
      state.selectedComment = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => {
        state.loading = true;
        state.error = null;
        state.comments = [];
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchPostComments.rejected, state => {
        state.loading = false;
        state.error = 'Comments can not be found';
      })

      .addCase(fetchComment.pending, state => {
        state.error = null;
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(fetchComment.rejected, state => {
        state.error = 'Comment can not be created';
      })

      .addCase(fetchDeleteComment.pending, state => {
        state.error = null;
      })
      .addCase(fetchDeleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          prev => prev.id !== action.payload,
        );
      })
      .addCase(fetchDeleteComment.rejected, state => {
        state.error = 'Comment can not be deleted';
      });
  },
});

export default commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectedComment = (state: RootState) =>
  state.comments.selectedComment;
export const loadingComment = (state: RootState) => state.comments.loading;
export const errorComment = (state: RootState) => state.comments.error;

export const { setSelectedComment } = commentsSlice.actions;
