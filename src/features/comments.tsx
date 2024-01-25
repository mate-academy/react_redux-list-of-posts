import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentState = {
  comments: Comment[],
  loading: boolean,
  error: string,
};

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('comment/fetch', (postId: number) => {
  return getPostComments(postId);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comments: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return { ...state, loading: true };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: '',
      };
    });

    builder.addCase(init.rejected, (state) => {
      return { ...state, loading: false, error: 'No comments yet' };
    });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
