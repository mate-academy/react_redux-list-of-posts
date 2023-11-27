/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // eslint-disable-next-line import/no-cycle
// import { RootState } from '../../app/store';
import { createComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  isSubmiting: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  isSubmiting: false,
};

export const gettingComments = createAsyncThunk(
  'comments/fetchComments',

  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/createComment',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(gettingComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(gettingComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(gettingComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.pending, (state) => {
        state.isSubmiting = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        return {
          ...state,
          isSubmitting: false,
          items: [...state.items, action.payload],
        };
      });
  },
});

export const { removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
