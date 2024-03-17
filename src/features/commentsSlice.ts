import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsStateType {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
}

const initialState: CommentsStateType = {
  loaded: false,
  hasError: false,
  comments: [],
};

export const set = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action) => {
      state.comments.push(action.payload);
    },

    remove: (state, action) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(set.pending, state => {
      return { ...state, loaded: false };
    });

    builder.addCase(set.fulfilled, (state, action) => {
      return { ...state, comments: action.payload, loaded: true };
    });

    builder.addCase(set.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});

export default commentsSlice.reducer;
export const { add, remove } = commentsSlice.actions;
