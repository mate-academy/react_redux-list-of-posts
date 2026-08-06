import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
});

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
  },
  extraReducers: builder => {
     builder.addCase(fetchComments.pending, state => {
       state.loaded = true;
     });
     builder.addCase(fetchComments.fulfilled, (state, action) => {
       state.items = action.payload;
       state.loaded = false;
     });
     builder.addCase(fetchComments.rejected, state => {
       state.loaded = false;
       state.hasError = 'Failed to load users';
     });
   },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
