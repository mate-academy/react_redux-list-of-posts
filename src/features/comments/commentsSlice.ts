/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

interface InitialStateType {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: InitialStateType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getPostCommentsFromServer = createAsyncThunk(
  'comments/getPostComments',
  async (userId: number) => {
    const value = await getPostComments(userId);

    return value;
  },
);

export const createCommentOnServer = createAsyncThunk(
  'comments/createComment',
  async (data: Omit<Comment, 'id'>) => {
    const value = await createComment(data);

    return value;
  },
);

export const deleteCommentFromServer = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getPostCommentsFromServer.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        getPostCommentsFromServer.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(getPostCommentsFromServer.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })

      .addCase(
        createCommentOnServer.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )

      .addCase(
        deleteCommentFromServer.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            comment => comment.id !== action.payload,
          );
        },
      );
  },
});

// export const { setPosts } = postsSlice.actions;

export type { InitialStateType };

export default commentsSlice.reducer;
