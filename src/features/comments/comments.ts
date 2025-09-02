/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsFetch = createAsyncThunk<
  Comment[],
  void,
  { state: RootState }
>('comments/fetch', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const post = state.selectedPost.value;

  if (!post) {
    return [];
  }

  const comments = await getPostComments(post.id);

  return comments;
});

export const commentsAdd = createAsyncThunk<
  Comment,
  { name: string; email: string; body: string },
  { state: RootState }
>('comments/add', async (data, thunkAPI) => {
  const state = thunkAPI.getState();
  const post = state.selectedPost.value;

  if (!post) {
    throw new Error('Post is not selected');
  }

  const newComment = await createComment({
    ...data,
    postId: post.id,
  });

  return newComment;
});

export const commentsDelete = createAsyncThunk<
  number,
  number,
  { state: RootState }
>('comments/delete', async (commentId, thunkAPI) => {
  const state = thunkAPI.getState();
  const post = state.selectedPost;

  if (!post) {
    throw new Error('Post is not selected');
  }

  await deleteComment(commentId);

  return commentId;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(commentsFetch.pending, state => {
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(
      commentsFetch.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = false;
        state.hasError = false;
      },
    );
    builder.addCase(commentsFetch.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
    builder
      .addCase(
        commentsAdd.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
          state.loaded = false;
          state.hasError = false;
        },
      )
      .addCase(commentsAdd.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(commentsAdd.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
    builder
      .addCase(
        commentsDelete.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            comment => comment.id !== action.payload,
          );
          state.loaded = false;
          state.hasError = false;
        },
      )
      .addCase(commentsDelete.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(commentsDelete.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
