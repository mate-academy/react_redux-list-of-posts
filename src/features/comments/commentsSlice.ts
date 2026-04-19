import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchByPostId',
  getPostComments,
);

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      return { ...state, loaded: false, hasError: false };
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: true,
        items: action.payload,
        hasError: false,
      };
    });

    builder.addCase(fetchComments.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});

export default commentsSlice.reducer;
