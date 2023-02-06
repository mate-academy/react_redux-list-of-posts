/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const loadedComments = await getPostComments(postId);

    return loadedComments;
  },
);

export const addComment = createAsyncThunk(
  'comments/fetch_add',
  async (data: Omit<Comment, 'id'>) => {
    const addedComment = await createComment(data);

    return addedComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => (
        comment.id !== action.payload
      ));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.comments = action.payload;
      },
    );

    builder.addCase(loadComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      },
    );

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { removeComment } = commentsSlice.actions;
