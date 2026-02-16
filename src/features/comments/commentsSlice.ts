import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
// import { Comment } from '../../types/Comment';
import { CommentsState } from '../../types/State';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addCommentLocal: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchComments.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        items: action.payload,
      }))
      .addCase(fetchComments.rejected, state => ({
        ...state,
        loaded: false,
        hasError: true,
      }));
  },
});

export const { addCommentLocal } = commentsSlice.actions;
export default commentsSlice.reducer;
