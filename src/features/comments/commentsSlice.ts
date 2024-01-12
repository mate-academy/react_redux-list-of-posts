/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export type TCommentsSlice = {
  comments: Comment[];
  isCommentsLoaded: boolean;
  hasCommentsError: boolean;
};

const initialState: TCommentsSlice = {
  comments: [],
  isCommentsLoaded: false,
  hasCommentsError: false,
};

export const commentsInit = createAsyncThunk('comments/fetch', (id: number) => {
  return getPostComments(id);
});

const commentsSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setComments: (state, actions) => {
      state.comments = actions.payload;
    },
    setCommentsError: (state, actions:PayloadAction<boolean>) => {
      state.hasCommentsError = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(commentsInit.pending, (state) => {
      state.isCommentsLoaded = false;
    });

    builder.addCase(commentsInit.fulfilled, (state, actions) => {
      state.comments = actions.payload;
      state.isCommentsLoaded = true;
    });

    builder.addCase(commentsInit.rejected, (state) => {
      state.hasCommentsError = true;
      state.isCommentsLoaded = true;
    });
  },
});

export const { setComments, setCommentsError } = commentsSlice.actions;
export default commentsSlice.reducer;
