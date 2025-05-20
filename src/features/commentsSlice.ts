import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { RootState } from '../app/store';

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    const data = await getPostComments(postId);

    return data;
  },
);

export const sendComment = createAsyncThunk(
  'comments/create',
  async (data: Omit<Comment, 'id'>) => {
    const response = await createComment(data);

    return response;
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export interface CommentState {
  comments: Comment[];
  hasError: boolean;
  loaded: boolean;
}

const initialState: CommentState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => ({
      ...state,
      loaded: false,
      hasError: false,
    }));
    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => ({
        ...state,
        loaded: true,
        comments: action.payload,
      }),
    );
    builder.addCase(loadComments.rejected, state => ({
      ...state,
      hasError: true,
      loaded: true,
    }));
    builder.addCase(sendComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(
      removeComment.fulfilled,
      (state, action: PayloadAction<number>) => ({
        ...state,
        comments: state.comments.filter(c => c.id !== action.payload),
      }),
    );
  },
});

export const selectComments = (state: RootState) => state.comments;
export default commentsSlice.reducer;
