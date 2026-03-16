/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

type CommentsState = {
  items: Comment[];
  hasError: boolean;
  loaded: boolean;
};

const getPostCommentsFromServer = createAsyncThunk(
  'post/getComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

const initialState: CommentsState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.items.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getPostCommentsFromServer.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(getPostCommentsFromServer.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(getPostCommentsFromServer.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
  },
});

export default CommentsSlice.reducer;
export const commentsActions = CommentsSlice.actions;
export { getPostCommentsFromServer };
