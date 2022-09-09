/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CurrentPostState = {
  currentPostId: number | null;
  comments: { [key: string]: Comment[] };
  commentsIsLoading: boolean;
  commentsIsError: boolean
};

type AddNewCommentAction = {
  type: string;
  payload: {
    id: number;
    data: Comment[];
  }
};

const initialState: CurrentPostState = {
  currentPostId: null,
  comments: {},
  commentsIsLoading: false,
  commentsIsError: false,
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'currentPost/fetch_comments',
  getPostComments,
);

export const currentPostStateSlice = createSlice({
  name: 'currentPostState',
  initialState,
  reducers: {
    selectCurrentPostId: (state, action) => {
      state.currentPostId = action.payload;
    },
    setComments: (state, action: AddNewCommentAction) => {
      const { id, data } = action.payload;

      state.comments[id] = data;
    },
    setCommentsError: (state, action) => {
      state.commentsIsError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.commentsIsLoading = true;
      state.commentsIsError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments[action.meta.arg] = action.payload;
      state.commentsIsLoading = false;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.commentsIsError = true;
      state.commentsIsLoading = false;
    });
  },
});

export const currentPostStateReducer = currentPostStateSlice.reducer;
export const {
  selectCurrentPostId,
  setComments,
  setCommentsError,
} = currentPostStateSlice.actions;
