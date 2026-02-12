/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../types/LoadingStatus';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { CommentData } from '../../types/Comment';

type ZombieComment = [Comment, number];

type State = {
  comments: Comment[];
  limbo: ZombieComment[];

  batchStatus: LoadingStatus;
  addStatus: LoadingStatus;
};

const initialState: State = {
  comments: [],
  limbo: [],

  batchStatus: LoadingStatus.Idle,
  addStatus: LoadingStatus.Idle,
};

export const getCommentsAsync = createAsyncThunk(
  'comments/getCommentsAsync',
  async (post: Post) => {
    const comments = await getPostComments(post.id);

    return comments;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteCommentAsync',
  async (comment: Comment) => {
    await deleteComment(comment.id);
  },
);

type AddCommentPayload = { data: CommentData; post: Post };
export const addCommentAsync = createAsyncThunk(
  'comments/addCommentAsync',
  async ({ data, post }: AddCommentPayload) => {
    const comment = await createComment({ ...data, postId: post.id });

    return comment;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    clearComments: state => {
      state.comments = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCommentsAsync.pending, state => {
        state.batchStatus = LoadingStatus.Loading;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.batchStatus = LoadingStatus.Idle;
        state.comments = action.payload;
      })
      .addCase(getCommentsAsync.rejected, state => {
        state.batchStatus = LoadingStatus.Failed;
      })
      .addCase(deleteCommentAsync.pending, (state, action) => {
        const { comments, limbo } = state;

        const zombieId = action.meta.arg.id;
        const zombieIndex = comments.findIndex(item => item.id === zombieId);

        const zombie: [Comment, number] = [
          comments[zombieIndex] as Comment,
          zombieIndex,
        ];

        limbo.push(zombie);
        comments.splice(zombieIndex, 1);
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        const { limbo } = state;

        const zombieId = action.meta.arg.id;

        limbo.filter(([comment]) => comment.id !== zombieId);
      })
      .addCase(deleteCommentAsync.rejected, (state, action) => {
        const { comments, limbo } = state;

        const zombieId = action.meta.arg.id;
        const zombie = limbo.find(([item]) => item.id === zombieId);

        if (zombie) {
          const [comment, index] = zombie;

          comments.splice(index, 0, comment);

          limbo.filter(([item]) => item.id !== zombieId);
        }
      })
      .addCase(addCommentAsync.pending, state => {
        state.addStatus = LoadingStatus.Loading;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.addStatus = LoadingStatus.Idle;
        state.comments.push(action.payload);
      })
      .addCase(addCommentAsync.rejected, state => {
        state.addStatus = LoadingStatus.Failed;
      });
  },
});

export const { addComment, clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
