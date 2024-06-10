import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  visible: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.visible = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    });
    builder.addCase(fetchComments.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export const { setVisible } = commentsSlice.actions;
export const selectComments = (state: RootState) => state.comments;
export default commentsSlice.reducer;
