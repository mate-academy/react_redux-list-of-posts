import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
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
    setError: (state, action) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
    addComment: (state, action) => {
      state.items.push(action.payload);
    },
    deleteComment: (state, action) => ({
      ...state,
      items: state.items.filter(item => item.id !== action.payload),
    }),
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    });
    builder.addCase(init.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});

export default commentsSlice.reducer;
export const { setError, addComment, deleteComment } = commentsSlice.actions;
