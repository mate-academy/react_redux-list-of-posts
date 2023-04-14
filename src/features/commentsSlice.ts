import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: Props = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const loadApiComments = createAsyncThunk(
  'comments/load', getPostComments,
);

export const addNewComment = createAsyncThunk(
  'comments/add', createComment,
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadApiComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(loadApiComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
      });

    builder.addCase(loadApiComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      });

    builder.addCase(addNewComment.rejected,
      (state) => {
        state.hasError = true;
      });
  },

});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
