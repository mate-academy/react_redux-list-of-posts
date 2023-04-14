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
      // eslint-disable-next-line no-param-reassign
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadApiComments.pending, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });

    builder.addCase(loadApiComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.comments = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      });

    builder.addCase(loadApiComments.rejected, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(addNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      });

    builder.addCase(addNewComment.rejected,
      (state) => {
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      });
  },

});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
