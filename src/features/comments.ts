/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';
import { getComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: Error;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: Error.None,
};

export const initComments = createAsyncThunk('comment/fetch', (id: number) => {
  return getComments(id);
});

const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    changeErrorComment: (state, action: PayloadAction<Error>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = true;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.loaded = false;
      state.comments = action.payload;
    });

    builder.addCase(initComments.rejected, (state) => {
      state.loaded = false;
      state.hasError = Error.GetComments;
    });
  },
});

export default commentsSlice.reducer;
export const {
  addComment,
  removeComment,
  changeErrorComment,
} = commentsSlice.actions;
