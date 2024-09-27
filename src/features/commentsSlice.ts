/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { RootState } from '../app/store';

type CommentsSlice = {
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  isSubmiting: boolean;
};

const initialState: CommentsSlice = {
  comments: [],
  isLoading: false,
  hasError: false,
  isSubmiting: false,
};

export const loadCommentsAsync = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const createCommentAsync = createAsyncThunk<
Comment,
CommentData,
{
  state: RootState;
  rejectValue: boolean;
}
>('newCommentForm/createComment', async (formData: CommentData, thunkAPI) => {
  const state = thunkAPI.getState();

  const postId = state.selectedPost?.id;

  if (!postId) {
    return thunkAPI.rejectWithValue(true);
  }

  const newFormData = { ...formData, postId };
  const addedComment = await createComment(newFormData);

  return addedComment;
});

export const deleteCommentAsync = createAsyncThunk(
  'newCommentForm/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComment: state => {
      state.comments = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadCommentsAsync.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        loadCommentsAsync.fulfilled,
        (state, { payload }: PayloadAction<Comment[]>) => {
          state.isLoading = false;
          state.comments = payload;
        },
      )
      .addCase(loadCommentsAsync.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });

    builder
      .addCase(
        createCommentAsync.fulfilled,
        (state, { payload }: PayloadAction<Comment>) => {
          state.comments.push(payload);
          state.isSubmiting = false;
        },
      )
      .addCase(createCommentAsync.pending, state => {
        state.isSubmiting = true;
        state.hasError = false;
      })
      .addCase(createCommentAsync.rejected, state => {
        state.isSubmiting = false;
        state.hasError = true;
      });

    builder.addCase(
      deleteCommentAsync.fulfilled,
      (state, { payload }: PayloadAction<number>) => {
        state.comments = state.comments.filter(({ id }) => id !== payload);
      },
    );
  },
});

export default commentsSlice.reducer;
export const { clearComment } = commentsSlice.actions;
export const selectCommentsInfo = (state: RootState) => state.comments;
