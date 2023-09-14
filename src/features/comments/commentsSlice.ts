/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { loadComments } from './commentsAPI';

type CommentsState = {
  comments: Comment[],
  isLoading: boolean,
  error: string,
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: '',
};

export const init = createAsyncThunk('comments/fetch', loadComments);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => {
        return comment.id !== action.payload;
      });
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.error = 'Something went wrong while fetching comments';
      state.isLoading = false;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { add, remove, setError } = commentsSlice.actions;
