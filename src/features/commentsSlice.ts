/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string;
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: '',
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (userId: number, { rejectWithValue }) => {
    try {
      const comments = await getPostComments(userId);

      return comments;
    } catch (error) {
      return rejectWithValue('Unable to load posts');
    }
  },
);

export const CommentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { addComment, deleteComment } = CommentSlice.actions;
export const CommentsLists = (state: RootState) => state.comments.comments;

export default CommentSlice.reducer;
