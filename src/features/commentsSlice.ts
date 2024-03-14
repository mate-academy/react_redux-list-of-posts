/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  errorMessage: string;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  errorMessage: '',
};

export const getComments = createAsyncThunk('comments/get', (postId: number) =>
  getPostComments(postId),
);

const commentsSloce = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        item => item.id !== action.payload,
      );
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(getComments.pending, state => {
      state.loading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getComments.rejected, state => {
      state.loading = false;
      state.errorMessage = 'The comments have not been loaded';
    });
  },
});

export default commentsSloce.reducer;
export const { setLoader, setErrorMessage, addComment, removeComment } =
  commentsSloce.actions;
