import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<Comment>) => (
      { ...state, comments: [...state.comments, action.payload] }
    ),

    delete: (state, action: PayloadAction<number>) => (
      {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload),
      }
    ),
    makeError: (state) => ({ ...state, hasError: true }),
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, comments: action.payload, loaded: true };
    });

    builder.addCase(init.rejected, (state) => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
