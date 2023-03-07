import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { getUserPosts } from '../api/posts';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { CommentData } from '../types/Comment';

export const fetchUsers = createAsyncThunk('users/fetch', () => getUsers());

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => getUserPosts(userId),
);

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const postComment = createAsyncThunk(
  'comments/create',
  (newComment: CommentData) => createComment(newComment),
);

export const removeComment = createAsyncThunk(
  'comment/delete',
  (commentId: number) => deleteComment(commentId),
);
