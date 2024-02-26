import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './action-type.enum';
import {
  getPostComments,
  deleteComment,
  createComment,
} from '../../api/comments';
import type { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';

const loadPostComments = createAsyncThunk(
  ActionType.LOAD,
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

const deletePostComment = createAsyncThunk(
  ActionType.DELETE,
  async (id: number) => {
    await deleteComment(id);
  },
);

const addPostComment = createAsyncThunk(
  ActionType.ADD,
  async (data: Omit<Comment, 'id'>, { getState }) => {
    const {
      comments: { comments },
    } = getState() as RootState;

    const newComment = await createComment(data);

    return [...comments, newComment];
  },
);

export { loadPostComments, deletePostComment, addPostComment };
