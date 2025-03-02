/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type InitialType = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialType = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, { payload }: PayloadAction<Comment>) => {
      state.comments.push(payload);
    },
    deleteAComment: (state, { payload }: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => comment.id !== payload);
    },
    setError: state => {
      state.hasError = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { addNewComment, deleteAComment, setError } =
  commentsSlice.actions;
