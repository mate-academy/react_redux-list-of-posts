import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

type CommentStatus = {
  comments: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentStatus = {
  comments: [],
  loaded: false,
  hasError: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comments: action.payload };
    },
    setError: (state, action: PayloadAction<string>) => {
      return { ...state, hasError: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = '';
      state.comments = [];
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.loaded = true;
      state.hasError = 'Failed to load users';
    });
  },
});

export const { setComments, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
