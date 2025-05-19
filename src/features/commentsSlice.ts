import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { RootState } from '../app/store';

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    const data = await getPostComments(postId);

    return data;
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
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      comments: [...state.comments, action.payload],
    }),

    deleteComment: (state, action: PayloadAction<number>) => ({
      ...state,
      comments: state.comments.filter(comment => comment.id !== action.payload),
    }),
  },
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
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;
export const selectComments = (state: RootState) => state.comments;
export default commentsSlice.reducer;
